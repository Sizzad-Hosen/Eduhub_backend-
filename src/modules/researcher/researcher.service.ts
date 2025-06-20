import QueryBuilder from "../../app/builder/QueryBuilder";
import { sendImageToCloudinary } from "../../app/utils/sendImageToCloudinary";
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
  payload: Partial<TResearcher>,
  file:any
) => {
   // ✅ Find existing student
    const userData = await ResearcherModel.findById(id).populate("user");
    if (!userData) {
      throw new Error("Student not found");
    }
  
    // ✅ File Upload
    if (file) {
      console.log('[11] Starting file upload...');
      const imageName = `${userData._id}_${payload?.name || userData.name}`;
      const { secure_url } = await sendImageToCloudinary(imageName, file.path);
      payload.profileImg = secure_url;
    }
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