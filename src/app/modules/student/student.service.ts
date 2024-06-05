import mongoose from "mongoose"
import UserModel from "../user/user.model"
import { Student } from "./student.model"

const deleteStudentFromDB = async (id: string) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        await UserModel.findOneAndUpdate({ id }, { isDeleted: true }, {new:true})
        const deleteStudent = await Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true })
        await session.commitTransaction();

        return deleteStudent;
    } catch (error) {
        session.abortTransaction();
    } finally {
        await session.endSession();
    }
}

export const studentServices = {
    deleteStudentFromDB
}