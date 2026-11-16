import { Outlet } from "react-router-dom";
import "./style.css"
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toast } from "@/components/toast";

export function Layout() {
  return (
    <>
    <Header/>
    <Toast/>
      <main className="main-content">
        <Outlet />
      </main>
    <Footer/>
    </>
  );
}