const Courses = require("../models/Courses");
const Instructor = require("../models/Instructor");
const Students = require("../models/Students");
const StudentList = require("../models/StudentList");

const resolvers = {
  Query: {
    getCourses: async () => {
      const courses = await Courses.find()
        .populate([
          {
            path: "instructor",
          },
          {
            path: "studentList",
            populate: "students",
          },
        ])
        .exec();
      return courses;
    },
    getCourse: async (_, { id }) => {
      const course = await Courses.findById(id).populate([
        {
          path: "instructor",
        },
        {
          path: "studentList",
          populate: "students",
        },
      ]);
      if (!course) throw new Error("Course not found");
      return course;
    },
    getInstructors: async () => {
      const instructors = await Instructor.find({});
      return instructors;
    },
    getInstructor: async (_, { id }) => {
      const instructor = await Instructor.findById(id);
      if (!instructor) throw new Error("Instructor not found");
      return instructor;
    },
    getStudents: async () => {
      const students = await Students.find({});
      return students;
    },
    getStudent: async (_, { id }) => {
      const student = await Students.findById(id);
      if (!student) throw new Error("Student not found");
      return student;
    },
    getStudentlists: async () => {
      const studentLists = await StudentList.find().populate("students");
      return studentLists;
    },
    getStudentList: async (_, { id }) => {
      const studentList = await StudentList.findById(id);
      if (!studentList) throw new Error("StudentList not found");
      return studentList;
    },
    getCourseByDate: async (_, { date }) => {
      const coursesByDate = await Courses.find({ startDate: date }).populate([
        {
          path: "instructor",
        },
        {
          path: "studentList",
          populate: "students",
        },
      ]);
      return coursesByDate;
    },
    getCourseByInstructor: async (_, { id }) => {
      const coursesByInstructor = await Courses.find({
        instructor: id,
      }).populate([
        {
          path: "instructor",
        },
        {
          path: "studentList",
          populate: "students",
        },
      ]);
      if (!coursesByInstructor) throw new Error("Not found");
      return coursesByInstructor;
    },
  },
  Mutation: {
    newCourse: async (_, { input }) => {
      const { title } = input;
      const courseExist = await Courses.findOne({ title });
      if (courseExist) throw new Error("Course already exist");
      try {
        const course = await new Courses(input).populate([
          {
            path: "instructor",
          },
          {
            path: "studentList",
            populate: "students",
          },
        ]);
        await course.save();
        return course;
      } catch (error) {
        console.log(error);
      }
    },
    editCourse: async (_, { id, input }) => {
      let course = await Courses.findById(id);
      if (!course) throw new Error("Course not found");
      course = await Courses.findByIdAndUpdate(id, input, {
        new: true,
      }).populate([
        {
          path: "instructor",
        },
        {
          path: "studentList",
          populate: "students",
        },
      ]);
      return course;
    },
    deleteCourse: async (_, { id }) => {
      const course = await Courses.findById(id);
      if (!course) throw new Error("Course not found");
      await Courses.findByIdAndDelete(id);
      return "Course deleted";
    },
    newInstructor: async (_, { input }) => {
      const { email } = input;
      const instructorExist = await Instructor.findOne({ email });
      if (instructorExist) throw new Error("Instructor already exist");

      try {
        const instructor = new Instructor(input);
        await instructor.save();
        return instructor;
      } catch (error) {
        console.log(error);
      }
    },
    editInstructor: async (_, { id, input }) => {
      let instructor = await Instructor.findById(id);
      if (!instructor) throw new Error("Instructor not found");
      instructor = await Instructor.findByIdAndUpdate(id, input, {
        new: true,
      });
      return instructor;
    },
    deleteInstructor: async (_, { id }) => {
      const instructor = await Instructor.findById(id);
      if (!instructor) throw new Error("Instructor not found");
      await Instructor.findByIdAndDelete(id);
      return "Instructor deleted";
    },
    newStudent: async (_, { input }) => {
      const { email } = input;
      const studentExist = await Students.findOne({ email });
      if (studentExist) throw new Error("Student already exist");

      try {
        const student = new Students(input);
        await student.save();
        return student;
      } catch (error) {
        console.log(error);
      }
    },
    editStudent: async (_, { id, input }) => {
      let student = await Students.findById(id);
      if (!student) throw new Error("Student not found");
      student = await Students.findByIdAndUpdate(id, input, {
        new: true,
      });
      return student;
    },
    deleteStudent: async (_, { id }) => {
      const student = await Students.findById(id);
      if (!student) throw new Error("Student not found");
      await Students.findByIdAndDelete(id);
      return "Student deleted";
    },
    newStudentList: async (_, { input }) => {
      const { listName } = input;
      const studentListExist = await StudentList.findOne({ listName });
      if (studentListExist) throw new Error("Student List already exist");

      try {
        const studentList = await new StudentList(input).populate({
          path: "students",
        });
        console.log(studentList,'///////');
        await studentList.save();
        return studentList;
      } catch (error) {
        console.log(error);
      }
    },
    editStudentList: async (_, { id, input }) => {
      let studentList = await StudentList.findById(id).populate("students");
      if (!studentList) throw new Error("Student List not found");
      studentList = await StudentList.findByIdAndUpdate(id, input, {
        new: true,
      });
      return studentList;
    },
    deleteStudentList: async (_, { id }) => {
      const studentList = await StudentList.findById(id).populate("students");
      if (!studentList) throw new Error("Student List not found");
      await StudentList.findByIdAndDelete(id);
      return "Student List deleted";
    },
  },
};

module.exports = resolvers;
