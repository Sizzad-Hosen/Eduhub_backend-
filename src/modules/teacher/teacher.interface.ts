import mongoose, { Types } from "mongoose";

export type Address = {
  city: string;
  homeTown: string;
  presentAddress: string;
};

export interface TTeacher {
  password: string | undefined;
  name: string;
  email: string;
  number: string;
  address: Address;
  expertise:string;
  experience: string;        
  skill: string[];          
  bsc: string;            
  msc?: string;          
  phd?: string;           
  currentlyWorkingAt?: string; 
  bio: string;
  user: Types.ObjectId; 
  profileImg?: string;
}
