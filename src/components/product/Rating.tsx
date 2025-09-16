"use client";

import { Star } from "@/components/product/Star";

interface Props {
  rating: number; // Este valor puede ser un número decimal (flotante)
}

export const Rating = ({ rating }: Props) => {
  // Número de estrellas completas
  const fullStars = Math.floor(rating);
  // Porcentaje de la estrella parcial
  const partialStar = rating - fullStars;

  return (
    <div className="flex items-center justify-start gap-2">
      <span className="text-text-primary text-md font-semibold dark:text-white">
        {rating.toFixed(1)} {/* Muestra el rating con un decimal */}
      </span>
      <div className="flex items-center space-x-1 rtl:space-x-reverse">
        {Array(5)
          .fill(0)
          .map((_, index) => {
            if (index < fullStars) {
              return (
                <Star
                  key={index}
                  className="text-yellow-400"
                  fillPercentage={100} // Estrella llena
                />
              );
            } else if (index === fullStars && partialStar > 0) {
              return (
                <Star
                  key={index}
                  className="text-yellow-400"
                  fillPercentage={partialStar * 100} // Estrella parcialmente llena
                />
              );
            } else {
              return (
                <Star
                  key={index}
                  className="text-gray-300"
                  fillPercentage={0} // Estrella vacía
                />
              );
            }
          })}
      </div>
    </div>
  );
};
