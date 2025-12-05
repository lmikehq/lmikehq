import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatWidget from "./ui/ChatWidget";
import NewsletterModal from "./ui/NewsletterModal";
import Meta from "./Meta";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-primary-500 selection:text-white">
      <Meta />
      <Navbar />
      <main>{children}</main>
      <Footer />
      {/* <ChatWidget /> */}
      <NewsletterModal />
    </div>
  );
};

export default Layout;
