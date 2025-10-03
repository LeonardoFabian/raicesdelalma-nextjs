"use client";

import { sendContactEmail } from "@/actions";
import { FormGroup } from "@/components/forms";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface FormInputs {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export const ContactForm = () => {
  const {
    handleSubmit,
    register,
    formState: { isValid },
    setValue,
    getValues,
    watch,
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormInputs) => {
    console.log(data);

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone || "");
    formData.append("subject", data.subject);
    formData.append("message", data.message);

    const { ok, message } = await sendContactEmail(formData);

    if (ok) {
      toast.success(message);
      reset();
    } else {
      toast.error(`Error: ${message}`);
      return;
    }
  };

  const message = watch("message", "");
  const maxChars = 500;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto">
      <FormGroup>
        <div className="flex flex-col mb-2">
          <span>Nombre</span>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md bg-gray-100"
            {...register("name", { required: true })}
          />
        </div>
        <div className="flex flex-col mb-2">
          <span>Telefono (Opcional)</span>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md bg-gray-100"
            {...register("phone", { required: false })}
          />
        </div>
      </FormGroup>
      <div className="flex flex-col mb-2">
        <span>Correo Electrónico</span>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md bg-gray-100"
          {...register("email", { required: true })}
        />
      </div>
      <div className="flex flex-col mb-2">
        <span>Asunto</span>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md bg-gray-100"
          {...register("subject", { required: true })}
        />
      </div>
      <div className="flex flex-col mb-2">
        <span>Mensaje</span>
        <textarea
          rows={6}
          maxLength={maxChars}
          className="p-2 border border-gray-300 rounded-md bg-gray-100"
          {...register("message", { required: true, maxLength: maxChars })}
        ></textarea>
        <p className="text-sm text-gray-500 text-right mt-1">
          {message.length} / {maxChars} caracteres
        </p>
      </div>

      <div className="flex items-center justify-start gap-2 mt-4">
        {/* <BackButton /> */}
        <button type="submit" className="btn-primary ">
          Enviar mensaje
        </button>
      </div>
    </form>
  );
};
