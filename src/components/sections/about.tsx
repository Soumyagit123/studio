import React from 'react';
import { professionalSummary } from '@/lib/data';
import { AnimatedSection } from '../animated-section';

export function AboutSection() {
  return (
    <AnimatedSection id="about">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center">About Me</h2>
        <div className="mt-8 max-w-3xl mx-auto">
          <p className="text-lg text-muted-foreground text-center leading-relaxed">
            {professionalSummary}
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}
