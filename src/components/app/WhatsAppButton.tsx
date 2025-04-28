"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io5";

const WhatsAppButton = () => {
  const [message, setMessage] = useState(false);

  const whatsapp = "3106252095";

  useEffect(() => {
    setTimeout(() => {
      setMessage(true);
    }, 4000);

    setTimeout(() => {
      setMessage(false);
    }, 32000);
  }, []);

  return (
    <>
      {message && (
        <div className="message__container">
          <p>¿Necesitas ayuda? 📲</p>
        </div>
      )}

      <Link
        href={`https://api.whatsapp.com/send?phone=+57${whatsapp}&text=Saludos, quiero obtener información acerca de un producto...`}
        target={"_blank"}
        rel="noopener noreferrer"
        className="whatsapp__float"
      >
        <IoLogoWhatsapp size={30} className="text-black" />
      </Link>
    </>
  );
};

export default WhatsAppButton;
