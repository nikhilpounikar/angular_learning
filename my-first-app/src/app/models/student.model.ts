// student.model.ts
export class Student {
    id!: number;
    name: string;
    address: string;
    age: number;
  
    constructor(name: string, address: string, age: number) {
      // this.id = id;
      this.name = name;
      this.address = address;
      this.age = age;
    }
  }
  