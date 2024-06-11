import { Schema, model } from 'mongoose';
import { TFaculty, TFacultyName } from './faculty.interface';
const userNameSchema = new Schema<TFacultyName>(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 20 },
    middleName: { type: String, trim: true },
    lastName: { type: String, trim: true, required: true, maxlength: 20 },
  },
  { _id: false },
);

const facultySchema = new Schema<TFaculty>({
  id: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'User',
  },
  name: { type: userNameSchema, required: true },
  designation: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'others'], required: true },
  dateOfBirth: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  profileImage: { type: String, required: true },
  academicFaculty: {
    type: Schema.ObjectId,
    required: true,
    ref: 'AcademicFaculty',
  },
  academicDepartment: {
    type: Schema.ObjectId,
    required: true,
    ref: 'AcademicDepartment',
  },
  isDeleted: { type: Boolean, required: true },
}, { timestamps: true });

const FacultyModel = model<TFaculty>('Faculty', facultySchema);

export default FacultyModel;