import Image from "next/image";

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  style?: React.StyleHTMLAttributes<HTMLImageElement>["style"];
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
}

export const ProfilePicture = ({
  src,
  alt,
  className,
  style,
  width,
  height,
  fill,
  sizes,
}: Props) => {
  const imageUrl = src
    ? src.startsWith("http")
      ? src
      : `/uploads/${src}`
    : "/images/placeholder.jpg";

  return (
    <Image
      className={className}
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      sizes={sizes}
      style={style}
      priority={false}
    />
  );
};
