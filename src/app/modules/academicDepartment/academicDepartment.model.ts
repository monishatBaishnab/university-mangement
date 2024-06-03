import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AcademicFacultyModel from '../academicFaculty/academicFaculty.model';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.ObjectId, required: true, ref: 'AcademicFaculty' },
  },
  { timestamps: true },
);

academicDepartmentSchema.pre('save', async function (next) {
  const findAcademicFaculty = await AcademicFacultyModel.findOne({
    _id: this.academicFaculty,
  });

  if (!findAcademicFaculty) {
    throw new Error('Academic Faculty not found!');
  }

  next();
});

const AcademicDepartmentModel = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);

export default AcademicDepartmentModel;
