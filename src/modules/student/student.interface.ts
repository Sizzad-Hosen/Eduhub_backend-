import  { Types } from "mongoose";


export type Address = {
  city: string;
  homeTown: string;
  presentAddress: string;
};

export interface TStudent extends Document {
  name: string;
  email: string;
  password:string;
  number: string;
  address: Address;
  experience: string;
  skill: string[];
  university: string;
  bio: string;
  work?: string;
  user: Types.ObjectId,
  academicInterests?: string[];
  course?: string;
  connectRequests?: string[];
  profileImg?: string;
}
