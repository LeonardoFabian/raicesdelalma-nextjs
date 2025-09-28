
import { Playfair_Display, Nunito_Sans } from "next/font/google";

export const fontHeading = Playfair_Display({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-heading",
});

export const fontBody = Nunito_Sans({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  variable: "--font-body",
});

