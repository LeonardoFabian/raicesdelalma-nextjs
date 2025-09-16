"use client";

import { useState, useEffect } from "react";

interface NotificationBadgeProps {
  value: number;
}

export const NotificationBadge = ({ value }: NotificationBadgeProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return;

  return (
    <>
      {value > 0 && (
        <div className="fade-in absolute inline-flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-red-500 border-1 border-red-500 rounded-full -top-2 -end-2 ">
          {value}
        </div>
      )}
    </>
  );
};
