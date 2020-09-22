export class User{
  name: string;
  email: string;

  constructor(name?: string, email?: string) {
    this.name = name;
    this.email = email;
  }

  static fromHttp(user: User): User {
    const newUser = new User();
    newUser.name = user.name;
    newUser.email = user.email;
    return newUser;
  }
}
