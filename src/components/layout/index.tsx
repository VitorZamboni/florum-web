import { Outlet } from "react-router-dom";
import "./style.css"
import Header from "@/components/header";
import Footer from "@/components/footer";

export function Layout() {
  return (
    <>
    <Header/>
      <main className="main-content">
        <Outlet />
      </main>
    <Footer/>
    </>
  );
}