'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { personalDetails } from '@/lib/data';
import { Download } from 'lucide-react';
import { AnimatedSection } from '../animated-section';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const roles = ['GenAI Engineer', 'Software Developer', 'GenAI Enthusiast'];

export function HeroSection() {
  const [typedRole, setTypedRole] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const profilePhoto = PlaceHolderImages.find(img => img.id === 'profile-photo');
  const heroBgImage = PlaceHolderImages.find(img => img.id === 'hero-background');


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
    <AnimatedSection as="div" className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden">
      {heroBgImage && (
        <Image
          src={heroBgImage.imageUrl}
          alt="AI background"
          fill
          className="object-cover -z-20"
          priority
          data-ai-hint={heroBgImage.imageHint}
        />
      )}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-background/30 dark:bg-background/60" />
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl xl:text-6xl">
              {personalDetails.name}
            </h1>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-primary sm:text-3xl xl:text-4xl">
              <span className="inline-block min-h-[40px] md:min-h-[48px]">{typedRole}</span>
              <span className="animate-ping">|</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              A {personalDetails.role} with {personalDetails.experience} of experience in building scalable web applications and AI-driven solutions.
            </p>
            <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
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
          <div className="relative md:col-span-2 flex justify-center order-first md:order-last">
             {profilePhoto && (
                <div className="relative">
                  <Image
                    src={profilePhoto.imageUrl}
                    alt="Soumyaranjan Dash"
                    width={240}
                    height={240}
                    className="rounded-full border-4 border-primary/50 object-cover shadow-2xl"
                    priority
                    data-ai-hint={profilePhoto.imageHint}
                  />
                   <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse"></div>
                </div>
            )}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
