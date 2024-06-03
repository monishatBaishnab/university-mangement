import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicFacultyServices } from './academicFaculty.service';

const getAllAcademicFaculty = catchAsync(async (req, res) => {
    const result = await academicFacultyServices.fetchAllAcademicFacultyFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculties fetched successfully!',
        data: result
    })
});
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await academicFacultyServices.fetchSingleAcademicFacultyFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculty fetched successfully!',
        data: result
    })
});
const createAcademicFaculty = catchAsync(async (req, res) => {
    const academicFacultyData = req.body;

    const result = await academicFacultyServices.createAcademicFacultyIntoDB(academicFacultyData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculty created successfully!',
        data: result
    })
});
const updateAcademicFaculty = catchAsync(async (req, res) => {
    const id = req.params.id;
    const academicFacultyData = req.body;
    const result = await academicFacultyServices.updateAcademicFacultyIntoDB(id, academicFacultyData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculty updated successfully!',
        data: result
    })
});

export const academicFacultyControllers = {
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  createAcademicFaculty,
  updateAcademicFaculty,
};
