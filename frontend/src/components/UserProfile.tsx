import { IUser } from "model/user";
import Avatar from "./Avatar";

type Props = {
  name: string;
  image: string;
  email: string;
};

export default function UserProfile({ image, name, email }: Props) {
  return (
    <div className="flex relative items-center">
      <Avatar image={image} status={false} size="lg" />
      <div className="flex-1 min-w-0 ml-2">
        <a href="#" className="focus:outline-none">
          <span className="absolute inset-0" />
          <p className="text-sm font-bold text-white">{name}</p>
          <p className="text-sm text-gray-500 truncate">{email}</p>
        </a>
      </div>
    </div>
  );
}
