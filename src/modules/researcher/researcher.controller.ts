import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status";
import { getAllResearchersService, ResearcherServices } from "./researcher.service";

export const getAllResearchersController = catchAsync(async (req, res) => {

  const result = await ResearcherServices.getAllResearchersService();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Researchers retrieved successfully",
    data: result,
  });
});


export const updateResearchController = catchAsync(async (req, res) => {

   const { researcherId } = req.params;

  const payload = req.body;

  console.log(req.params);
  console.log(req.body);


  const result = await ResearcherServices.updateResearcherService(researcherId, payload, req.file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "researcher updated successfully",
    data: result,
  });
});


const getSingelResearcher = catchAsync(async (req, res) => {

  const { researcherId } = req.params;

  const result = await ResearcherServices.getSingelResearcherService(researcherId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Researcher retrieved successfully",
    data: result,
  });
  
});

export const ResearcherControllers = {
    getAllResearchersController,
    updateResearchController,
    getSingelResearcher
}