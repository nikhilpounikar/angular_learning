// user.interface.ts
export class User {

    id: number;
    firstName: string;
    lastName: string;
    email: string;
    accessToken: string;
    password:string;
  // Add other properties as needed
  constructor(user:User) {

    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.accessToken = user.accessToken;
    this.password = user.password;
  }

}
