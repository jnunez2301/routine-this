export interface IUser {
  username: string;
  createdAt?: Date; // Optional since it has a default value
  password: string;
  secretAnswer: string;
}
export interface UserSession{
  username: string,
}