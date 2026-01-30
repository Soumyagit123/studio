import { projectsData } from '@/lib/data';
import { AnimatedSection } from '../animated-section';
import { ProjectCard } from './project-card';

export async function ProjectsSection() {
  // Using static summaries to avoid Gemini API quota issues
  // The chatbot now uses Anthropic Claude instead
  const projectsWithSummaries = projectsData.map(p => ({
    ...p,
    aiSummary: p.description.slice(0, 150) + '...',
  }));

  return (
    <AnimatedSection id="projects" className="bg-secondary">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl">Featured Projects</h2>
        <p className="mt-4 text-center text-muted-foreground md:text-xl/relaxed">
          Here are some of the projects I'm proud of.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projectsWithSummaries.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
