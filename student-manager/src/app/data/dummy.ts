import { Course } from "../models/course";
import { Student } from "../models/student";

// Dummy data for students
export const dummyStudents: Student[] = [
    {
      studentId: '1',
      name: 'John Doe',
      email: 'john@example.com',
      dateOfBirth: 'Tuesday, 9 January 2024 06:52:14',
      gender: 'M',
      courses: ['Math', 'Physics']
    },
    {
      studentId: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      dateOfBirth: 'Tuesday, 9 January 2024 06:52:14',
      gender: 'F',
      courses: ['English', 'History']
    },
    {
      studentId: '3',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      dateOfBirth: 'Tuesday, 9 January 2024 06:52:14',
      gender: 'F',
      courses: ['Chemistry', 'Biology']
    },
    {
      studentId: '4',
      name: 'Bob Anderson',
      email: 'bob@example.com',
      dateOfBirth: 'Tuesday, 9 January 2024 06:52:14',
      gender: 'M',
      courses: ['Computer Science', 'Programming']
    },
    {
      studentId: '5',
      name: 'Eva Williams',
      email: 'eva@example.com',
      dateOfBirth: 'Tuesday, 9 January 2024 06:52:14',
      gender: 'F',
      courses: ['Geography', 'Sociology']
    },
    {
      studentId: '6',
      name: 'Michael Brown',
      email: 'michael@example.com',
      dateOfBirth: 'Tuesday, 9 January 2024 06:52:14',
      gender: 'M',
      courses: ['Economics', 'Political Science']
    },
    {
      studentId: '7',
      name: 'Sophia Davis',
      email: 'sophia@example.com',
      dateOfBirth: 'Tuesday, 9 January 2024 06:52:14',
      gender: 'F',
      courses: ['History', 'Literature']
    },
    {
      studentId: '8',
      name: 'William Taylor',
      email: 'william@example.com',
      dateOfBirth: 'Tuesday, 9 January 2024 06:52:14',
      gender: 'M',
      courses: ['Physics', 'Chemistry']
    },
    {
      studentId: '9',
      name: 'Olivia Martinez',
      email: 'olivia@example.com',
      dateOfBirth: 'Tuesday, 9 January 2024 06:52:14',
      gender: 'F',
      courses: ['Math', 'Computer Science']
    },
    {
      studentId: '10',
      name: 'Daniel Rodriguez',
      email: 'daniel@example.com',
      dateOfBirth: 'Tuesday, 9 January 2024 06:52:14',
      gender: 'M',
      courses: ['Literature', 'History']
    },
    // Add 10 more students as needed
  ];
  
 // Dummy data for courses
export const dummyCourses: Course[] = [
    {
      courseId: '1',
      courseName: 'Math',
      price: '100',
      students: ['John Doe', 'Jane Smith']
    },
    {
      courseId: '2',
      courseName: 'Physics',
      price: '120',
      students: ['Alice Johnson', 'Bob Anderson']
    },
    {
      courseId: '3',
      courseName: 'Chemistry',
      price: '90',
      students: ['Eva Williams', 'Michael Brown']
    },
    {
      courseId: '4',
      courseName: 'Biology',
      price: '110',
      students: ['Sophia Davis', 'William Taylor']
    },
    {
      courseId: '5',
      courseName: 'Computer Science',
      price: '130',
      students: ['Olivia Martinez', 'Daniel Rodriguez']
    },
    {
      courseId: '6',
      courseName: 'Programming',
      price: '150',
      students: ['John Doe', 'Jane Smith']
    },
    {
      courseId: '7',
      courseName: 'Geography',
      price: '80',
      students: ['Alice Johnson', 'Bob Anderson']
    },
    {
      courseId: '8',
      courseName: 'Sociology',
      price: '95',
      students: ['Eva Williams', 'Michael Brown']
    },
    {
      courseId: '9',
      courseName: 'Economics',
      price: '120',
      students: ['Sophia Davis', 'William Taylor']
    },
    {
      courseId: '10',
      courseName: 'Political Science',
      price: '110',
      students: ['Olivia Martinez', 'Daniel Rodriguez']
    },
    // Add 10 more courses as needed
  ];
  