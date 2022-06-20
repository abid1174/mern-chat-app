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
  id: "",
  name: "",
  email: "",
  image: "",
};
