import Avatar from "../../components/Avatar";
import Navbar from "../../components/Navbar";
import person1 from "../../assets/img/person-1.jpeg";
import SearchIcon from "../../assets/icons/searchIcon";
import User from "../../components/User";

export default function Chat() {
  return (
    <div>
      <div>
        <div className="relative min-h-screen flex flex-col bg-slate-700">
          <Navbar />
          <div className="flex-grow w-full max-w-7xl mx-auto lg:flex">
            <div className="flex-1 min-w-0  xl:flex">
              <div className="border-b border-gray-800 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-600 ">
                <div className="h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
                  {/* profile section  */}
                  <div className="flex relative items-center">
                    <Avatar image={person1} status={false} size="lg" />
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
                  <div className="mb-4">
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
                    name="Israt Jahan"
                    status="true"
                    unread={2}
                    latestMsg="Hi"
                    time="12:45 AM"
                  />
                  {/* user box end */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
