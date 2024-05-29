import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { password, student: studentData } = req.body;

    try {
        const result = await UserServices.createUserIntoDB(password, studentData);

        sendResponse(
            res,
            {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Student successfully created.',
                data: result
            })

    } catch (error) {
        next(error);
    }
}

export const UserController = {
    createUser,
}