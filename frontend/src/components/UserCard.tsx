import React from "react";
import Avatar from "./Avatar";
import person1 from "../assets/img/person-1.jpeg";

type Props = {
  id: string;
  image: string;
  name: string;
  latestMsg: string;
  time: string;
  status: string;
  unread: number;
  handleClick: Function;
};

export default function User({
  id,
  image,
  name,
  latestMsg,
  time,
  status,
  unread,
  handleClick,
}: Props) {
  return (
    <div
      className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400  mb-3 bg-gray-600 bg-opacity-30 hover:bg-opacity-90"
      onClick={() => handleClick(id)}
    >
      <div className="flex-shrink-0">
        <Avatar image={image} size="lg" status="active" />
      </div>
      <div className="flex-1 min-w-0">
        <a href="#" className="focus:outline-none">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-gray-200">{name}</p>
            <div className="text-gray-400 text-xs">{time}</div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 truncate">{latestMsg}</p>
            <div className="text-white text-xs bg-red-400 rounded-full px-1 py-0">
              {unread}
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
