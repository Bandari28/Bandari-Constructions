import Header from "../components/header";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/scrollToTop";

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <ScrollToTop />
            <Header />
            <main className="flex-1 flex flex-col">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

