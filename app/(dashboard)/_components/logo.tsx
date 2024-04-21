'use client'

import { useEffect, useState } from 'react';
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Logo() {
  const { resolvedTheme } = useTheme();
  const [logoSrc, setLogoSrc] = useState('/marcy-logo.png'); 

  useEffect(() => {
    setLogoSrc(resolvedTheme === 'dark' ? '/marcy-logo-dark.png' : '/marcy-logo.png');
  }, [resolvedTheme]);

  return <Image height={20} width={20} alt="logo" src={logoSrc} />;
}