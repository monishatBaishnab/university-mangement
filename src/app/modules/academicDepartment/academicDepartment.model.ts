import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: { type: String, required: true },
    academicFaculty: { type: Schema.ObjectId, required: true }
})

const AcademicDepartmentModel = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema);

export default AcademicDepartmentModel;