"use client";

interface Props {
  children: React.ReactNode;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  className?: "primary" | "secondary" | "accent" | "link" | "danger";
}

export const Button = ({
  children,
  type,
  onClick,
  disabled,
  className,
}: Props) => {
  return (
    <button
      type={type ?? "button"}
      className={`capitalize px-4 py-2 ${
        disabled
          ? "bg-gray-400 text-gray-500"
          : className === "primary"
          ? "btn-primary"
          : className === "secondary"
          ? "btn-secondary"
          : className === "accent"
          ? "btn-accent"
          : className === "link"
          ? "btn-link"
          : className === "danger"
          ? "btn-danger"
          : "bg-gray-300 text-gray-700"
      } ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } rounded-md transition ease-linear duration-150`}
      onClick={onClick}
    >
      {children ?? "Read More"}
    </button>
  );
};
