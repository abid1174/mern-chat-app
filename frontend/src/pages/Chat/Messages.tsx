import Message from "components/Message";
import { useEffect, memo, useRef } from "react";
import { useGetMessagesQuery } from "redux/chat/chatService";
import { useAppDispatch, useAppSelector } from "redux/store";
import { socket } from "utils/socket";

type Props = { chatId: string };

function Messages({ chatId }: Props) {
  const dispatch = useAppDispatch();
  const { isSuccess } = useGetMessagesQuery(chatId);

  const { messages } = useAppSelector((state) => state.chat);
  const { id } = useAppSelector((state) => state?.user?.data);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatId) {
      socket.emit("join chat", chatId);
    }
  }, [isSuccess, chatId]);

  useEffect(() => {
    const height = chatContainerRef.current?.children.length;
    //@ts-ignore
    chatContainerRef.current.scrollTo(0, height * 100);
  });

  return (
    <div
      ref={chatContainerRef}
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

export default memo(Messages);
