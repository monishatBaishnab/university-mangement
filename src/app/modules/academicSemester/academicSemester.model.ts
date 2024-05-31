import { Schema, model } from 'mongoose';
import {
  TAcademicSemester,
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TMonths,
} from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant';

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

const AcademicSemesterModel = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);

export default AcademicSemesterModel;
