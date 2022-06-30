import Message from "components/Message";
import { useEffect } from "react";
import { useGetMessagesQuery } from "redux/chat/chatService";
import { setMessages } from "redux/chat/chatSlice";
import { useAppDispatch, useAppSelector } from "redux/store";

type Props = { chatId: string };

export default function Messages({ chatId }: Props) {
  const { data, isSuccess } = useGetMessagesQuery(chatId);
  const { messages } = useAppSelector((state) => state.chat);
  const { id } = useAppSelector((state) => state?.user?.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(data);

    dispatch(setMessages(data?.data));
  }, [isSuccess]);

  return (
    <div
      id="messages"
      className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch "
    >
      {Array.isArray(messages) && messages.length > 0 ? (
        messages.map((msg: any) => {
          let myMessage = false;
          if (msg.sender?._id === id) {
            myMessage = true;
          }
          return <Message text={msg?.content} myMsg={myMessage} image="" />;
        })
      ) : (
        <div>No Messages</div>
      )}
    </div>
  );
}
