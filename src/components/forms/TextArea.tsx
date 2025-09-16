import { ChangeEvent } from "react";

interface Props {
    name: string;
    rows?: number;
    label?: string;
    value?: string;
    onChange?: ((e: ChangeEvent<HTMLTextAreaElement>) => void | undefined ) | undefined;
    required?: boolean
}

export const TextArea = ({ name, rows, value, label, onChange, required }: Props ) => {
    return (
        <div className="relative z-0 w-full mb-5 group">
            <textarea name={ name } id={ name } rows={ rows ?? 3}  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer" value={ value } onChange={ onChange } required={ required ?? false }></textarea>
            <label htmlFor={ name } className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{ label ?? ""}</label>
        </div>
    )
}