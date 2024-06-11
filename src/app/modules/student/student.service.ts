import mongoose from 'mongoose';
import UserModel from '../user/user.model';
import { Student } from './student.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';

const fetchAllStudentFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(Student.find(), query)
    .search(studentSearchableFields)
    .filter()
    .paginate()
    .sort()
    .fields()
    .fields();

  const result = await studentQuery.queryModel
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      select: 'name academicFaculty -_id',
      populate: { path: 'academicFaculty', select: 'name -_id' },
    });

  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true },
    );
    const deleteStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true },
    );
    await session.commitTransaction();

    return deleteStudent;
  } catch (error) {
    session.abortTransaction();
  } finally {
    await session.endSession();
  }
};

export const studentServices = {
  fetchAllStudentFromDB,
  deleteStudentFromDB,
};
