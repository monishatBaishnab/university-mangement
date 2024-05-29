import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { NewUser, TUser } from "./user.interface";
import UserModel from "./user.model";

const createUserIntoDB = async (password: string, studentData: TStudent) => {
    //create a user object
    const userData: NewUser = {};
    //set use default password if password not given
    userData.password = password || config.default_password;
    //set use role
    userData.role = 'student';
    //set user id
    userData.id = '20301254'
    //create new user
    const res = await UserModel.create(userData);
    if (Object.keys(res).length) {
        studentData.id = res.id;
        studentData.user = res._id;

        const newStudent = await Student.create(studentData);
        return newStudent;
    }
}

export const UserServices = {
    createUserIntoDB,
}