import "./globals.css";
import { BoardProvider } from "./context/BoardContext";

export const metadata = {
  title: "Kanban Task Management",
  description: "A task management app built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <BoardProvider>{children}</BoardProvider>
      </body>
    </html>
  );
}
