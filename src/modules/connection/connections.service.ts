import { Connection } from "./connections.model";

export const sendConnection = async (senderId: string, receiverId: string) => {


  const existing = await Connection.findOne({  senderId, receiverId });

  if (existing) {
    throw new Error("Connection request already exists");
  }
console.log("Creating connection with:", { senderId, receiverId });

  const connection = await Connection.create({  senderId, receiverId });
  if (!connection) {
    throw new Error("Failed to create connection");
  }
 
  return connection;
};

export const getReceivedConnections = async (receiverId: string) => {
  return Connection.find({ receiver: receiverId, status: "pending" })
    .populate("sender", "name email role profileImg");
};

export const updateConnectionStatus = async (connectionId: string, action: "accepted" | "rejected") => {
  const updated = await Connection.findByIdAndUpdate(
    connectionId,
    { status: action },
    { new: true }
  ).populate("sender receiver");

  if (!updated) throw new Error("Connection not found");

  return updated;
};


export const ConnnectionServices = {
    sendConnection,
    getReceivedConnections,
    updateConnectionStatus
}
