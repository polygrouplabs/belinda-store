import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io5";

const WhatsAppButton = () => {
    return (
        <Link
            href="https://wa.me/你的电话号码"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-20 right-5 z-50 bg-[#25D366] p-2 rounded-full shadow-lg hover:bg-[#147036] transition-transform duration-300"
        >
            <IoLogoWhatsapp size={28} className="text-white" />
        </Link>
    );
};

export default WhatsAppButton;