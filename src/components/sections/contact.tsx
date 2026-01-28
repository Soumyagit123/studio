import React from 'react';
import { personalDetails } from '@/lib/data';
import { ContactForm } from './contact-form';
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
          Have a project in mind or just want to say hello? I'd love to hear from you.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
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
          <div>
             <h3 className="text-2xl font-bold mb-6">Send me a message</h3>
             <ContactForm />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
