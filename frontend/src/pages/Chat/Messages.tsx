import Message from "components/Message";
import { useEffect } from "react";
import { useGetMessagesQuery } from "redux/chat/chatService";
import { setMessages } from "redux/chat/chatSlice";
import { useAppSelector } from "redux/store";

type Props = { chatId: string };

export default function Messages({ chatId }: Props) {
  const { data, isSuccess } = useGetMessagesQuery(chatId);
  const { messages } = useAppSelector((state) => state.chat);
  useEffect(() => {
    setMessages(data);
  }, [isSuccess]);

  return (
    <div
      id="messages"
      className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch "
    >
      {Array.isArray(messages) && messages.length > 0 ? (
        <Message text="Hi Abbu" myMsg={false} image="" />
      ) : (
        <div>No messages</div>
      )}

      {/* <Message text="Hello Ammu" myMsg={true} image="" />
      <Message text="Ki koro" myMsg={true} image="" />
      <Message text="Ami Khelci" myMsg={false} image="" />
      <Message text="Kheyeco?" myMsg={true} image="" />
      <Message text="Ha Kheyeci" myMsg={false} image="" /> */}
    </div>
  );
}
