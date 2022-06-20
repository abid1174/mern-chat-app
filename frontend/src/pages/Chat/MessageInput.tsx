import { HiOutlineMicrophone } from "react-icons/hi";

type Props = {};

export default function MessageInput({}: Props) {
  return (
    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2">
      <div className="relative flex">
        <span className="absolute inset-y-0 flex items-center">
          <button className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 ">
            <HiOutlineMicrophone color="red" />
          </button>
        </span>
        <input className="focus:outline-none w-full focus:placeholder-gray-400 text-gray-300 placeholder-gray-400 pl-12 bg-gray-600 rounded-full py-3 border-gray-200 " />
      </div>
    </div>
  );
}
