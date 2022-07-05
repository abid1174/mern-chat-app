export interface IUserState {
  data: IUser;
  allUsers: IUser[];
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  image: string;
}

export const EmptyUser = {
  _id: "",
  id: "",
  name: "",
  email: "",
  image: "",
};
