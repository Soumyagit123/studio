import React from 'react';
import { skills } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedSection } from '../animated-section';

export function SkillsSection() {
  return (
    <AnimatedSection id="skills" className="bg-secondary">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl">Technical Skills</h2>
        <p className="mt-4 text-center text-muted-foreground md:text-xl/relaxed">
          A glimpse into the technologies I work with.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skillCategory) => (
            <Card key={skillCategory.category} className="flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4">
                <skillCategory.icon className="h-8 w-8 text-primary" />
                <CardTitle>{skillCategory.category}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {skillCategory.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
