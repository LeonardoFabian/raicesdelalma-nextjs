import { socialIconsMap } from "@/utils";
import type { IconType } from "react-icons";

type Props = {
  iconName: string;
  url: string;
};

export const SocialIconLink = ({ iconName, url }: Props) => {
  const Icon: IconType = socialIconsMap[iconName] ?? socialIconsMap.instagram;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="text-xl">
      <Icon />
    </a>
  );
};
