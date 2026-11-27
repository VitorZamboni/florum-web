import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./style.css"
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toast } from "@/components/toast";
import FooterMenu from "../footer-menu";

export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
    <Header/>
    <Toast/>
      <main className="main-content">
        <Outlet />
      </main>
    <div className="footer-app">
      <Footer></Footer>
    </div>
    <div className="footerMenu-app">
      <FooterMenu ></FooterMenu>
    </div>
    </>
  );
}
