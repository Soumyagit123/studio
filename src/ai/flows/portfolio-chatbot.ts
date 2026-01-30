'use server';
/**
 * @fileOverview A portfolio chatbot that acts as a virtual assistant for Soumyaranjan Dash.
 *
 * - chatWithPortfolioBot - A function that handles the chat conversation.
 * - PortfolioChatInput - The input type for the chatWithPortfolioBot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {personalDetails, professionalSummary, skills, workExperience, projectsData, certifications} from '@/lib/data';

// Combine all data into a context string for the prompt
const portfolioContext = `
  Name: ${personalDetails.name}
  Role: ${personalDetails.role}
  Experience: ${personalDetails.experience}
  Location: ${personalDetails.location}
  Email: ${personalDetails.email}
  Phone: ${personalDetails.phone}

  Professional Summary: ${professionalSummary}

  Skills:
  ${skills.map(skill => `
    - ${skill.category}: ${skill.technologies.join(', ')}
  `).join('')}

  Work Experience:
  ${workExperience.map(job => `
    - Role: ${job.role}
      Company: ${job.company} (${job.period})
      Description: ${job.description.join(' ')}
  `).join('')}

  Projects:
  ${projectsData.map(project => `
    - Title: ${project.title}
      Description: ${project.description}
      Role: ${project.role}
      Tech Stack: ${project.techStack}
  `).join('')}

  Certifications:
  ${certifications.map(cert => `
    - Title: ${cert.title}
      Issuer: ${cert.issuer}
      Description: ${cert.description}
  `).join('')}
`;

const PortfolioChatInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).describe('The conversation history.'),
});
export type PortfolioChatInput = z.infer<typeof PortfolioChatInputSchema>;


export async function chatWithPortfolioBot(input: PortfolioChatInput): Promise<string> {
    return portfolioChatbotFlow(input);
}


const portfolioChatbotFlow = ai.defineFlow(
  {
    name: 'portfolioChatbotFlow',
    inputSchema: PortfolioChatInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    
    const lastUserMessage = input.history[input.history.length - 1];
    const conversationHistory = input.history.slice(0, -1);

    const historyForModel = conversationHistory.map(msg => ({
      role: msg.role,
      content: [{ text: msg.content }]
    }));

    const systemPrompt = `You are a helpful and friendly AI assistant for Soumyaranjan Dash's portfolio website. Your name is "DashBot". Your goal is to answer questions from visitors, recruiters, and potential employers about Soumyaranjan.

    You must be friendly, conversational, and slightly professional. Keep your answers concise and to the point. Do not make up information. If you don't know the answer, say "That's a great question. I don't have that information, but you can reach out to Soumyaranjan directly at ${personalDetails.email}."

    Here is all the information you have about Soumyaranjan Dash:
    ${portfolioContext}

    Engage with the user and answer their questions based *only* on the provided context. When asked about projects, mention the tech stack. When asked about experience, mention the key responsibilities.
    If the conversation history is empty or the user just said hello, start the conversation by introducing yourself as DashBot and asking how you can help.
    `;
    
    const {output} = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      system: systemPrompt,
      history: historyForModel,
      prompt: lastUserMessage.content,
    });

    return output?.text ?? "I'm sorry, I am having trouble responding right now. Please try again in a moment.";
  }
);
