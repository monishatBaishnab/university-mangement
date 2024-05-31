import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
    const academicSemesterData = req.body;

    const result = await academicSemesterServices.createAcademicSemesterIntoDB(academicSemesterData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic semester created successfully!',
        data: result
    })
});

export const academicSemesterControllers = {
    createAcademicSemester,
};
