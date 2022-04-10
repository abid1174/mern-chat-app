import { useState } from "react";
import ChatImage from "../../assets/chat-1.png";
import SingIn from "../../components/SingIn";
import SignUp from "../../components/SignUp";
import clsx from "clsx";
import useToast from "../../hooks/useToast";

export default function Home() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const toast = useToast();

  console.log(toast);

  const handleChangeForm = (value: boolean) => {
    setIsLogin(value);
    //@ts-ignore
    toast.open({
      message: "Hello there !",
      status: "warning",
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img
          className="w-full h-full object-contain p-10"
          src={ChatImage}
          alt="chat"
        />
      </div>
      <div className="bg-gray-800 flex flex-col justify-center">
        <div className="relative max-w-[400px] min-h-[550px]  w-full mx-auto group perspective">
          <div
            className={clsx(
              "relative preserve-3d w-full h-full duration-1000",
              !isLogin && "rotate-y-180"
            )}
          >
            <div className="absolute w-full h-full backface-hidden">
              <SingIn handleChangeForm={handleChangeForm} />
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180">
              <SignUp handleChangeForm={handleChangeForm} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
