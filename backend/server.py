from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
import resend
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend configuration
resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL', 'team@theserenemind.com')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


class ContactInquiry(BaseModel):
    name: str
    email: EmailStr
    sessionType: Optional[str] = ""
    message: str


class WorkshopRegistration(BaseModel):
    name: str
    email: EmailStr
    sessionType: Optional[str] = ""
    message: str
    workshopTitle: str
    workshopDate: Optional[str] = ""
    workshopLocation: Optional[str] = ""


def build_html(title: str, fields: dict) -> str:
    rows = "".join(
        f"""
        <tr>
          <td style="padding:8px 12px;background:#F7FAF5;color:#1F4E48;font-weight:600;width:160px;border:1px solid #DCE5D0;">{k}</td>
          <td style="padding:8px 12px;color:#1F4E48;border:1px solid #DCE5D0;white-space:pre-wrap;">{v}</td>
        </tr>
        """
        for k, v in fields.items()
    )
    return f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#ffffff;">
      <h2 style="color:#1F4E48;font-family:Georgia,serif;border-bottom:2px solid #8FB565;padding-bottom:8px;">{title}</h2>
      <table style="width:100%;border-collapse:collapse;margin-top:16px;">
        {rows}
      </table>
      <p style="color:#5A8278;font-size:12px;margin-top:24px;">Sent from theserenemind.in website</p>
    </div>
    """


async def send_resend_email(subject: str, html_content: str):
    if not resend.api_key:
        raise HTTPException(status_code=500, detail="Email service not configured")
    params = {
        "from": SENDER_EMAIL,
        "to": [RECIPIENT_EMAIL],
        "subject": subject,
        "html": html_content,
    }
    try:
        email = await asyncio.to_thread(resend.Emails.send, params)
        return email
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")


# Routes
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/contact")
async def send_contact_inquiry(payload: ContactInquiry):
    fields = {
        "Name": payload.name,
        "Email": payload.email,
        "Session Type": payload.sessionType or "Not specified",
        "Message": payload.message,
    }
    html_content = build_html("New Inquiry from Website", fields)
    result = await send_resend_email("Inquiry", html_content)
    return {"status": "success", "email_id": result.get("id") if result else None}


@api_router.post("/register")
async def send_workshop_registration(payload: WorkshopRegistration):
    current_date = datetime.now(timezone.utc).strftime("%B %d, %Y")
    fields = {
        "Workshop": payload.workshopTitle,
        "Workshop Date": payload.workshopDate or "Not specified",
        "Location": payload.workshopLocation or "Not specified",
        "Name": payload.name,
        "Email": payload.email,
        "Session Type": payload.sessionType or "Not specified",
        "Message": payload.message,
    }
    html_content = build_html(
        f"New Workshop Registration — {current_date}", fields
    )
    subject = f"Registration {current_date}"
    result = await send_resend_email(subject, html_content)
    return {"status": "success", "email_id": result.get("id") if result else None}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
