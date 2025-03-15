import Footer from "@/components/app/Footer";
import Header from "@/components/app/Header";
import NavBar from "@/components/app/NavBar";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <NavBar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
} 