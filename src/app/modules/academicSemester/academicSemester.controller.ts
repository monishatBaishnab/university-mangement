import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const academicSemesterData = req.body;

  const result =
    await academicSemesterServices.createAcademicSemesterIntoDB(
      academicSemesterData,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester created successfully!',
    data: result,
  });
});

const fetchAcademicSemesters = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.fetchAcademicSemestersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters fetched successfully!',
    data: result,
  });
});

const fetchAcademicSemester = catchAsync(async (req, res) => {
  const semesterId = req.params.semesterId;
  const result =
    await academicSemesterServices.fetchAcademicSemesterFromDB(semesterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester fetched successfully!',
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const semesterId = req.params.semesterId;
  const academicSemesterData = req.body;
  const result = await academicSemesterServices.updateAcademicSemesterFromDB(
    semesterId,
    academicSemesterData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester updated successfully!',
    data: result,
  });
});

export const academicSemesterControllers = {
  createAcademicSemester,
  fetchAcademicSemesters,
  fetchAcademicSemester,
  updateAcademicSemester,
};
