"use client";

import { login, registerUser } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  // const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage("");
    const { name, email, password } = data;
    // console.log({ name, email, password });

    /// server actions
    const resp = await registerUser(name, email, password);

    if (!resp.ok) {
      setErrorMessage(resp?.message);
      return;
    }

    // console.log(resp);

    await login(email.toLowerCase(), password);
    window.location.replace("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {/* {errors.name?.type === "required" && (
        <span className="text-red-500">Name is required</span>
      )} */}

      <label htmlFor="name" className="text-white">
        Full Name
      </label>
      <input
        className={clsx("px-5 py-2  bg-gray-200 rounded mb-5", {
          "border-2 border-red-500": !!errors.name,
        })}
        type="text"
        autoFocus
        {...register("name", { required: true })}
      />

      <label htmlFor="email" className="text-white">
        Email Address
      </label>
      <input
        className={clsx("px-5 py-2  bg-gray-200 rounded mb-5", {
          "border-2 border-red-500": !!errors.email,
        })}
        type="email"
        {...register("email", {
          required: true,
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        })}
      />

      <label htmlFor="password" className="text-white">
        Password
      </label>
      <input
        className={clsx("px-5 py-2  bg-gray-200 rounded mb-5", {
          "border-2 border-red-500": !!errors.password,
        })}
        type="password"
        {...register("password", { required: true, minLength: 6 })}
      />

      <button className="btn-accent">Create Account</button>

      {errorMessage && (
        <span className="bg-red-200 text-red-600 rounded flex items-center gap-2 p-2 mt-2">
          {errorMessage}
        </span>
      )}

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-accent"></div>
        <div className="px-2 text-white">O</div>
        <div className="flex-1 border-t border-accent"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Login
      </Link>
    </form>
  );
};
