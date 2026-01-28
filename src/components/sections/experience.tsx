import React from 'react';
import { workExperience } from '@/lib/data';
import { AnimatedSection } from '../animated-section';
import { Briefcase } from 'lucide-react';

export function ExperienceSection() {
  return (
    <AnimatedSection id="experience">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl">Work Experience</h2>
        <p className="mt-4 text-center text-muted-foreground md:text-xl/relaxed">My professional journey so far.</p>
        <div className="relative mt-12">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border"></div>
          {workExperience.map((job, index) => (
            <div key={index} className="relative mb-12 flex w-full items-center justify-between odd:flex-row-reverse">
              <div className="w-5/12"></div>
              <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                <Briefcase className="h-5 w-5" />
              </div>
              <div className="w-5/12 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                <p className="mb-1 text-sm font-semibold text-primary">{job.period}</p>
                <h3 className="mb-2 text-xl font-bold">{job.role}</h3>
                <p className="mb-3 text-base font-normal text-muted-foreground">
                  {job.company} - {job.location}
                </p>
                <ul className="list-disc space-y-1 pl-5 text-left text-sm text-muted-foreground">
                  {job.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
