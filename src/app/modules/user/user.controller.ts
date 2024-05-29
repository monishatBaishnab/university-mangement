import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";


const createUser = catchAsync(async (req, res) => {
    const { password, student: studentData } = req.body;

    const result = await UserServices.createUserIntoDB(password, studentData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student successfully created.',
        data: result
    })
})

export const UserController = {
    createUser,
}