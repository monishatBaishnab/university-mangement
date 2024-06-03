import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicDepartmentServices } from './academicDepartment.service';

const fetchAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.fetchAllAcademicDepartmentFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic departments fetched successfully!',
    data: result,
  });
});

const fetchSingleAcademicDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result =
    await academicDepartmentServices.fetchSingleAcademicDepartmentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department fetched successfully!',
    data: result,
  });
});

const createAcademicDepartment = catchAsync(async (req, res) => {
  const academicDepartmentData = req.body;
  const result =
    await academicDepartmentServices.createAcademicDepartmentIntoDB(
      academicDepartmentData,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department created successfully!',
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const academicDepartmentData = req.body;
  const result =
    await academicDepartmentServices.updateAcademicDepartmentFromDB(
      id,
      academicDepartmentData,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic departments updated successfully!',
    data: result,
  });
});

export const academicDepartmentControllers = {
  fetchAllAcademicDepartment,
  fetchSingleAcademicDepartment,
  createAcademicDepartment,
  updateAcademicDepartment,
};
