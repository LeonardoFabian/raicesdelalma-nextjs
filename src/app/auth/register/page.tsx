import { fontHeading } from "@/config/fonts";
import Link from "next/link";
import { redirect } from "next/navigation";
import { RegisterForm } from "./ui/RegisterForm";

export default function RegisterPage() {
  // redirect("/admin");

  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1
        className={`${fontHeading.className} text-4xl mb-5 text-white text-center`}
      >
        Crear una cuenta
      </h1>

      <RegisterForm />
    </div>
  );
}
