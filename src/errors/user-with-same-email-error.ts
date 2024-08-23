export class UserWithSameEmailError extends Error {
  constructor(email: string) {
    super(`User with ${email} already exists.`);
  }
}
