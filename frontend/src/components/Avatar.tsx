type Props = {
  image: string;
  status: "active" | "inactive" | "none";
  size: "lg" | "md" | "sm" | "xs";
};

const sizes = {
  lg: "w-12 h-12",
  md: "w-10 h-10",
  sm: "w-8 h-8",
  xs: "w-6 h-6",
};

export default function Avatar({ image, status, size }: Props) {
  return (
    <div
      className={`${sizes[size]} relative flex justify-center items-center rounded-full bg-gray-500 text-xl text-white`}
    >
      <img src={image} className={`rounded-full ${sizes[size]}`} />

      {status !== "none" && (
        <div
          className={`absolute right-0 bottom-0 w-3 h-3 rounded-full ${
            status === "active" && "bg-green-500"
          } ${status === "inactive" && "bg-red-500"}`}
        ></div>
      )}
    </div>
  );
}
