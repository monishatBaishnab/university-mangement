import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';
import { AppError } from '../../errors/AppError';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

const AcademicFacultyModel = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);

academicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isExistsFaculty = await AcademicFacultyModel.findOne(query);

  if (!isExistsFaculty) {
    throw new AppError(404, 'Faculty does not exist!');
  }

  next();
});

export default AcademicFacultyModel;
