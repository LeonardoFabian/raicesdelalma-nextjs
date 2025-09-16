import { Inter, Galada, Montserrat_Alternates } from "next/font/google";

export const fontHeading = Galada({
    weight: ["400"],
    subsets: ["latin"],
    variable: "--font-heading",
});
// export const fontHeading = Montserrat_Alternates({
//     weight: ["500", "700"],
//     subsets: ["latin"],
//     variable: "--font-heading",
// });
export const fontBody = Inter({ subsets: ["latin"], variable: "--font-body" });
