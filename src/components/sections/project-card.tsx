'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type Project = {
  id: string;
  title: string;
  year: string;
  description: string;
  role: string;
  techStack: string;
  aiSummary: string;
};

export function ProjectCard({ project }: { project: Project }) {
  const placeholderImage = PlaceHolderImages.find(img => img.id === project.id);

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.year}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="aspect-video overflow-hidden rounded-md border mb-4">
          <Image
            src={placeholderImage?.imageUrl || "https://picsum.photos/seed/placeholder/600/400"}
            alt={project.title}
            width={600}
            height={400}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            data-ai-hint={placeholderImage?.imageHint || 'project screenshot'}
          />
        </div>
        <p className="text-sm text-muted-foreground">{project.aiSummary}</p>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>{project.title}</DialogTitle>
              <DialogDescription>{project.year}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">My Role</h4>
                <p className="text-sm text-muted-foreground">{project.role}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.split(', ').map(tech => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
