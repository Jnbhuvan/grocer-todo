import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Grocer Todo App | Grocery & Task Manager",
    template: "%s | Grocer Todo App",
  },
  description:
    "Grocer Todo App is a modern Next.js application to manage grocery lists and daily todos efficiently.",

  keywords: [
    "grocer todo app",
    "grocery list app",
    "todo app",
    "task manager",
    "nextjs fullstack app",
  ],

  authors: [{ name: "Bhuvan J N" }],
  creator: "Bhuvan J N",

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <Navbar />
        </header>

        <main className="border-b-emerald-800">
          {children}
        </main>

        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
