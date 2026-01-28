'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Menu, Twitter, X, Download } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { personalDetails } from '@/lib/data';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialLinks = [
    { href: personalDetails.social.linkedin, icon: Linkedin },
    { href: personalDetails.social.github, icon: Github },
    { href: personalDetails.social.twitter, icon: Twitter },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-background/80 shadow-md backdrop-blur-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight text-primary">
          Dashfolio
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {socialLinks.map(({ href, icon: Icon }) => (
            <Button key={href} variant="ghost" size="icon" asChild>
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={href}>
                <Icon className="h-4 w-4" />
              </a>
            </Button>
          ))}
          <ThemeToggle />
          <Button asChild>
            <a href="/resume.pdf" download="Soumyaranjan-Dash-Resume.pdf">
              <Download className="mr-2 h-4 w-4" />
              Resume
            </a>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 py-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
               <div className="flex items-center justify-center gap-4 py-4">
                  {socialLinks.map(({ href, icon: Icon }) => (
                    <Button key={href} variant="outline" size="icon" asChild>
                      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={href}>
                        <Icon className="h-5 w-5" />
                      </a>
                    </Button>
                  ))}
                  <ThemeToggle />
                </div>
                <Button asChild className="w-full">
                  <a href="/resume.pdf" download="Soumyaranjan-Dash-Resume.pdf">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
