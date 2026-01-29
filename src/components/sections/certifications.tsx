import React from 'react';
import Image from 'next/image';
import { certifications, personalDetails } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimatedSection } from '../animated-section';
import { ExternalLink } from 'lucide-react';

export function CertificationsSection() {
  const certificateImage = PlaceHolderImages.find(img => img.id === 'certificate-badge');

  return (
    <AnimatedSection id="certifications">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl">Certifications & Badges</h2>
        <p className="mt-4 text-center text-muted-foreground md:text-xl/relaxed">
          Validation of my skills and expertise.
        </p>
        <div className="mt-12 max-w-2xl mx-auto space-y-8">
          {certifications.map((cert) => (
            <a
              key={cert.title}
              href={cert.verificationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block group transition-transform duration-300 hover:scale-[1.02]"
            >
              <Card>
                <CardHeader className="flex flex-col items-center text-center sm:flex-row sm:text-left">
                  {certificateImage && (
                    <Image
                      src={certificateImage.imageUrl}
                      alt={cert.title}
                      width={100}
                      height={100}
                      className="rounded-full border p-1"
                      data-ai-hint={certificateImage.imageHint}
                    />
                  )}
                  <div className="sm:ml-6 mt-4 sm:mt-0">
                    <CardTitle className="flex items-center gap-2 transition-colors group-hover:text-primary">
                      {cert.title}
                      <ExternalLink className="h-4 w-4 opacity-70 group-hover:opacity-100" />
                    </CardTitle>
                    <CardDescription className="mt-1">{cert.issuer} - {cert.date}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center sm:text-left">{cert.description}</p>
                </CardContent>
              </Card>
            </a>
          ))}
          {personalDetails.social.credly && (
            <div className="text-center">
              <Button asChild size="lg">
                <a href={personalDetails.social.credly} target="_blank" rel="noopener noreferrer">
                  View All Badges on Credly
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}
