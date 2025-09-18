"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import {
  BsTwitterX,
  BsLinkedin,
  BsFacebook,
  BsLink45Deg,
  BsEnvelope,
  BsWhatsapp,
  BsSend,
} from "react-icons/bs";

interface Props {
  title: string;
  url: string;
}

export const ShareMenu = ({ title, url }: Props) => {
  const encodeUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  // whatsapp
  const message = encodeURIComponent(`Check out this product: ${url}`);

  // email
  const subject = encodeURIComponent(`Check out this product`);
  const body = encodeURIComponent(
    `I thought you might like this product: ${url}`
  );

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
    setIsOpen(false);
  };

  const shareLinks = [
    {
      name: "Email",
      icon: <BsEnvelope size={24} className="text-text-primary" />,
      link: `mailto:?subject=${subject}&body=${body}`,
    },
    {
      name: "Facebook",
      icon: <BsFacebook size={24} style={{ color: "#3b5998" }} />,
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeUrl}`,
    },
    {
      name: "X (Twitter)",
      icon: <BsTwitterX size={24} style={{ color: "#1DA1F2" }} />,
      link: `https://twitter.com/intent/tweet?url=${encodeUrl}&text=${encodedTitle}`,
    },
    {
      name: "LinkedIn",
      icon: <BsLinkedin size={24} style={{ color: "#0077B5" }} />,
      link: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeUrl}&title=${encodedTitle}`,
    },
    {
      name: "WhatsApp",
      icon: <BsWhatsapp size={24} style={{ color: "#25D366" }} />,
      link: `https://wa.me/?text=${message}`,
    },
    // {
    //   name: "Pinterest",
    //   icon: <MdIosShare size={24} />,
    //   link: `https://pinterest.com/pin/create/button/?url=${encodeUrl}&media=${encodeUrl}&description=${encodedTitle}`,
    // },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        className={`rounded-full p-2 transition text-text-primary hover:bg-gray-200 cursor-pointer`}
        aria-label="Share"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <BsSend size={24} />
      </button>

      {isOpen && (
        <div className="absolute left-0 bottom-10 z-50 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
          <div className="py-1">
            {shareLinks.map(({ name, icon, link }) => (
              <Link
                key={name}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-4 py-2 text-sm text-text-secondary hover:bg-gray-100"
              >
                {icon}
                <span>{name}</span>
              </Link>
            ))}
            <button
              type="button"
              onClick={handleCopy}
              className="w-full flex items-center gap-4 text-left px-4 py-2 text-sm text-text-secondary hover:bg-gray-100"
            >
              <BsLink45Deg size={24} className="text-text-primary" />
              <span>Copy link</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
