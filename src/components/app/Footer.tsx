import Image from "next/image";
import Link from "next/link";

import pseLogo from "@/assets/images/pse-logo.png";
import efectyLogo from "@/assets/images/efecty-logo.png";

import { FaCcVisa } from "react-icons/fa";
import { SiMercadopago } from "react-icons/si";
import { FaCcMastercard } from "react-icons/fa";
import { IoLogoInstagram, IoLogoTiktok } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="lg:flex lg:justify-between">
          {/* Columnas */}
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
            <div className="space-y-4 text-center lg:text-left">
              <div className="hidden lg:block w-[200px]">
                <Image
                  src="/Belinda-text-Icon-Colorway-Gold-white.png"
                  alt="Belinda Store"
                  width={250}
                  height={100}
                  className="mb-8"
                />
              </div>
              <h3 className="text-sm font-medium">Nuestras tiendas</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">TIENDA BOGOTA</p>
                  <p className="text-sm text-gray-400">
                    CC Babilonia local 118
                  </p>
                  <p className="text-sm text-gray-400">Show room Local 401.</p>
                </div>
                <div>
                  <p className="font-medium">TIENDA CALI</p>
                  <p className="text-sm text-gray-400">CC EL TESORO</p>
                  <p className="text-sm text-gray-400">Local 903 E</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-center lg:text-left">
              <h3 className="text-sm font-medium">¿Necesitas ayuda?</h3>
              <div className="space-y-2">
                <Link
                  href="#"
                  className="block text-sm text-gray-400 hover:text-gold"
                >
                  Servicio al Cliente
                </Link>
                <Link
                  href="#"
                  className="block text-sm text-gray-400 hover:text-gold"
                >
                  Preguntas frecuentes
                </Link>
                <Link
                  href="#"
                  className="block text-sm text-gray-400 hover:text-gold"
                >
                  Peticiones quejas y reclamos
                </Link>
              </div>
            </div>

            <div className="space-y-4 text-center lg:text-left">
              <h3 className="text-sm font-medium">Términos y condiciones</h3>
              <div className="space-y-2">
                <Link
                  href="#"
                  className="block text-sm text-gray-400 hover:text-gold"
                >
                  Términos y condiciones
                </Link>
                <Link
                  href="#"
                  className="block text-sm text-gray-400 hover:text-gold"
                >
                  Política de cambio, garantía, retracto y reversión
                </Link>
                <Link
                  href="#"
                  className="block text-sm text-gray-400 hover:text-gold"
                >
                  Tratamiento de datos
                </Link>
              </div>
              <h3 className="text-sm font-medium">Métodos de pago</h3>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                <Image
                  width={60}
                  height={20}
                  sizes="w-[80px] h-auto"
                  src={pseLogo.src}
                  alt="pse logo"
                />
                <SiMercadopago size={30} />
                <FaCcVisa size={30} />
                <FaCcMastercard size={30} />
                <Image
                  width={65}
                  height={20}
                  sizes="w-[80px] h-auto"
                  src={efectyLogo.src}
                  alt="efecty logo"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col items-center lg:flex-row lg:justify-between lg:items-center">
          <p className="text-sm text-gray-400 text-center lg:text-left">
            © 2024 Belinda Store
          </p>
          <div className="mt-4 lg:mt-0">
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <span className="text-sm">Síguenos en nuestras redes</span>

              <a
                href="https://www.instagram.com/bsbelindastore"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black rounded-full p-2 hover:opacity-80 transition-opacity"
              >
                <IoLogoInstagram size={40} className="text-white" />
              </a>
              <a
                href="https://www.tiktok.com/@bsbelindastore"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black rounded-full p-2 hover:opacity-80 transition-opacity"
              >
                <IoLogoTiktok size={40} className="text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
