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
 body:z.object({
   name: z.string().min(1),
  email: z.string().email(),
  number: z.string().min(6),
  password: z.string().min(6),
  address: addressValidation,
  expertise: z.string(),
  experience: z.string(),
  skill:  z.array(z.string().min(1, "Skill must be at least 1 character")),
  bsc: z.string(),
  msc: z.string().optional(),
  phd: z.string().optional(),
  currentlyWorkingAt: z.string().optional(),
  bio: z.string(),
  user: z.string().min(24, "User must be a valid Mongo ObjectId").optional(),
  profileImg: z.string().optional(),
  researchArea: z.string().optional(),
  researchPaper: z.array(researchPaperValidation).optional(),
 })
});

export const updateResearcherValidation = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    number: z.string().min(6).optional(),
    password: z.string().min(6).optional(),
    address: addressValidation.optional(),
    expertise: z.string().optional(),
    experience: z.string().optional(),
    skill: z.array(z.string()),
    bsc: z.string().optional(),
    msc: z.string().optional(),
    phd: z.string().optional(),
    currentlyWorkingAt: z.string().optional(),
    bio: z.string().optional(),
    user: z.string().min(24, "User must be a valid Mongo ObjectId").optional(),
    profileImg: z.string().optional(),
    researchArea: z.string().optional(),
    researchPaper: z.array(researchPaperValidation).optional(),
  }),
});


export const ResearcherValidationSchemas = {
  createResearcherValidation,
  updateResearcherValidation
}




