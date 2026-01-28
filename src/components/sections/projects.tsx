import { projectsData } from '@/lib/data';
import { AnimatedSection } from '../animated-section';
import { generateProjectSummaries, type ProjectSummariesOutput } from '@/ai/flows/generate-project-summaries';
import { ProjectCard } from './project-card';

export async function ProjectsSection() {
  const projectInput = {
    projects: projectsData.map(p => ({
      title: p.title,
      description: p.description,
      role: p.role,
      techStack: p.techStack,
    })),
  };

  let aiSummariesResult: ProjectSummariesOutput = { summaries: [] };

  if (process.env.GEMINI_API_KEY) {
    try {
      aiSummariesResult = await generateProjectSummaries(projectInput);
    } catch (error) {
      console.log('Error generating project summaries with Genkit. Falling back to default summaries.', error);
    }
  }
  
  const projectsWithSummaries = projectsData.map(p => {
    const aiSummary = aiSummariesResult.summaries.find(s => s.title === p.title);
    return {
      ...p,
      aiSummary: aiSummary ? aiSummary.summary : 'A standout project showcasing modern development practices.',
    };
  });

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
