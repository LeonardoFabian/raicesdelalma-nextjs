"use client";

import Link from "next/link";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import type { Address, Country } from "@/interfaces";
import { useAddressStore } from "@/store";
import { useEffect } from "react";
import { deleteUserAddress, setUserAddress } from "@/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  countries: Country[] | undefined;
  userAddress?: Partial<Address>;
}

type FormInputs = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  rememberAddress: boolean;
};

export const AddressForm = ({ countries, userAddress = {} }: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      ...(userAddress as any),
      rememberAddress: false,
    },
  });

  const { data: session } = useSession({
    required: true,
  });

  const setAddress = useAddressStore((state) => state.setAddress);
  const address = useAddressStore((state) => state.address);

  useEffect(() => {
    if (address.firstName) {
      reset(address);
    }
  }, []);

  const onSubmit = async (data: FormInputs) => {
    // console.log(data);

    const { rememberAddress, ...rest } = data;
    setAddress(rest);

    if (session?.user && session.user?.id) {
      const userId = session.user.id;

      if (data.rememberAddress) {
        // server action: set-user-address
        await setUserAddress(rest, userId);
      } else {
        // server action: delete-user-address
        await deleteUserAddress(userId);
      }

      router.push("/checkout");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2 mt-8"
    >
      <div className="flex flex-col mb-2">
        <span>First Name</span>
        <input
          type="text"
          className="p-2 rounded-md bg-gray-200"
          {...register("firstName", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Last Name</span>
        <input
          type="text"
          className="p-2 rounded-md bg-gray-200"
          {...register("lastName", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Address</span>
        <input
          type="text"
          className="p-2 rounded-md bg-gray-200"
          {...register("address", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Address 2 (optional)</span>
        <input
          type="text"
          className="p-2 rounded-md bg-gray-200"
          {...register("address2")}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Postal Code</span>
        <input
          type="text"
          className="p-2 rounded-md bg-gray-200"
          {...register("postalCode", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>City</span>
        <input
          type="text"
          className="p-2 rounded-md bg-gray-200"
          {...register("city", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Country</span>
        <select
          className="p-2 rounded-md bg-gray-200"
          {...register("country", { required: true })}
        >
          <option value="">[ Select ]</option>

          {countries?.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col mb-2">
        <span>Phone Number</span>
        <input
          type="text"
          className="p-2 rounded-md bg-gray-200"
          {...register("phone", { required: true })}
        />
      </div>

      <div className="inline-flex items-center col-span-1 sm:col-span-2">
        <label
          className="relative flex cursor-pointer items-center rounded-full p-3"
          htmlFor="checkbox"
          data-ripple-dark="true"
        >
          <input
            type="checkbox"
            className="border-gray-500 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-primary checked:bg-primary checked:before:bg-primary hover:before:opacity-10"
            id="checkbox"
            {...register("rememberAddress")}
          />
          <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </label>
        <span>Remember shipping address?</span>
      </div>

      <div className="flex items-center justify-between gap-4 pt-4 col-span-1 sm:col-span-2">
        <Link href="/cart" className="btn-secondary">
          Return
        </Link>

        <button
          type="submit"
          disabled={!isValid}
          className={clsx({
            "btn-primary text-center": isValid,
            "btn-disabled": !isValid,
          })}
        >
          Continue
        </button>
      </div>
    </form>
  );
};
