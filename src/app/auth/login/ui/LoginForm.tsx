"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authenticate } from "@/actions";
import { useFormState } from "react-dom";
import { IoAlertCircleOutline } from "react-icons/io5";
import clsx from "clsx";
import { toast } from "react-toastify";

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  //   const [state, dispatch] = useFormState(authenticate, undefined);
  //   console.log({ state });

  useEffect(() => {
    if (errorMessage) {
      if (errorMessage === "Success") {
        // router.replace(callbackUrl);
        toast.success("Login successful.");
        window.location.replace("/");
      } else if (errorMessage === "Invalid credentials.") {
        console.log(errorMessage);
        toast.error("Invalid credentials.");
      } else if (errorMessage === "Something went wrong.") {
        console.log(errorMessage);
        toast.error("Something went wrong.");
      } else if (errorMessage === "UnknownError") {
        console.log(errorMessage);
        toast.error("Unknown error.");
      } else {
        console.log(errorMessage);
      }
    }
  }, [errorMessage]);

  return (
    <form action={formAction} className="flex flex-col">
      <label htmlFor="email" className="text-white">
        Email Address
      </label>
      <input
        className="px-5 py-2  bg-gray-200 rounded mb-5"
        type="email"
        name="email"
        disabled={isPending}
      />

      <label htmlFor="password" className="text-white">
        Password
      </label>
      <input
        className="px-5 py-2  bg-gray-200 rounded mb-5"
        type="password"
        name="password"
        autoComplete="off"
        disabled={isPending}
      />

      {/* <button type="submit" className="btn-accent" disabled={isPending}>
        Login
      </button> */}

      <LoginButton isPending={isPending} />
      {/* 
      {errorMessage && (
        <div
          className="flex items-center p-2 space-x-1 bg-red-200 mt-2 rounded"
          aria-live="polite"
          aria-atomic="true"
        >
          <>
            <IoAlertCircleOutline
              className={clsx("h-5 w-5", {
                " text-red-600": errorMessage !== "Success",
                " text-green-600": errorMessage === "Success",
              })}
            />
            <p
              className={clsx("text-sm", {
                "text-red-600": errorMessage !== "Success",
                "text-green-600": errorMessage === "Success",
              })}
            >
              {errorMessage}
            </p>
          </>
        </div>
      )} */}

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-accent"></div>
        <div className="px-2 text-white">O</div>
        <div className="flex-1 border-t border-accent"></div>
      </div>

      <Link href="/auth/register" className="btn-secondary text-center">
        Create New Account
      </Link>
    </form>
  );
};

type LoginButtonProps = {
  isPending: boolean;
};

export const LoginButton = ({ isPending }: LoginButtonProps) => {
  return (
    <button
      type="submit"
      className={clsx({
        "btn-accent": !isPending,
        "btn-disabled": isPending,
      })}
      disabled={isPending}
    >
      {isPending ? "Logging in..." : "Login"}
    </button>
  );
};
