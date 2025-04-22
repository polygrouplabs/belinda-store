import Image from "next/image";
import { IoLogoInstagram } from "react-icons/io5";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="lg:flex lg:justify-between">
          {/* Logo 区域 */}
          <div className="hidden lg:block w-[300px]">
            <Image
              src="/Belinda-Logo-Colorway-Gold.svg"
              alt="Belinda Store"
              width={300}
              height={100}
              className="mb-8"
            />
          </div>

          {/* 链接区域 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 mx-auto lg:mx-0">
            {/* 店铺信息 */}
            <div className="space-y-4 text-center lg:text-left">
              <h3 className="text-sm font-medium">Nuestras tiendas</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">TIENDA BOGOTA:</p>
                  <p className="text-sm text-gray-400">
                    CC Babilonia local 118
                  </p>
                  <p className="text-sm text-gray-400">Show room Local 401.</p>
                </div>
                <div>
                  <p className="font-medium">TIENDA CALI:</p>
                  <p className="text-sm text-gray-400">CC EL TESORO</p>
                  <p className="text-sm text-gray-400">Local 903 E</p>
                </div>
              </div>
            </div>

            {/* 客户服务 */}
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

            {/* 法律信息 */}
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
                  whatsapp
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
                  ¿Cómo comprar?
                </Link>
                <Link
                  href="#"
                  className="block text-sm text-gray-400 hover:text-gold"
                >
                  Política de privacidad
                </Link>
                <Link
                  href="#"
                  className="block text-sm text-gray-400 hover:text-gold"
                >
                  Tratamiento de datos
                </Link>
                <Link
                  href="#"
                  className="block text-sm text-gray-400 hover:text-gold"
                >
                  Política de cookies
                </Link>
                <Link
                  href="#"
                  className="block text-sm text-gray-400 hover:text-gold"
                >
                  Recogida en tienda
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 社交媒体和版权信息 */}
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
