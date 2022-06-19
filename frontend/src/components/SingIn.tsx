import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginUserMutation } from "../redux/user/userService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/userSlice";
import { setToken } from "../utils/token";

const schema = yup
  .object()
  .shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
  })
  .required();

interface IProps {
  handleChangeForm: (value: boolean) => void;
}
export default function SingIn({ handleChangeForm }: IProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [handleLogin, { data, isError, isLoading, isSuccess }] =
    useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (data) {
      const { token, ...rest } = data;
      dispatch(setUser(rest));
      setToken(token);
    }

    if (isSuccess) navigate("chat");
  }, [isSuccess, data]);

  return (
    <form
      onSubmit={handleSubmit((data) => handleLogin(data))}
      className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg"
    >
      <h2 className="text-4xl dark:text-white font-bold text-center">
        SIGN IN
      </h2>
      <div className="flex flex-col text-gray-400 py-2">
        <label>Email</label>
        <input
          {...register("email")}
          className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
          type="text"
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
          {...register("password")}
          className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
          type="password"
        />
        {errors.password?.type === "required" && (
          <span className="text-red-400 text-xs">Password is required</span>
        )}
      </div>
      <div className="flex justify-between text-gray-400 py-2">
        <p className="flex items-center">
          <input className="mr-2" type="checkbox" /> Remember Me
        </p>
        <p>Forgot Password</p>
      </div>
      <button
        className="w-full my-4 py-2 bg-teal-500 text-white font-semibold rounded-lg"
        type="submit"
      >
        Sign In
      </button>
      <p className="text-gray-200 text-xs text-center">
        Don't have an account? Let's{" "}
        <span
          onClick={() => handleChangeForm(false)}
          className="text-blue-400 cursor-pointer mt-2"
        >
          Sign Up
        </span>
        .
      </p>
    </form>
  );
}
