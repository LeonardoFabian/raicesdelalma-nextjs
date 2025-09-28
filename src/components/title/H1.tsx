import { fontHeading } from "@/config/fonts";

interface Props {
  children: React.ReactNode;
}

export const H1 = ({ children }: Props) => {
  return (
    <h1
      className={`${fontHeading.className} font-heading text-2xl md:text-4xl text-primary`}
    >
      {children}
    </h1>
  );
};
