import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { studentServices } from './student.service';

const deleteStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await studentServices.deleteStudentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully.',
    data: result,
  });
});

export const studentControllers = {
  deleteStudent,
};
