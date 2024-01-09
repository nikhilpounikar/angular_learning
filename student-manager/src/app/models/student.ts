export interface Student {
    studentId: string;
    name:string;
    email:string;
    dateOfBirth: string; // You may want to use a Date type, but for simplicity, using string here
    gender: 'M' | 'F'; // A string that can only be 'M' or 'F'
    courses:Array<String>
}