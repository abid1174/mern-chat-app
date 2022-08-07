import Avatar from "./Avatar";
import person1 from "../assets/img/person-1.jpeg";
import { useAppSelector } from "../redux/store";
import { IUser } from "../model/user";

type Props = {};

export default function Navbar({}: Props) {
  const { image }: IUser = useAppSelector((state) => state?.user?.data);
  return (
    <nav className="flex-shrink-0 bg-gray-900 z-10">
      <div className="mx-w-7xl px-2 sm:px-4 lg:px-8 mx-auto">
        <div className="relative flex items-center justify-between h-16">
          <div></div>
          <div className="flex lg:hidden">
            <button className="bg-red-600 inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none ">
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
          </div>

          <div className="hidden lg:block lg:w-80 ">
            <div className="flex items-center justify-end">
              <div className="flex">
                <a
                  href="#"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white "
                >
                  Chat
                </a>
              </div>
              <div className="ml-4 relative flex-shrink-0">
                <div>
                  <Avatar image={image} status="active" size="md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
