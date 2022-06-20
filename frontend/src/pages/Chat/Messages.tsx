import Message from "components/Message";

type Props = {};

export default function Messages({}: Props) {
  return (
    <div
      id="messages"
      className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch "
    >
      <Message text="Hi Abbu" myMsg={false} image="" />
      <Message text="Hello Ammu" myMsg={true} image="" />
      <Message text="Ki koro" myMsg={true} image="" />
      <Message text="Ami Khelci" myMsg={false} image="" />
      <Message text="Kheyeco?" myMsg={true} image="" />
      <Message text="Ha Kheyeci" myMsg={false} image="" />
    </div>
  );
}
