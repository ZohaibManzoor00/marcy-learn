'use client'

import { useTheme } from "next-themes";
import Image from "next/image";

export default function Logo() {
  const { theme } = useTheme()
  return <Image height={20} width={20} alt="logo" src={theme === 'light' ? "/marcy-logo.png" : "/marcy-logo-dark.png"} />;
}
