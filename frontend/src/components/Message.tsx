import Avatar from "./Avatar";

type Props = {
  text: string;
  myMsg: boolean;
  image: string;
};

export default function Message({ text, myMsg, image }: Props) {
  return (
    <div
      className={`flex items-end justify-start ${myMsg && "flex-row-reverse"} `}
    >
      <Avatar size="sm" image={image} status="active" />
      <div className="flex flex-col space-x-2 text-xs max-w-xs mx-2 order-2 items-start">
        <span
          className={`px-4 py-2 rounded-lg inline-block ${
            myMsg ? "rounded-br-none" : "rounded-bl-none"
          }  bg-gray-200`}
        >
          {text}
        </span>
      </div>
    </div>
  );
}
