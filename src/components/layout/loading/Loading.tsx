import Image from "next/image";
import gif from "../../../../public/images/loading.gif";

export const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <Image src={gif} alt="Loading..." />
    </div>
  );
};
