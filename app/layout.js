import Header from "./_components/Header";
import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";
import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";

export const metadata = {
  title: {
    template: "The Wild Oasis : %s",
    default: "The Wild Oasis : Welcome !",
  },
  description: "A Luxurious Cabin Hotel for Booking",
};

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className}  bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />
        <div>
          <main className="max-w-7xl  mx-auto flex-1 grid w-full px-8 py-12">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
