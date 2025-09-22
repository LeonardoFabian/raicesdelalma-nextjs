"use client";

import {
  addOrUpdateProfilePicture,
  deleteProfilePictureFromCloudinary,
} from "@/actions";
import { ProfilePicture } from "@/components";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface Props {
  userId: string | undefined;
  imageUrl?: string;
}

interface FormInputs {
  image?: FileList;
}

export const ChangePhotoForm = ({ userId, imageUrl }: Props) => {
  const router = useRouter();

  const { handleSubmit, register } = useForm<FormInputs>({
    defaultValues: {
      image: undefined,
    },
  });

  const onSubmit = async (data: FormInputs) => {
    console.log(data);

    const formData = new FormData();

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    const { ok, message } = await addOrUpdateProfilePicture(formData);

    if (!ok) {
      toast.error(`Error: ${message}`);
      return;
    }

    router.replace("/admin/account/change-photo");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto max-w-3xl"
    >
      <div className="flex flex-col mb-2">
        <span>Image</span>
        <input
          type="file"
          {...register("image", { required: false })}
          className="p-2 border border-gray-300 rounded-md bg-gray-100"
          accept="image/png, image/jpeg, image/avif, image/webp, image/jfif"
        />

        {/* image preview */}
        {imageUrl && (
          <div className="relative h-48 rounded-full bg-gray-200 overflow-hidden">
            <ProfilePicture
              src={imageUrl}
              alt="Profile Picture"
              width={200}
              height={200}
              className="rounded-full w-full shadow"
            />

            {/* TODO: implement delete image */}
            <button
              type="button"
              className="btn-danger absolute bottom-0 right-0 left-0"
              onClick={() => deleteProfilePictureFromCloudinary(imageUrl)}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-start gap-2 mt-4">
        <button type="submit" className="btn-primary ">
          Save
        </button>
      </div>
    </form>
  );
};
