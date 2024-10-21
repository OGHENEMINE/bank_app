"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SideBarItemProps {
  icon: ReactNode;
  text: string;
  path: string;
  onClick?: () => void;
}

const SideBarItem = ({ icon, text, path, onClick }: SideBarItemProps) => {
  const location = usePathname();
  const isActive = location === path;

  // Variants for the icon, which will be triggered by the parent hover state
  const iconVariants = {
    hover: { scale: 1.2 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.li
      whileHover="hover" // Trigger hover animation on children
      whileTap="tap"
      className={`rounded-md cursor-pointer transition-colors ${
        isActive
          ? "bg-primary/90 text-white shadow-md shadow-gray-300"
          : "text-gray-600 hover:bg-primary/5"
      }`}
    >
      <Link
      onClick={onClick}
        className="flex items-center gap-2 font-medium text-sm tracking-wider py-2 px-3"
        href={path}
      >
        <motion.span
          variants={iconVariants}
          whileHover="hover" // Ensure hover state is applied to this element
        >
          {icon}
        </motion.span>
        {text}
      </Link>
    </motion.li>
  );
};

export default SideBarItem;
