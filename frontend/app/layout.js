// import { inter } from 'next/font/google';
import "./globals.css";
import { Toaster } from '@/components/ui/sonner';

export const metadata = {
  title: "School Management System | Manage Schools with Ease",
  description: "A modern School Management System built with Next.js. Manage students, teachers, classes, fees, and attendance seamlessly in one platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
