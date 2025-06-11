import { TResearcher } from "./researcher.interface";
import { ResearcherModel } from "./researcher.model";

export const getAllResearchersService = async () => {
  // Fetch all researchers, optionally populate the linked user data
  const researchers = await ResearcherModel.find().populate("user");

  return researchers;
};


export const updateResearcherService = async (
  id: string,
  payload: Partial<TResearcher>
) => {
  const updatedResearcher = await ResearcherModel.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedResearcher) {
    throw new Error("Researcher not found");
  }

  return updatedResearcher;
};

export const ResearcherServices = {
    getAllResearchersService,
    updateResearcherService

}