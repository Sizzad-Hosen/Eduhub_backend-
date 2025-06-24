import mongoose from "mongoose";
import { ResearcherModel } from "../researcher/researcher.model";
import { StudentModel } from "../student/student.model";
import { TeacherModel } from "../teacher/teacher.model";
import { User } from "../users/user.model";
import { Connection } from "./connections.model";

export const sendConnection = async (senderId: string, receiverId: string) => {
let userId: string | null = null;


  const objectId = new mongoose.Types.ObjectId(receiverId);
  


  // Try to find the userId from any profile model
  const student = await StudentModel.findById(objectId);

  if (student) userId = student.user.toString();

  if (!userId) {
    const teacher = await TeacherModel.findById(objectId);
    if (teacher) userId = teacher.user.toString();
  }

  if (!userId) {
    const researcher = await ResearcherModel.findById(objectId);
    if (researcher) userId = researcher.user.toString();
  }

  if (!userId) {
    throw new Error("No matching user found from any model.");
  }

  // Optional: verify that the user exists
  const receiverUser = await User.findById(userId);
  
  if (!receiverUser) {
    throw new Error("Receiver user not found.");
  }

  const existing = await Connection.findOne({  senderId, receiverId:userId });

  if (existing) {
    throw new Error("Connection request already exists");
  }

  const connection = await Connection.create({  senderId, receiverId:userId });
  if (!connection) {
    throw new Error("Failed to create connection");
  }
 
  return connection;
};


export const getReceivedConnections = async (receiverId: string) => {
  

  const result = await Connection.find({receiverId,
    status: "pending",
  })
    .populate("senderId", "name email role profileImg")
    .populate("receiverId", "name email role profileImg");

  return result;
};

export const updateConnectionStatus = async (
  connectionId: string,
  status: "accepted" | "rejected"
) => {
  const updated = await Connection.findByIdAndUpdate(
    connectionId,
    { status },
    { new: true }
  )
    .populate("senderId", "name email role profileImg") // ✅ correct
    .populate("receiverId", "name email role profileImg"); // ✅ correct

  if (!updated) throw new Error("Connection not found");

  return updated;
};


export const getRequestConnections = async (userId: string) => {
  const connections = await Connection.find({

    status: { $in: ["accepted", "rejected"] },
    $or: [
      { senderId: userId },
      { receiverId: userId }
    ]
  })
    .populate("senderId", "name email role profileImg")
    .populate("receiverId", "name email role profileImg");

  return connections;
};

export const ConnnectionServices = {
    sendConnection,
    getReceivedConnections,
    updateConnectionStatus,
    getRequestConnections
  
}
