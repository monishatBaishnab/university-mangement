import catchAsync from "../../utils/catchAsync";
import { facultyServices } from "./faculty.services";

const createFaculty = catchAsync(async (req, res) => {
    const result = await facultyServices.createFacultyIntoDB(req.body);
})

export const facultyControllers = {
    createFaculty
}