import { fontBody } from "@/config/fonts";

interface Props {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export const PageTitle = ({ title, subtitle, children }: Props) => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-2 space-x-4 py-3  border-b border-gray-300">
      <div className="flex flex-col items-start">
        <h1
          className={`${fontBody.className} font-semibold text-2xl text-text-primary`}
        >
          {title}
        </h1>
        {subtitle && (
          <h5 className={`${fontBody.className} text-text-secondary text-sm`}>
            {subtitle}
          </h5>
        )}
      </div>
      {children && (
        <div className="flex items-center space-x-2 justify-end">
          {children}
        </div>
      )}
    </div>
  );
};
