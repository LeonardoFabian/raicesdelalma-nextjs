import { ChangeEvent } from "react";

interface Props {
  type?: "text" | "email" | "password" | "number" | "file" | "date" | "hidden";
  name: string;
  label?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export const Input = ({
  type,
  name,
  label,
  placeholder,
  value,
  onChange,
  required,
}: Props) => {
  // Usaremos type="text" si piden "number" para controlar nosotros el decimal.
  const isNumeric = type === "number";
  const effectiveType = isNumeric ? "text" : type ?? "text";

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isNumeric) {
      onChange?.(e);
      return;
    }

    // Normaliza coma a punto y elimina todo lo que no sea dígitos o punto
    let next = e.currentTarget.value.replace(/,/g, ".").replace(/[^0-9.]/g, "");

    // Permite solo un punto decimal
    const firstDot = next.indexOf(".");
    if (firstDot !== -1) {
      // quita puntos extra manteniendo el primero
      next =
        next.slice(0, firstDot + 1) +
        next.slice(firstDot + 1).replace(/\./g, "");
    }

    // Evita empezar con punto: ".5" -> "0.5"
    if (next.startsWith(".")) next = "0" + next;

    // Refleja el valor normalizado en el input
    if (next !== e.currentTarget.value) {
      e.currentTarget.value = next;
    }

    onChange?.(e);
  };

  return (
    <div
      className={`${type !== "hidden" ? "relative z-0 w-full mb-5 group" : ""}`}
    >
      <input
        type={effectiveType}
        name={name}
        id={name}
        className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
        placeholder={placeholder ?? ""}
        value={value}
        onChange={onChange}
        onInput={handleInput}
        // Teclado decimal en móviles
        inputMode={isNumeric ? "decimal" : undefined}
        // Patrones de validación (permite 123, 123., 123.45)
        pattern={isNumeric ? "^[0-9]*\\.?[0-9]*$" : undefined}
        required={required ?? false}
      />
      {type !== "hidden" && (
        <label
          htmlFor={name}
          className="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          {label ?? ""}
        </label>
      )}
    </div>
  );
};
