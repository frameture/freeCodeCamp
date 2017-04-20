export class User {

  constructor(
    public username: string,
    public password: string,
    public rePassword?: string
  ) {}

  isPasswordIdentical(): boolean {
    return this.password === this.rePassword;
  }
}
