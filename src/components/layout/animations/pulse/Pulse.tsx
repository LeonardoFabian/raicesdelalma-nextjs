import React from "react";

interface Props {
  children: React.ReactNode;
}

export const AnimatePulse = ({ children }: Props) => {
  return <div className="animate-pulse">{children}</div>;
};
