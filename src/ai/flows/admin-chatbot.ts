// This file implements the Genkit flow for the adminChatbot story.
// It provides an AI chatbot to answer frequently asked questions about the system and provide onboarding support to new users.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdminChatbotInputSchema = z.object({
  query: z.string().describe('The user query for the admin chatbot.'),
});
export type AdminChatbotInput = z.infer<typeof AdminChatbotInputSchema>;

const AdminChatbotOutputSchema = z.object({
  response: z.string().describe('The response from the admin chatbot.'),
});
export type AdminChatbotOutput = z.infer<typeof AdminChatbotOutputSchema>;

export async function adminChatbot(input: AdminChatbotInput): Promise<AdminChatbotOutput> {
  return adminChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adminChatbotPrompt',
  input: {schema: AdminChatbotInputSchema},
  output: {schema: AdminChatbotOutputSchema},
  prompt: `You are an AI chatbot designed to answer frequently asked questions from administrators about the NestEdge School Management Engine.

You can also provide onboarding support to new users.

Respond to the following query:

{{query}}`,
});

const adminChatbotFlow = ai.defineFlow(
  {
    name: 'adminChatbotFlow',
    inputSchema: AdminChatbotInputSchema,
    outputSchema: AdminChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
