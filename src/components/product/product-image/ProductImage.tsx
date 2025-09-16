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
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const ProductImage = ({
  src,
  alt,
  className,
  style,
  width,
  height,
  fill,
  sizes,
  onMouseEnter,
  onMouseLeave,
}: Props) => {
  const imageUrl = src
    ? src.startsWith("http") // https://imageurl.com
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
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};
