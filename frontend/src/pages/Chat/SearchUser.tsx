import SearchIcon from "assets/icons/searchIcon";
type Props = {};

export default function SearchUser({}: Props) {
  return (
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
  );
}
