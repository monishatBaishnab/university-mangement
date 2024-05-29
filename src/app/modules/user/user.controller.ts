import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";

const createUser = async(req: Request, res: Response, next: NextFunction) => {
    const {password, student: studentData} = req.body;

    try {
        const result = await UserServices.createUserIntoDB(password, studentData);
        res.send(result)
    } catch (error) {
        console.log(error);
    }
}

export const UserController = {
    createUser,
}