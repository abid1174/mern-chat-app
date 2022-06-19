import Avatar from "../../components/Avatar";
import Navbar from "../../components/Navbar";
import person1 from "../../assets/img/person-1.jpeg";
import ashmira from "../../assets/img/ashmira.jpg";
import abid from "../../assets/img/abid.jpeg";
import SearchIcon from "../../assets/icons/searchIcon";
import User from "../../components/User";
import Message from "../../components/Message";
import { HiOutlineMicrophone } from "react-icons/hi";
import { useEffect } from "react";
import { useCurrentUserQuery } from "../../redux/user/userService";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user/userSlice";

export default function Chat() {
  const dispatch = useDispatch();
  const { data, isError, isLoading, isSuccess } = useCurrentUserQuery();

  useEffect(() => {
    dispatch(setUser(data));
  }, [isSuccess]);

  return (
    <div>
      <div>
        <div className="relative min-h-screen flex flex-col bg-slate-800">
          <Navbar />
          <div className="flex-grow w-full max-w-7xl mx-auto lg:flex ">
            <div className="flex-1 min-w-0  xl:flex">
              <div className="border-b border-gray-800 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-600 ">
                <div className="h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
                  {/* profile section  */}
                  <div className="flex relative items-center">
                    <Avatar image={abid} status={false} size="lg" />
                    <div className="flex-1 min-w-0 ml-2">
                      <a href="#" className="focus:outline-none">
                        <span className="absolute inset-0" />
                        <p className="text-sm font-bold text-white">
                          Abid Al Amin
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          Frontend Developer
                        </p>
                      </a>
                    </div>
                  </div>
                  {/* profile section end  */}

                  {/* search section  */}
                  <div className="my-5">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pinter-events-none">
                        <SearchIcon />
                      </div>
                      <input
                        name="search"
                        className="focus:ring-red-500 focus:border-red-500 block w-full pl-10 sm:text-sm border-gray-100 rounded-full p-2 border"
                      />
                    </div>
                  </div>
                  {/* search section end  */}

                  {/* user box  */}
                  <User
                    image={person1}
                    name="Habibur R."
                    status="true"
                    unread={2}
                    latestMsg="Hi"
                    time="12:45 AM"
                  />
                  <User
                    image={person1}
                    name="Habibur R."
                    status="true"
                    unread={2}
                    latestMsg="Hi"
                    time="12:45 AM"
                  />
                  <User
                    image={person1}
                    name="Habibur R."
                    status="true"
                    unread={2}
                    latestMsg="Hi"
                    time="12:45 AM"
                  />
                  <User
                    image={person1}
                    name="Habibur R."
                    status="true"
                    unread={2}
                    latestMsg="Hi"
                    time="12:45 AM"
                  />
                  {/* user box end */}
                </div>
              </div>

              {/* middle chat section  */}
              <div className="flex-1 p:2 sm:pb-6 justify-between flex flex-col h-screen xl:flex">
                <div className="flex sm:items-center justify-between py-3 border-b border-gray-600 p-3">
                  <div className="flex items-center space-x-4">
                    <Avatar image={ashmira} size="lg" status={false} />
                    <div className="flex flex-col leading-tight">
                      <div className="text-1xl mt-1 flex items-center">
                        <span className="text-gray-200 mr-3">
                          Ashmira Wariya
                        </span>
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
                {/* // messages starts  */}
                <div
                  id="messages"
                  className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch "
                >
                  <Message text="Hi Abbu" myMsg={false} image={ashmira} />
                  <Message text="Hello Ammu" myMsg={true} image={abid} />
                  <Message text="Ki koro" myMsg={true} image={abid} />
                  <Message text="Ami Khelci" myMsg={false} image={ashmira} />
                  <Message text="Kheyeco?" myMsg={true} image={abid} />
                  <Message text="Ha Kheyeci" myMsg={false} image={ashmira} />
                </div>
                {/* // messages ends  */}
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
              </div>

              {/* middle section end  */}
              <div className=" pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0 hidden xl:block">
                <div className="h-full pl-6 py-6 lg:w-80"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
