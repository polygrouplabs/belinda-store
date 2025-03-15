import NavBar from "@/components/app/NavBar";
import Footer from "@/components/app/Footer";
import WhatsAppButton from "@/components/app/WhatsAppButton";
import Header from "@/components/app/Header";
export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <NavBar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
}
