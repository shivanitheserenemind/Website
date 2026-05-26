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
  Linkedin, Mail, Send, CheckCircle, ArrowRight } from
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
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <header className="relative bg-white/90 backdrop-blur-md border-b border-[#E8DED0] shadow-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="-ml-[5%]">
            <img 
              src="https://customer-assets.emergentagent.com/job_transform-with-love/artifacts/47cs2zxo_Serene_Mind_Logo_Final.ai__3_-removebg-preview.png" 
              alt="Serene Mind - Peace Within"
              className="h-36 md:h-44 w-auto object-contain"
            />
          </div>
          <nav className="hidden md:flex gap-10 text-xl font-medium">
            <a href="#about" className="text-[#6B5B4A] hover:text-[#B8886B] transition-colors">About</a>
            <a href="#services" className="text-[#6B5B4A] hover:text-[#B8886B] transition-colors">Services</a>
            <a href="#workshops" className="text-[#6B5B4A] hover:text-[#B8886B] transition-colors">Workshops</a>
            <a href="#testimonials" className="text-[#6B5B4A] hover:text-[#B8886B] transition-colors">Testimonials</a>
            <a href="#contact" className="text-[#6B5B4A] hover:text-[#B8886B] transition-colors">Contact</a>
          </nav>
          <Button onClick={scrollToContact} className="bg-[#B8886B] hover:bg-[#A07859] text-white transition-all duration-300 text-lg px-8 py-6">
            Book Discovery Call
          </Button>
        </div>
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
          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-[#D4A5A5] hover:bg-[#C49090] text-white px-8 py-6 text-lg transition-all duration-300 hover:scale-105">

            {heroContent.ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 md:order-1">
              <h2 className="font-serif text-4xl md:text-5xl text-[#6B5B4A] mb-6">
                About Me
              </h2>
              <p className="text-[#6B5B4A] leading-relaxed mb-6 text-lg">
                {coachInfo.bio}
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-[#D4A5A5]/20 rounded-full blur-2xl"></div>
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
      <section id="services" className="py-20 bg-[#FAF8F5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-[#6B5B4A] mb-4">
              Services & Offerings
            </h2>
            <p className="text-[#9B8B7A] max-w-2xl mx-auto">
              Choose the path that feels right for your journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon];
              return (
                <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-[#E8DED0] bg-white">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />

                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full">
                      <IconComponent className="h-6 w-6 text-[#B8886B]" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-[#6B5B4A] font-serif">{service.title}</CardTitle>
                    <CardDescription className="text-[#9B8B7A]">
                      {service.duration} • {service.format}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#6B5B4A] mb-4 leading-relaxed">{service.description}</p>
                    <Button className="w-full bg-[#A8B88A] hover:bg-[#97A67A] text-white transition-colors">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>);

            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-[#6B5B4A] mb-4">
              How It Works
            </h2>
            <p className="text-[#9B8B7A] max-w-2xl mx-auto">
              Your transformation journey in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {processSteps.map((step) => {
              const IconComponent = iconMap[step.icon];
              return (
                <div key={step.number} className="relative text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#D4A5A5]/20 mb-6">
                    <IconComponent className="h-10 w-10 text-[#B8886B]" />
                  </div>
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 -z-10 font-serif text-8xl text-[#E8DED0] font-bold">
                    {step.number}
                  </div>
                  <h3 className="font-serif text-2xl text-[#6B5B4A] mb-3">{step.title}</h3>
                  <p className="text-[#9B8B7A] leading-relaxed">{step.description}</p>
                </div>);

            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-[#FAF8F5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-[#6B5B4A] mb-4">
              What Clients Say
            </h2>
            <p className="text-[#9B8B7A] max-w-2xl mx-auto">
              Stories of transformation and healing
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial) =>
            <Card key={testimonial.id} className="bg-white border-[#E8DED0] hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) =>
                  <Star key={i} className="h-4 w-4 fill-[#D4A5A5] text-[#D4A5A5]" />
                  )}
                  </div>
                  <CardTitle className="text-[#6B5B4A] text-lg">
                    {testimonial.name}
                  </CardTitle>
                  <CardDescription className="text-[#9B8B7A]">
                    {testimonial.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-[#6B5B4A] leading-relaxed italic">"{testimonial.text}"</p>
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
            <h2 className="font-serif text-4xl md:text-5xl text-[#6B5B4A] mb-4">
              Upcoming Workshops
            </h2>
            <p className="text-[#9B8B7A] max-w-2xl mx-auto">
              Join us for transformative group experiences
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {upcomingWorkshops.map((workshop) =>
            <Card key={workshop.id} className="border-[#E8DED0] bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-[#6B5B4A] font-serif text-xl mb-2">
                        {workshop.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-4 text-sm text-[#9B8B7A]">
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
                      'bg-[#9B8B7A] text-white' :
                      'bg-[#A8B88A] text-white'
                      }>

                        {workshop.status === 'Waitlist' ? 'Waitlist Only' : `${workshop.spotsLeft} spots left`}
                      </Badge>
                      <Button
                      onClick={() => handleWorkshopRegister(workshop)}
                      className="bg-[#B8886B] hover:bg-[#A07859] text-white">

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
      <section id="contact" className="py-20 bg-[#FAF8F5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-[#6B5B4A] mb-4">
              Let's Connect
            </h2>
            <p className="text-[#9B8B7A] max-w-2xl mx-auto">
              Ready to begin your transformation? I'm here to support you.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <Card className="border-[#E8DED0] bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-[#6B5B4A] font-serif text-2xl">Send Me a Message</CardTitle>
                <CardDescription className="text-[#9B8B7A]">
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
                      className="border-[#E8DED0]" />

                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                      className="border-[#E8DED0]" />

                  </div>
                  <div>
                    <select
                      value={contactForm.sessionType}
                      onChange={(e) => setContactForm({ ...contactForm, sessionType: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-[#E8DED0] rounded-md text-[#6B5B4A] bg-white">

                      <option value="">Select Session Type</option>
                      <option value="discovery">Discovery Call</option>
                      <option value="1on1">1:1 Coaching</option>
                      <option value="workshop">Workshop Inquiry</option>
                      <option value="group">Group Program</option>
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
                      className="border-[#E8DED0] resize-none" />

                  </div>
                  <Button type="submit" className="w-full bg-[#B8886B] hover:bg-[#A07859] text-white">
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
      <footer className="bg-[#6B5B4A] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-serif text-2xl mb-4">Shivani Ambekar</h3>
              <p className="text-[#D4C4B4] text-sm leading-relaxed">
                Licensed Heal Your Life® Coach & Workshop Facilitator
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-[#D4C4B4]">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#workshops" className="hover:text-white transition-colors">Workshops</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-[#D4C4B4]">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Disclaimer</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-[#D4C4B4] text-sm mb-3">Receive inspiration & updates</p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50" />

                <Button type="submit" variant="secondary" size="icon" className="bg-[#D4A5A5] hover:bg-[#C49090]">
                  <Mail className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[#D4C4B4] text-sm">
                © 2025 Shivani Ambekar. All rights reserved. Licensed Heal Your Life® Teacher.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-[#D4C4B4] hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-[#D4C4B4] hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-[#D4C4B4] hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
            <p className="text-[#D4C4B4] text-xs mt-4 text-center">
              Disclaimer: Coaching is not therapy and is not a substitute for professional mental health treatment.
            </p>
          </div>
        </div>
      </footer>

      {/* Cookie Consent Banner */}
      <div className="fixed bottom-4 right-4 max-w-sm bg-white border border-[#E8DED0] rounded-lg shadow-lg p-4 z-50">
        <p className="text-[#6B5B4A] text-sm mb-3">
          We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
        </p>
        <div className="flex gap-2">
          <Button size="sm" className="flex-1 bg-[#A8B88A] hover:bg-[#97A67A] text-white">
            Accept
          </Button>
          <Button size="sm" variant="outline" className="flex-1 border-[#E8DED0] text-[#6B5B4A]">
            Decline
          </Button>
        </div>
      </div>
    </div>);

};

export default Home;