import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant';
import { AppError } from '../../errors/AppError';

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: { type: String, enum: AcademicSemesterName, required: true },
  code: { type: String, enum: AcademicSemesterCode, required: true },
  year: { type: String, required: true },
  startMonth: {
    type: String,
    enum: Months,
    required: true,
  },
  endMonth: {
    type: String,
    enum: Months,
    required: true,
  },
});

academicSemesterSchema.pre('save', async function (next) {
  const name = this.name;
  const isSemesterExists = await AcademicSemesterModel.findOne({
    year: this.year,
    name: this.name,
  });

  if (isSemesterExists) {
    throw new Error('Semester is already exists.');
  }

  next();
});

academicSemesterSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isExists = await AcademicSemesterModel.findOne(query);

  if (!isExists) {
    throw new AppError(404, 'Semester does not exist!');
  }

  next();
});

const AcademicSemesterModel = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);

export default AcademicSemesterModel;
