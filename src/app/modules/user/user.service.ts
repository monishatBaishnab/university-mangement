import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import AcademicSemesterModel from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { generateStudentId } from './use.utils';
import { NewUser, TUser } from './user.interface';
import UserModel from './user.model';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';

const createUserIntoDB = async (password: string, payload: TStudent) => {
  //create a user object
  const userData: NewUser = {};
  //set use default password if password not given
  userData.password = password || config.default_password;
  //set use role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemesterModel.findOne({
    _id: payload.admissionSemester,
  });
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    //set user id
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester,
    );

    //create new user
    const newUser = await UserModel.create([userData], { session });
    if (!newUser.length) {
      throw new Error('Failed to create user!');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new Error('Failed to create student!');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error as string);
  }
};

export const UserServices = {
  createUserIntoDB,
};
