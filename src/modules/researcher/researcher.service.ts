import QueryBuilder from "../../app/builder/QueryBuilder";
import { sendImageToCloudinary } from "../../app/utils/sendImageToCloudinary";
import { researcherSearchableFields } from "./researcher.constant";
import { TResearcher } from "./researcher.interface";
import { ResearcherModel } from "./researcher.model";

export const getAllResearchersService = async (query: any = {}) => {
  const researcherQuery = new QueryBuilder(
    ResearcherModel.find().populate('user'),
    query
  )
    .search(researcherSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  // Count total documents matching the filter (without pagination)
  await researcherQuery.countTotal();

  // Execute the paginated query
  const result = await researcherQuery.modelQuery;

  return {
    data: result,  // array of researchers
    meta: {
      total: researcherQuery.total,
      page: researcherQuery.page,
      limit: researcherQuery.limit,
      totalPages: researcherQuery.totalPages,
    },
  };
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

const getSingelResearcherService = async (id: string) => {

  const student = await ResearcherModel.findById(id).populate('user');

  if (!student) {
    throw new Error("Student not found");
  }

  return student;
}

export const ResearcherServices = {
    getAllResearchersService,
    updateResearcherService,
    getSingelResearcherService 

}