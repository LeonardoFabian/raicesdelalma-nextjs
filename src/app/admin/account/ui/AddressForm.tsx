"use client";

import { deleteUserAddress, setUserAddress } from "@/actions";
import type { Address, Country } from "@/interfaces";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
};

export const AddressForm = ({ countries, userAddress }: Props) => {
  console.log(userAddress);

  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      ...(userAddress as any),
    },
  });

  const { data: session } = useSession({
    required: true,
  });

  const userId = session?.user ? session.user.id : "";

  const onSubmit = async (data: FormInputs) => {
    // console.log(data);

    if (userId) {
      const { ok, message } = await setUserAddress(data, userId);

      if (!ok) {
        toast.error(`Error: ${message}`);
      }

      toast.success(message);
    }
  };

  const handleDeleteAddress = async (userId: string) => {
    const { ok, message } = await deleteUserAddress(userId);

    if (!ok) {
      toast.error(`Error: ${message}`);
    }

    toast.success(message);
  };

  return (
    <form className="w-full mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-start gap-4 w-full">
        <div className="w-full grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="flex flex-col mb-2">
            <span>First Name</span>
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-md bg-gray-100"
              {...register("firstName", { required: true })}
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Last Name</span>
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-md bg-gray-100"
              {...register("lastName", { required: true })}
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Address</span>
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-md bg-gray-100"
              {...register("address", { required: true })}
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Address 2 (optional)</span>
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-md bg-gray-100"
              {...register("address2")}
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Postal Code</span>
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-md bg-gray-100"
              {...register("postalCode", { required: true })}
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>City</span>
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-md bg-gray-100"
              {...register("city", { required: true })}
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Country</span>
            <select
              className="p-2 border border-gray-300 rounded-md bg-gray-100"
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
              className="p-2 border border-gray-300 rounded-md bg-gray-100"
              {...register("phone", { required: true })}
            />
          </div>
        </div>

        <div className="block md:flex items-center justify-start space-x-4 mt-4">
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={clsx("mb-2 md:mb-0", {
              "btn-primary": isValid,
              "btn-disabled": !isValid || isSubmitting,
            })}
          >
            {isSubmitting ? "Saving..." : "Save Address"}
          </button>
          <button
            type="button"
            disabled={userAddress === undefined}
            className={clsx("mb-2 md:mb-0", {
              "btn-danger": userAddress !== undefined,
              "btn-danger-disabled": userAddress === undefined,
            })}
            onClick={() => handleDeleteAddress(userId!)}
          >
            Remove Address
          </button>
        </div>
      </div>
    </form>
  );
};
