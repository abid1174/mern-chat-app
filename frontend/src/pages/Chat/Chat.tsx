import User from "../../components/UserCard";
import { useEffect } from "react";
import {
  useCurrentUserQuery,
  useGetAllUsersQuery,
} from "../../redux/user/userService";
import { setUser, setUsers } from "../../redux/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { EmptyUser, IUser } from "../../model/user";
import SearchUser from "./SearchUser";
import { useAccessChatMutation } from "redux/chat/chatService";
import { setChatData } from "redux/chat/chatSlice";
import UserProfile from "components/UserProfile";
import ChatSection from "./ChatSection";

export default function Chat() {
  const dispatch = useAppDispatch();
  const {
    data: userData,
    isError: isUserError,
    isLoading: isUserLoading,
    isSuccess: isUserSuccess,
  } = useCurrentUserQuery();
  const { data: usersData, isSuccess: isUsersSuccess } = useGetAllUsersQuery();
  const user: IUser = useAppSelector((state) => state?.user?.data);
  const users: IUser[] = useAppSelector((state) => state?.user?.allUsers);

  const [
    handleAccessChat,
    {
      data: chatData,
      isLoading: isChatLoading,
      isError: isChatError,
      isSuccess: isChatSuccess,
    },
  ] = useAccessChatMutation();

  useEffect(() => {
    dispatch(setUser(userData));
  }, [isUserSuccess]);

  useEffect(() => {
    dispatch(setUsers(usersData));
  }, [isUsersSuccess]);

  const handleStartChat = (userId: string) => {
    handleAccessChat(userId);
  };

  useEffect(() => {
    dispatch(setChatData(chatData));
  }, [isChatSuccess]);

  return (
    <div>
      <div>
        <div className="relative min-h-screen flex flex-col bg-slate-800">
          {/* <Navbar /> */}
          <div className="flex-grow w-full max-w-7xl mx-auto lg:flex ">
            <div className="flex-1 min-w-0  xl:flex">
              <div className="border-b border-gray-800 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-600 ">
                <div className="h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
                  <UserProfile
                    name={user?.name}
                    email={user?.email}
                    image={user?.image}
                  />
                  <SearchUser />

                  {Array.isArray(users) &&
                    users.map(({ image, name, id }) => (
                      <User
                        key={id}
                        id={id}
                        image={image}
                        name={name}
                        status="true"
                        unread={2}
                        latestMsg="Hi"
                        time="12:45 AM"
                        handleClick={handleStartChat}
                      />
                    ))}
                </div>
              </div>

              {/* middle chat section  */}
              <ChatSection />

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
