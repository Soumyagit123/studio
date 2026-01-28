'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating project summaries using AI.
 *
 * - generateProjectSummaries - A function that takes project details as input and returns AI-generated summaries.
 * - ProjectSummariesInput - The input type for the generateProjectSummaries function.
 * - ProjectSummariesOutput - The return type for the generateProjectSummaries function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProjectSummariesInputSchema = z.object({
  projects: z.array(
    z.object({
      title: z.string().describe('The title of the project.'),
      description: z.string().describe('A detailed description of the project.'),
      role: z.string().describe('The role in the project.'),
      techStack: z.string().describe('The tech stack used in the project.'),
    })
  ).describe('An array of project objects.'),
});
export type ProjectSummariesInput = z.infer<typeof ProjectSummariesInputSchema>;

const ProjectSummariesOutputSchema = z.object({
  summaries: z.array(
    z.object({
      title: z.string().describe('The title of the project.'),
      summary: z.string().describe('An AI-generated summary of the project.'),
    })
  ).describe('An array of project summaries.'),
});
export type ProjectSummariesOutput = z.infer<typeof ProjectSummariesOutputSchema>;

export async function generateProjectSummaries(input: ProjectSummariesInput): Promise<ProjectSummariesOutput> {
  return generateProjectSummariesFlow(input);
}

const projectSummaryPrompt = ai.definePrompt({
  name: 'projectSummaryPrompt',
  input: {schema: z.object({
    title: z.string(),
    description: z.string(),
    role: z.string(),
    techStack: z.string()
  })},
  output: {schema: z.object({
    title: z.string(),
    summary: z.string()
  })},
  prompt: `You are a project summary generator that emphasizes key achievements and technologies used. Generate a concise and engaging summary of the following project:\n\nTitle: {{{title}}}\nDescription: {{{description}}}\nRole: {{{role}}}\nTech Stack: {{{techStack}}}\n\nSummary: `,
});

const generateProjectSummariesFlow = ai.defineFlow(
  {
    name: 'generateProjectSummariesFlow',
    inputSchema: ProjectSummariesInputSchema,
    outputSchema: ProjectSummariesOutputSchema,
  },
  async input => {
    const summaries = await Promise.all(
      input.projects.map(async project => {
        const {output} = await projectSummaryPrompt(project);
        return {
          title: project.title,
          summary: output!.summary,
        };
      })
    );
    return {summaries};
  }
);
