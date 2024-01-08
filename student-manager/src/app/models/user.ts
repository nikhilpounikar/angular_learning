// user.interface.ts
export class User {

    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
    accessToken: string;
  // Add other properties as needed
  constructor(user:User) {

    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.isAdmin = user.isAdmin;
    this.accessToken = user.accessToken;
  }

}
