import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AcademicFacultyModel from '../academicFaculty/academicFaculty.model';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: {
      type: Schema.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
  },
  { timestamps: true },
);

academicDepartmentSchema.pre('save', async function (next) {
  const isAcademicFacultyExists = await AcademicFacultyModel.findOne({
    _id: this.academicFaculty,
  });
  const isAcademicDepartmentExists = await AcademicDepartmentModel.findOne({
    name: this.name,
  });


  if (!isAcademicFacultyExists) {
    throw new Error('Academic Faculty not found!');
  }

  if (isAcademicDepartmentExists) {
    throw new Error('Academic Department already exists!');
  }

  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isExistsDepartment = await AcademicDepartmentModel.findOne(query);

  if (!isExistsDepartment) {
    throw new Error("Department does not exist!");
  }

  next();
})

const AcademicDepartmentModel = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);

export default AcademicDepartmentModel;
