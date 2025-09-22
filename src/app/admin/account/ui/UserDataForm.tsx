"use client";

import { updateUserInfo } from "@/actions";
import { IUser } from "@/interfaces";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IoWarningOutline } from "react-icons/io5";

interface Props {
  user: IUser;
}

interface FormInputs {
  name: string;
  email: string;
}

export const UserDataForm = ({ user }: Props) => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<FormInputs>({
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
    },
  });

  const onSubmit = async (data: FormInputs) => {
    // console.log(data);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);

    const { ok, message, emailChanged } = await updateUserInfo(formData);

    if (!ok) {
      toast.error(`Error: ${message}`);
      return;
    }

    toast.success(message);

    if (emailChanged) {
      // Handle email change
      await signOut({ redirect: false });
      router.push("/auth/login");
    }
  };

  return (
    <form className="w-full mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-start gap-4 w-full">
        <div className="w-full block lg:flex items-start gap-4">
          <div className="flex w-full lg:w-1/2 flex-col mb-2">
            <span>Name</span>
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-md bg-gray-100"
              {...register("name", { required: true })}
            />
          </div>
          <div className="flex w-full lg:w-1/2 flex-col mb-2">
            <span>Email</span>
            <input
              type="email"
              className="p-2 border border-gray-300 rounded-md bg-gray-100"
              {...register("email", { required: true })}
            />
          </div>
        </div>

        <span className="alert-warning">
          <IoWarningOutline size={24} />
          <span>
            <strong>Warning:</strong> Changing your email will require you to
            log in again with the new email.
          </span>
        </span>

        <div className="flex items-center justify-start gap-2 mt-4">
          <button type="submit" className="btn-primary ">
            Update Info
          </button>
        </div>
      </div>
    </form>
  );
};
