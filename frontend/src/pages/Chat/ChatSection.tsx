import React, { useEffect, useState } from "react";
import MessageInput from "components/MessageInput";
import Avatar from "components/Avatar";
import { EmptyUser, IUser } from "model/user";
import Messages from "./Messages";
import { useAppDispatch, useAppSelector } from "redux/store";
import { useSendMessageMutation } from "redux/chat/chatService";
import { socket } from "utils/socket";
import { setMessage } from "redux/chat/chatSlice";

type Props = {};

export default function ChatSection({}: Props) {
  const dispatch = useAppDispatch();
  const [handleSendMsg, { data: messageData, isSuccess }] =
    useSendMessageMutation();
  const [socketConnected, setSocketConnected] = useState(false);
  const chatStateData: any = useAppSelector((state) => state?.chat?.data);
  const user = useAppSelector((state) => state.user.data);
  const {
    _id: chatId,
    isGroupChat,
    users: participants,
    organizer,
  } = chatStateData;

  let participant = EmptyUser;
  if (Array.isArray(participants) && participants.length > 0) {
    // find chat members without signed user
    let filtered = participants.filter((p) => p._id !== user.id);

    // if chat is not grouped
    participant = filtered[0];
  }

  // getting message from socket emit event
  useEffect(() => {
    socket.off("message_received").on("message_received", (message) => {
      console.log(message);

      // store message to reducer state
      dispatch(setMessage(message));
    });
  }, []);

  useEffect(() => {
    if (user?.id) {
      socket?.emit("setup", user);
    }

    socket.on("connection", () => setSocketConnected(true));

    return () => {
      socket.off("connection", () => {});
    };
  }, [user, socket]);

  useEffect(() => {
    if (messageData) {
      console.log(messageData);
      console.log("emiting,,,,,,");
      dispatch(setMessage(messageData.data));
      socket.emit("new_message", messageData.data);
    }
  }, [isSuccess]);

  // hit send message api and store message to db
  const handleSendMessage = (content: string) => {
    console.log("message sending .....");
    handleSendMsg({
      content,
      chatId,
    });
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
