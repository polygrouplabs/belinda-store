"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full lg:my-20 py-10 max-w-[400px] mx-auto lg:max-w-[650px] lg:p-20 px-4 bg-grey-50 text-h5">
            <div className="space-y-4">
                <Button variant="login-with" className="w-full">
                    Recibir Código de acceso por E-mail
                </Button>

                <Button variant="login-with" className="w-full">
                    <div className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center">
                        <FcGoogle />
                    </div>
                    <span>Entrar con <span className="font-bold">Google</span></span>
                </Button>

                <div className="text-h5 text-black">Entra con e-mail y contraseña</div>

                <Input
                    type="email"
                    placeholder="Ej. ejemplo@gmail.com"
                />

                <div className="relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Ingresa su contraseña"
                    />
                    <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-dark"
                    >
                        {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                    </button>
                </div>

                <div className="flex justify-start lg:justify-end">
                    <Link href="/forgot-password" className="text-h6 text-black block">
                        Olvidé mi contraseña
                    </Link>
                </div>

                <Button className="w-full">
                    Entrar
                </Button>

                <div className="text-center text-h6 flex flex-col items-center gap-2 justify-center">
                    <p className="text-sm">¿No tienes una cuenta?</p>
                    <Link href="/" className="underline text-black font-bold">
                        Regístrate aquí
                    </Link>
                </div>
            </div>
        </div>
    );
}