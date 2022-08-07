import User from "../../components/UserCard";
import { useState } from "react";
import {
  useCurrentUserQuery,
  useGetAllUsersQuery,
} from "../../redux/user/userService";
import { useAppSelector } from "../../redux/store";
import { IUser } from "../../model/user";
import SearchUser from "./SearchUser";
import { useAccessChatMutation } from "redux/chat/chatService";
import UserProfile from "components/UserProfile";
import ChatSection from "./ChatSection";
import EditProfile from "./EditProfile";

export default function Chat() {
  const [selectedUser, setSelectedUser] = useState(false);

  useCurrentUserQuery();
  useGetAllUsersQuery();
  const [handleAccessChat] = useAccessChatMutation();

  const users: IUser[] = useAppSelector((state) => state?.user?.allUsers);

  const handleStartChat = (participantId: string) => {
    handleAccessChat(participantId);
    setSelectedUser(true);
  };

  return (
    <div>
      <div>
        <div className="relative min-h-screen flex flex-col bg-slate-800">
          {/* <Navbar /> */}
          <div className="flex-grow w-full max-w-7xl mx-auto lg:flex ">
            <div className="flex-1 min-w-0  xl:flex">
              <div className="border-b border-gray-800 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-600 ">
                <div className="h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
                  <UserProfile />
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
              {selectedUser ? (
                <ChatSection />
              ) : (
                <div className="flex-1 flex justify-center items-center text-white text-lg uppercase">
                  Select a user to start chat
                </div>
              )}

              {/* middle section end  */}
              <div className="pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0 hidden xl:block">
                <div className="h-full pl-6 py-6 lg:w-80">
                  <EditProfile />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
