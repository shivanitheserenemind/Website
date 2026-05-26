import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import {
  Phone, Map, Sparkles, User, Users, Heart, BookOpen,
  Star, Calendar, MapPin, Clock, Instagram, Facebook,
  Linkedin, Mail, Send, CheckCircle, ArrowRight, Menu, X, Cookie } from
'lucide-react';
import {
  coachInfo,
  heroContent,
  services,
  processSteps,
  testimonials,
  upcomingWorkshops,
  blogPosts,
  faqs,
  leadMagnet,
  socialLinks } from
'../mock';
import { toast } from 'sonner';

const iconMap = {
  phone: Phone,
  map: Map,
  sparkles: Sparkles,
  user: User,
  users: Users,
  heart: Heart,
  bookOpen: BookOpen
};

export const Home = () => {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '', sessionType: '' });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [leadMagnetEmail, setLeadMagnetEmail] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    toast.success('Thank you! Your message has been sent. I\'ll be in touch soon.');
    setContactForm({ name: '', email: '', message: '', sessionType: '' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    toast.success('Welcome! You\'ve been added to the newsletter.');
    setNewsletterEmail('');
  };

  const handleLeadMagnetSubmit = (e) => {
    e.preventDefault();
    toast.success('Success! Check your email for your free worksheets.');
    setLeadMagnetEmail('');
  };

  const handleWorkshopRegister = (workshop) => {
    if (workshop.status === 'Waitlist') {
      toast.success(`You've been added to the waitlist for ${workshop.title}`);
    } else {
      toast.success(`Registration confirmed for ${workshop.title}!`);
    }
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F7FAF5]">
      {/* Header */}
      <header className="relative bg-white/90 backdrop-blur-md border-b border-[#DCE5D0] shadow-sm overflow-visible z-50">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center h-20 md:h-44 box-border">
          <div className="md:-ml-[5%] relative flex items-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_transform-with-love/artifacts/47cs2zxo_Serene_Mind_Logo_Final.ai__3_-removebg-preview.png" 
              alt="Serene Mind - Peace Within"
              className="h-24 md:h-[14.3rem] w-auto object-contain block"
              style={{ imageRendering: 'auto' }}
            />
          </div>
          <nav className="hidden md:flex gap-16 text-xl font-medium">
            <a href="#about" className="text-[#1F4E48] hover:text-[#2D7A6F] transition-colors">About</a>
            <a href="#services" className="text-[#1F4E48] hover:text-[#2D7A6F] transition-colors">Services</a>
            <a href="#workshops" className="text-[#1F4E48] hover:text-[#2D7A6F] transition-colors">Workshops</a>
            <a href="#testimonials" className="text-[#1F4E48] hover:text-[#2D7A6F] transition-colors">Testimonials</a>
            <a href="#contact" className="text-[#1F4E48] hover:text-[#2D7A6F] transition-colors">Contact</a>
          </nav>
          <Button onClick={scrollToContact} className="hidden md:flex bg-[#2D7A6F] hover:bg-[#1F5C54] text-white transition-all duration-300 text-lg px-8 py-6">
            Book Discovery Call
          </Button>
          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1F4E48]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-[#DCE5D0] shadow-lg z-50">
            <nav className="flex flex-col py-4">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="px-6 py-3 text-[#1F4E48] hover:bg-[#F7FAF5] transition-colors">About</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="px-6 py-3 text-[#1F4E48] hover:bg-[#F7FAF5] transition-colors">Services</a>
              <a href="#workshops" onClick={() => setMobileMenuOpen(false)} className="px-6 py-3 text-[#1F4E48] hover:bg-[#F7FAF5] transition-colors">Workshops</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="px-6 py-3 text-[#1F4E48] hover:bg-[#F7FAF5] transition-colors">Testimonials</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="px-6 py-3 text-[#1F4E48] hover:bg-[#F7FAF5] transition-colors">Contact</a>
              <div className="px-6 py-3">
                <Button 
                  onClick={() => { scrollToContact(); setMobileMenuOpen(false); }} 
                  className="w-full bg-[#2D7A6F] hover:bg-[#1F5C54] text-white"
                >
                  Book Discovery Call
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroContent.backgroundImage})` }}>

          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h2 className="font-serif text-5xl md:text-7xl mb-6 font-bold animate-fade-in">
            {heroContent.headline}
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            {heroContent.tagline}
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 md:order-1">
              <h2 className="font-serif text-4xl md:text-5xl text-[#1F4E48] mb-6">
                About Me
              </h2>
              <p className="text-[#1F4E48] leading-relaxed mb-6 text-lg">
                {coachInfo.bio}
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-[#C9DCBE]/20 rounded-full blur-2xl"></div>
                <img
                  src={coachInfo.image}
                  alt={coachInfo.name}
                  className="relative w-full h-[500px] object-cover !rounded-t-2xl !rounded-b-2xl !rounded-l-2xl !rounded-r-2xl shadow-2xl" />

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-[#F7FAF5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-[#1F4E48] mb-4">
              Services & Offerings
            </h2>
            <p className="text-[#5A8278] max-w-2xl mx-auto">
              Choose the path that feels right for your journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon];
              return (
                <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-[#DCE5D0] bg-white flex flex-col">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />

                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full">
                      <IconComponent className="h-6 w-6 text-[#2D7A6F]" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-[#1F4E48] font-serif">{service.title}</CardTitle>
                    <CardDescription className="text-[#5A8278]">
                      {service.duration ? `${service.duration} • ${service.format}` : service.format}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1">
                    <p className="text-[#1F4E48] mb-4 leading-relaxed flex-1">{service.description}</p>
                    <Button className="w-full bg-[#8FB565] hover:bg-[#729550] text-white transition-colors mt-auto">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>);

            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-[#F7FAF5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-[#1F4E48] mb-4">
              What Clients Say
            </h2>
            <p className="text-[#5A8278] max-w-2xl mx-auto">
              Stories of transformation and healing
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial) =>
            <Card key={testimonial.id} className="bg-white border-[#DCE5D0] hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) =>
                  <Star key={i} className="h-4 w-4 fill-[#C9DCBE] text-[#C9DCBE]" />
                  )}
                  </div>
                  <CardTitle className="text-[#1F4E48] text-lg">
                    {testimonial.name}
                  </CardTitle>
                  <CardDescription className="text-[#5A8278]">
                    {testimonial.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-[#1F4E48] leading-relaxed italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Workshops Section */}
      <section id="workshops" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-[#1F4E48] mb-4">
              Upcoming Workshops
            </h2>
            <p className="text-[#5A8278] max-w-2xl mx-auto">
              Join us for transformative group experiences
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {upcomingWorkshops.map((workshop) =>
            <Card key={workshop.id} className="border-[#DCE5D0] bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-[#1F4E48] font-serif text-xl mb-2">
                        {workshop.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-4 text-sm text-[#5A8278]">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {workshop.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {workshop.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {workshop.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge
                      className={workshop.status === 'Waitlist' ?
                      'bg-[#5A8278] text-white' :
                      'bg-[#8FB565] text-white'
                      }>

                        {workshop.status === 'Waitlist' ? 'Waitlist Only' : `${workshop.spotsLeft} spots left`}
                      </Badge>
                      <Button
                      onClick={() => handleWorkshopRegister(workshop)}
                      className="bg-[#2D7A6F] hover:bg-[#1F5C54] text-white">

                        {workshop.status === 'Waitlist' ? 'Join Waitlist' : 'Register Now'}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#F7FAF5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-[#1F4E48] mb-4">
              Let's Connect
            </h2>
            <p className="text-[#5A8278] max-w-2xl mx-auto">
              Ready to begin your transformation? I'm here to support you.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <Card className="border-[#DCE5D0] bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-[#1F4E48] font-serif text-2xl">Send Me a Message</CardTitle>
                <CardDescription className="text-[#5A8278]">
                  I typically respond within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Your Name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                      className="border-[#DCE5D0]" />

                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                      className="border-[#DCE5D0]" />

                  </div>
                  <div>
                    <select
                      value={contactForm.sessionType}
                      onChange={(e) => setContactForm({ ...contactForm, sessionType: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-[#DCE5D0] rounded-md text-[#1F4E48] bg-white">

                      <option value="">Select Session Type</option>
                      <option value="discovery">Discovery Call</option>
                      <option value="workshop">Workshop Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <Textarea
                      placeholder="Tell me a bit about what brings you here..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                      rows={5}
                      className="border-[#DCE5D0] resize-none" />

                  </div>
                  <Button type="submit" className="w-full bg-[#2D7A6F] hover:bg-[#1F5C54] text-white">
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1F4E48] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="font-serif text-4xl md:text-5xl mb-4">Shivani Ambekar</h3>
              <p className="text-[#B5C7B0] text-lg md:text-xl leading-relaxed">
                Psychologist, Clinical Spl.
              </p>
              <a href="mailto:team@theserenemind.in" className="text-[#B5C7B0] hover:text-white text-lg md:text-xl leading-relaxed transition-colors block mt-2">
                team@theserenemind.in
              </a>
            </div>
            <div>
              <h4 className="font-semibold mb-5 text-2xl md:text-3xl">Quick Links</h4>
              <ul className="space-y-3 text-lg md:text-xl text-[#B5C7B0]">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#workshops" className="hover:text-white transition-colors">Workshops</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[#B5C7B0] text-base md:text-lg">
                © 2025 Shivani Ambekar. All rights reserved. Licensed Heal Your Life® Teacher.
              </p>
              <div className="flex gap-5">
                <a href="https://www.instagram.com/shivanii.serenemind?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-[#B5C7B0] hover:text-white transition-colors">
                  <Instagram className="h-7 w-7" />
                </a>
                <a href="#" className="text-[#B5C7B0] hover:text-white transition-colors">
                  <Facebook className="h-7 w-7" />
                </a>
                <a href="#" className="text-[#B5C7B0] hover:text-white transition-colors">
                  <Linkedin className="h-7 w-7" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Consent - Hover to Expand */}
      <div className="fixed bottom-4 right-4 z-50 group">
        {/* Collapsed Icon */}
        <div className="w-14 h-14 bg-[#2D7A6F] rounded-full shadow-lg flex items-center justify-center cursor-pointer group-hover:opacity-0 group-hover:scale-50 transition-all duration-300 animate-bounce-slow">
          <Cookie className="h-7 w-7 text-white" />
        </div>
        {/* Expanded Popup */}
        <div className="absolute bottom-0 right-0 max-w-sm w-[22rem] bg-white border border-[#DCE5D0] rounded-lg shadow-2xl p-4 opacity-0 scale-90 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 origin-bottom-right">
          <p className="text-[#1F4E48] text-sm mb-3">
            We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
          </p>
          <div className="flex gap-2">
            <Button size="sm" className="flex-1 bg-[#8FB565] hover:bg-[#729550] text-white">
              Accept
            </Button>
            <Button size="sm" variant="outline" className="flex-1 border-[#DCE5D0] text-[#1F4E48]">
              Decline
            </Button>
          </div>
        </div>
      </div>
    </div>);

};

export default Home;