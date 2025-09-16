interface StarProps {
  fillPercentage: number; // 0 to 100
  className: string;
}

export const Star = ({ fillPercentage, className }: StarProps) => {
  return (
    <svg
      className={`w-4 h-4 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset={`${fillPercentage}%`} stopColor="yellow" />
          <stop offset={`${fillPercentage}%`} stopColor="gray" />
        </linearGradient>
      </defs>
      <path
        d="M12 17.75l-5.193 2.73 1.246-6.542-4.74-4.309 6.526-.572L12 2l2.355 6.389 6.526.572-4.74 4.309 1.246 6.542L12 17.75z"
        strokeWidth="1.5"
        fill="url(#grad1)"
      />
    </svg>
  );
};
