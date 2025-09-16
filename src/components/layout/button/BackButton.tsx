"use client";

import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";

export const BackButton = () => {
  const router = useRouter();

  return (
    <button type="button" className="btn-default" onClick={() => router.back()}>
      <MdArrowBack />
      Go Back
    </button>
  );
};
