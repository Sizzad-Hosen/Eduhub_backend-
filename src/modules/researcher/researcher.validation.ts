import { z } from "zod";

export const addressValidation = z.object({
  city: z.string().min(1, "City is required"),
  homeTown: z.string().min(1, "Home town is required"),
  presentAddress: z.string().min(1, "Present address is required"),
});

export const researchPaperValidation = z.object({
  title: z.string().min(1, "Research paper title is required"),
  url: z.string().url().optional(),
  pdfFile: z.string().optional(),
});

export const createResearcherValidation = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  number: z.string().min(6),
  address: addressValidation,
  expertise: z.string(),
  experience: z.string(),
  skill: z.string(),
  bsc: z.string(),
  msc: z.string().optional(),
  phd: z.string().optional(),
  currentlyWorkingAt: z.string().optional(),
  bio: z.string(),
  user: z.string(), // Expecting MongoDB ObjectId as string
  profileImg: z.string().optional(),
  researchArea: z.string().optional(),
  researchPaper: z.array(researchPaperValidation).optional(),
});
