import { useAppSelector } from "redux/store";
import Avatar from "./Avatar";

export default function UserProfile() {
  const { name, image, email } = useAppSelector((state) => state.user.data);
  return (
    <div className="flex relative items-center">
      <Avatar image={image} status="active" size="lg" />
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
