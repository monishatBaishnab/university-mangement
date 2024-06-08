import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 20 },
    middleName: { type: String, trim: true },
    lastName: { type: String, trim: true, required: true, maxlength: 20 },
  },
  { _id: false },
);

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, trim: true, required: true },
  fatherOccupation: { type: String, trim: true, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent>({
  id: { type: String, required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'User',
  },
  name: { type: userNameSchema, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  dateOfBirth: { type: Date },
  email: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: { type: guardianSchema, required: true },
  localGuardian: { type: localGuardianSchema, required: true },
  profileImg: { type: String },
  admissionSemester: { type: Schema.Types.ObjectId, ref: 'AcademicSemester' },
  isDeleted: { type: Boolean, default: false },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
  },
});

studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
});

export const Student = model<TStudent>('Student', studentSchema);
