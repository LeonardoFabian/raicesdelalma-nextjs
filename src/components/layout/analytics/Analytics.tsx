"use client";

import { pageview, GA_ID } from "@/lib/gtag";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import { COOKIE_KEY } from "@/components";

export const GoogleAnalytics = () => {
  const pathname = usePathname();
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    const consent = localStorage.getItem(COOKIE_KEY);
    if (consent === "true") setConsentGiven(true);
  }, []);

  useEffect(() => {
    if (!consentGiven || !window.gtag) return;
    // if (!GA_ID) return;
    pageview(pathname);
  }, [pathname, consentGiven]);

  if (!GA_ID || !consentGiven || process.env.NODE_ENV !== "production")
    return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
            });
        `}
      </Script>
    </>
  );
};
