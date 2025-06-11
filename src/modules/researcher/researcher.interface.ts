import mongoose, { Types } from "mongoose";

export type Address = {
  city: string;
  homeTown: string;
  presentAddress: string;
};

export interface TResearcher {
  name: string;
  email: string;
  password:string;
  number: string;
  address: Address;
  expertise: string;
  experience: string;
  skill: string;
  bsc: string;
  msc: string;
  phd: string;
  currentlyWorkingAt?: string;
  bio: string;
  user: Types.ObjectId;
  profileImg?: string;

  // ✅ New fields
  researchArea?: string;
  researchPaper?: {
    title: string;
    url?: string;         // For hosted link
    pdfFile?: string;     // For uploaded file path
  }[];
}
