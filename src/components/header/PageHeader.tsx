import { H1 } from "../title/H1";

interface Props {
    title: string;
}

export const PageHeader = ({ title }: Props) => {
    return (
        <div className="flex items-center justify-center w-full py-4 px-4 md:px-24 bg-yellow-pastel">
            <H1>{title}</H1>
        </div>
    );
};