import React from 'react';
import { personalDetails } from '@/lib/data';
import { Chatbot } from './chatbot';
import { Mail, MapPin, Phone } from 'lucide-react';
import { AnimatedSection } from '../animated-section';

export function ContactSection() {
  const contactInfo = [
    { icon: Mail, text: personalDetails.email, href: `mailto:${personalDetails.email}` },
    { icon: Phone, text: personalDetails.phone, href: `tel:${personalDetails.phone}` },
    { icon: MapPin, text: personalDetails.location },
  ];

  return (
    <AnimatedSection id="contact" className="bg-secondary">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl">Get in Touch</h2>
        <p className="mt-4 text-center text-muted-foreground md:text-xl/relaxed">
          Ask my AI assistant about my skills and experience, or use the contact info to reach me directly.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold mb-6">Chat with DashBot</h3>
            <Chatbot />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6">Direct Contact</h3>
            <div className="space-y-6">
              {contactInfo.map(({ icon: Icon, text, href }) => (
                <div key={text} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  {href ? (
                    <a href={href} className="text-lg text-muted-foreground hover:text-primary transition-colors">{text}</a>
                  ) : (
                    <p className="text-lg text-muted-foreground">{text}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
