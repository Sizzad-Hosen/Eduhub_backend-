import QueryBuilder from "../../app/builder/QueryBuilder";
import { researcherSearchableFields } from "./researcher.constant";
import { TResearcher } from "./researcher.interface";
import { ResearcherModel } from "./researcher.model";

export const getAllResearchersService = async (query: any = {}) => {
  // Fetch all researchers, optionally populate the linked user data

 const researcherQuery = new QueryBuilder(

      ResearcherModel.find().populate('user'),
      query
    )
    .search(researcherSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await researcherQuery.modelQuery;
  return result;
  
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