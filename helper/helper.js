// import { addMinutes, addHours } from "date-fns";
const addMinutes = require("date-fns/addMinutes");
const addHours = require("date-fns/addHours");
const endOfDay = require("date-fns/endOfDay");
var startOfDay = require("date-fns/startOfDay");

const verifyDisponibilityOfInstructor = (allCourses, startDate, instructor) => {
  const dateSelect = new Date(startDate);

  const verifyDisponibility = allCourses.filter((course) => {
    const dateStart = new Date(Number(course.startDate));
    const hsMin = course.courseLength.split(":");
    const addHs = addHours(dateStart, Number(hsMin[0]));
    const dateFinish = addMinutes(addHs, Number(hsMin[1]));
    return (
      dateSelect.getTime() > course.startDate &&
      dateSelect.getTime() < dateFinish.getTime()
    );
  });
  const sameInstructor = verifyDisponibility.map((course) => {
    return course.instructor.toString() === instructor;
  });

  return sameInstructor;
};

const coursesByDate = (allCourses, daySelect) => {
  const formatStart = new Date(daySelect);
  const startDay = startOfDay(formatStart);
  const finishDay = endOfDay(startDay);

  const coursesOnDay = allCourses.filter((course) => {
    return (
      course.startDate.getTime() > startDay.getTime() &&
      course.startDate.getTime() < finishDay.getTime()
    );
  });
  return coursesOnDay;
};

module.exports = { verifyDisponibilityOfInstructor, coursesByDate };
