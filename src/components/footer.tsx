import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { personalDetails } from '@/lib/data';
import { Button } from '@/components/ui/button';

export function Footer({ name }: { name: string }) {
  const socialLinks = [
    { href: personalDetails.social.linkedin, icon: Linkedin },
    { href: personalDetails.social.github, icon: Github },
    { href: personalDetails.social.twitter, icon: Twitter },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {name}. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          {socialLinks.map(({ href, icon: Icon }) => (
            <Button key={href} variant="ghost" size="icon" asChild>
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={href}>
                <Icon className="h-4 w-4" />
              </a>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}
