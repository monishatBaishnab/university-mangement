import mongoose from 'mongoose';
import UserModel from '../user/user.model';
import { Student } from './student.model';

const fetchAllStudentFromDB = async (query: Record<string, unknown>) => {
  const queryObj = {...query};
  let searchTerm = '';
  const searchFields = ['name.firstName', 'email', 'permanentAddress', 'id'];
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const excludeFiles = ['searchTerm'];
  excludeFiles?.forEach(el => delete queryObj[el]);

  const searchQuery = Student.find({
    $or: searchFields.map((field) => ({
      [field]: {$regex: searchTerm, $options: 'i'}
    }))
  })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      select: 'name academicFaculty -_id',
      populate: { path: 'academicFaculty', select: 'name -_id' },
    });

  const filterQuery = searchQuery.find(queryObj);

  const result = await filterQuery.find();

  if(result?.length < 1){
    throw new Error('No data found.')
  }
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
