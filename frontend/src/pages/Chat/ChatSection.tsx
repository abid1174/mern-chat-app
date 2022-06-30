import MessageInput from "components/MessageInput";
import Avatar from "components/Avatar";
import { EmptyUser, IUser } from "model/user";
import Messages from "./Messages";
import { useAppSelector } from "redux/store";
import React from "react";
import { useSendMessageMutation } from "redux/chat/chatService";

type Props = {};

export default function ChatSection({}: Props) {
  const [handleSendMsg, { isSuccess }] = useSendMessageMutation();
  const chatStateData: any = useAppSelector((state) => state?.chat?.data);
  const {
    _id: chatId,
    isGroupChat,
    users: participants,
    organizer,
  } = chatStateData;

  let participant = EmptyUser;
  if (Array.isArray(participants) && participants.length > 0) {
    participant = participants[0];
  }

  const handleSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // @ts-ignore
      const content = e.target?.value;
      handleSendMsg({
        content,
        chatId,
      });
    }
  };

  return (
    <div className="flex-1 p:2 sm:pb-6 justify-between flex flex-col h-screen xl:flex">
      <div className="flex sm:items-center justify-between py-3 border-b border-gray-600 p-3">
        <div className="flex items-center space-x-4">
          <Avatar image={participant?.image} size="lg" status={false} />
          <div className="flex flex-col leading-tight">
            <div className="text-1xl mt-1 flex items-center">
              <span className="text-gray-200 mr-3">{participant?.name}</span>
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
      <Messages chatId={chatId} />
      <MessageInput handleSubmit={handleSendMessage} />
    </div>
  );
}
