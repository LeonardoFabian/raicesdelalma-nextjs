"use client";

import { useGiftMessageStore } from "@/store/gift/message/message-store";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormInputs = {
  sender: string;
  recipient: string;
  message: string;
};

export const GiftMessageForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
    watch,
  } = useForm<FormInputs>({});

  const setGiftMessage = useGiftMessageStore((state) => state.setMessage);
  const giftMessage = useGiftMessageStore((state) => state.message);

  useEffect(() => {
    if (giftMessage.message) {
      reset(giftMessage);
    }
  }, []);

  const onSubmit = async (data: FormInputs) => {
    console.log(data);

    setGiftMessage(data);

    toast.success("Message saved!");

    router.push("/checkout");
  };

  const message = watch("message", "");
  const maxChars = 250;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5 mt-8"
    >
      <div className="col-span-1 flex flex-col mb-2">
        <span className="text-text-secondary mb-1">Sender Name</span>
        <input
          type="text"
          className="p-2 rounded-md bg-gray-100 border border-gray-300"
          {...register("sender", { required: true })}
        />
      </div>
      <div className="col-span-1 flex flex-col mb-2">
        <span className="text-text-secondary mb-1">Recipient Name</span>
        <input
          type="text"
          className="p-2 rounded-md bg-gray-100 border border-gray-300"
          {...register("recipient", { required: true })}
        />
      </div>

      <div className="col-span-1 md:col-span-2 flex flex-col mb-2">
        <span className="text-text-secondary mb-1">Message</span>
        <textarea
          rows={4}
          maxLength={maxChars}
          className="p-2 rounded-md bg-gray-100 border border-gray-300"
          {...register("message", { required: true, maxLength: maxChars })}
        />
        <p className="text-sm text-gray-500 text-right mt-1">
          {message.length} / {maxChars} characters
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 pt-4 col-span-1 sm:col-span-2">
        <Link href="/checkout" className="btn-secondary">
          Cancel
        </Link>

        <button
          type="submit"
          disabled={!isValid}
          className={clsx({
            "btn-primary text-center": isValid,
            "btn-disabled": !isValid,
          })}
        >
          Save Message
        </button>
      </div>
    </form>
  );
};
