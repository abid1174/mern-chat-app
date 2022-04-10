import { useRegisterUserMutation } from "../services/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
    image: yup.mixed().nullable(true),
  })
  .required();

interface IProps {
  handleChangeForm: (value: boolean) => void;
}

export default function SignUp({ handleChangeForm }: IProps) {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const [handleRegister, { data, isLoading, isError, isSuccess }] =
    useRegisterUserMutation();

  const handleRegisterUser = (data: any) => {
    let { image, ...rest } = data;
    handleRegister(rest);
  };

  console.log(data);

  if (isSuccess) {
    handleChangeForm(true);
  }

  return (
    <form
      onSubmit={handleSubmit((data) => handleRegisterUser(data))}
      className="w-full bg-gray-900 p-8 px-8 rounded-lg"
    >
      <h2 className="text-4xl dark:text-white font-bold text-center">
        SIGN UP
      </h2>
      <div className="flex flex-col text-gray-400 py-2">
        <label>Name</label>
        <input
          className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
          type="text"
          {...register("name")}
        />
        {errors.name?.type === "required" && (
          <span className="text-red-400 text-xs">Name is required</span>
        )}
      </div>
      <div className="flex flex-col text-gray-400 py-2">
        <label>Email</label>
        <input
          className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
          type="text"
          {...register("email")}
        />
        {errors.email?.type === "required" && (
          <span className="text-red-400 text-xs">Email is required</span>
        )}
        {errors.email?.type === "email" && (
          <span className="text-red-400 text-xs">
            Email must be a valid email
          </span>
        )}
      </div>
      <div className="flex flex-col text-gray-400 py-2">
        <label>Password</label>
        <input
          className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
          type="password"
          {...register("password")}
        />
        {errors.password?.type === "required" && (
          <span className="text-red-400 text-xs">Password is required</span>
        )}
        {errors.password?.type === "min" && (
          <span className="text-red-400 text-xs">
            {errors?.password?.message}
          </span>
        )}
      </div>
      <div className="flex flex-col text-gray-400 py-2">
        <label>Upload Profile Picture</label>
        <input
          className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
          type="file"
          accept="image/*"
          {...register("image")}
        />
      </div>
      <button
        className="w-full my-4 py-2 bg-teal-500 text-white font-semibold rounded-lg"
        type="submit"
      >
        Sign up
        {isLoading && <span>loading</span>}
      </button>
      <p className="text-gray-200 text-xs text-center">
        Already have an account? Let's{" "}
        <span
          onClick={() => handleChangeForm(true)}
          className="text-blue-400 cursor-pointer mt-2"
        >
          Sign In
        </span>
        .
      </p>
    </form>
  );
}
