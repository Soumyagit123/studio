'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { personalDetails } from '@/lib/data';
import { Download, Github, Linkedin, Twitter } from 'lucide-react';
import { AnimatedSection } from '../animated-section';

const roles = ['Project Lead', 'Software Developer', 'GenAI Enthusiast'];

export function HeroSection() {
  const [typedRole, setTypedRole] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        setTypedRole(currentRole.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setTypedRole(currentRole.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }

      if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    };

    const typingTimeout = setTimeout(handleTyping, isDeleting ? 75 : 150);
    return () => clearTimeout(typingTimeout);
  }, [charIndex, roleIndex, isDeleting]);

  return (
    <AnimatedSection as="div" className="relative flex min-h-[calc(100vh-5rem)] items-center">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
      ></div>
      <div className="container">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            {personalDetails.name}
          </h1>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-primary sm:text-3xl md:text-4xl">
            <span className="h-10 min-h-[40px] md:min-h-[48px] lg:min-h-[56px]">{typedRole}</span>
            <span className="animate-ping">|</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            A {personalDetails.role} with {personalDetails.experience} of experience in building scalable web applications and AI-driven solutions.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/resume.pdf" download="Soumyaranjan-Dash-Resume.pdf">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
