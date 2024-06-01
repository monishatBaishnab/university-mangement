import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import AcademicSemesterModel from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { generateStudentId } from './use.utils';
import { NewUser, TUser } from './user.interface';
import UserModel from './user.model';

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

  //set user id
  userData.id = await generateStudentId(admissionSemester as TAcademicSemester);
  //create new user
  const res = await UserModel.create(userData);
  if (Object.keys(res).length) {
    payload.id = res.id;
    payload.user = res._id;

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createUserIntoDB,
};
