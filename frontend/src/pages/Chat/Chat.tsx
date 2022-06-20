import Avatar from "../../components/Avatar";
import Navbar from "../../components/Navbar";
import User from "../../components/User";
import { useEffect } from "react";
import {
  useCurrentUserQuery,
  useGetAllUsersQuery,
} from "../../redux/user/userService";
import { setUser, setUsers } from "../../redux/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { IUser } from "../../model/user";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import SearchUser from "./SearchUser";

export default function Chat() {
  const dispatch = useAppDispatch();
  const {
    data: userData,
    isError,
    isLoading,
    isSuccess,
  } = useCurrentUserQuery();
  const { data: usersData, isSuccess: isAllSuccess } = useGetAllUsersQuery();
  const user: IUser = useAppSelector((state) => state?.user?.data);
  const users: IUser[] = useAppSelector((state) => state?.user?.allUsers);

  useEffect(() => {
    dispatch(setUser(userData));
  }, [isSuccess]);

  useEffect(() => {
    dispatch(setUsers(usersData));
  }, [isAllSuccess]);

  return (
    <div>
      <div>
        <div className="relative min-h-screen flex flex-col bg-slate-800">
          {/* <Navbar /> */}
          <div className="flex-grow w-full max-w-7xl mx-auto lg:flex ">
            <div className="flex-1 min-w-0  xl:flex">
              <div className="border-b border-gray-800 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-600 ">
                <div className="h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
                  {/* profile section  */}
                  <div className="flex relative items-center">
                    <Avatar image={user.image} status={false} size="lg" />
                    <div className="flex-1 min-w-0 ml-2">
                      <a href="#" className="focus:outline-none">
                        <span className="absolute inset-0" />
                        <p className="text-sm font-bold text-white">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {user.email}
                        </p>
                      </a>
                    </div>
                  </div>
                  {/* profile section end  */}

                  <SearchUser />

                  {Array.isArray(users) &&
                    users.map(({ image, name, id }) => (
                      <User
                        key={id}
                        image={image}
                        name={name}
                        status="true"
                        unread={2}
                        latestMsg="Hi"
                        time="12:45 AM"
                      />
                    ))}
                </div>
              </div>

              {/* middle chat section  */}
              <div className="flex-1 p:2 sm:pb-6 justify-between flex flex-col h-screen xl:flex">
                <div className="flex sm:items-center justify-between py-3 border-b border-gray-600 p-3">
                  <div className="flex items-center space-x-4">
                    <Avatar image="" size="lg" status={false} />
                    <div className="flex flex-col leading-tight">
                      <div className="text-1xl mt-1 flex items-center">
                        <span className="text-gray-200 mr-3">
                          Ashmira Wariya
                        </span>
                        <span>
                          <svg width={10} height={10}>
                            <circle cx={5} cy={5} r={5} fill="#22c55e" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-400">
                      item
                    </button>
                    <button className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-400">
                      item
                    </button>
                  </div>
                </div>
                {/* // messages starts  */}
                <Messages />

                {/* // messages ends  */}
                <MessageInput />
              </div>

              {/* middle section end  */}
              <div className="pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0 hidden xl:block">
                <div className="h-full pl-6 py-6 lg:w-80"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
