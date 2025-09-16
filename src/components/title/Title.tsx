import { H1 } from "./H1";

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div
      className={`${className} flex items-center justify-center w-full py-4 px-4 md:px-24 bg-yellow-pastel`}
    >
      <H1>{title}</H1>
      {subtitle && (
        <h3 className="text-text-secondary text-md md:text-2xl">{subtitle}</h3>
      )}
    </div>
  );
};
