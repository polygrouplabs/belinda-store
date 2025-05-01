"use client";
import { useState } from "react";

import useAuth, { MODE } from "@/hooks/auth/useAuth";

import { FiEye, FiEyeOff } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const {
    mode,
    email,
    error,
    message,
    badgeState,
    emailCode,
    isLoading,
    handleMode,
    handleEmail,
    handleEmailCode,
    handleUsername,
    handlePassword,
    handleSubmit,
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const formTitle =
    mode === MODE.LOGIN
      ? "Iniciar sesión"
      : mode === MODE.REGISTER
      ? "Registrarme"
      : mode === MODE.RESET_PASSWORD
      ? "Recupera tu contraseña"
      : "Verifica tu Email";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Entrar"
      : mode === MODE.REGISTER
      ? "Registrarme"
      : mode === MODE.RESET_PASSWORD
      ? "Resetear"
      : "Verificar";

  return (
    <div className="w-full lg:my-40 py-20 max-w-[400px] mx-auto lg:max-w-[650px] lg:p-20 px-4 bg-grey-50 text-h5">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold">{formTitle}</h1>

        <div className="text-h5 text-black">Entra con e-mail y contraseña</div>

        {mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              name="username"
              placeholder="Nombre de usuario"
              onChange={(e) => handleUsername(e.target.value)}
            />
          </div>
        ) : null}

        {mode !== MODE.EMAIL_VERIFICATION ? (
          <div className="flex flex-col gap-2">
            <Input
              type="email"
              name="email"
              value={email}
              placeholder="Ej. ejemplo@gmail.com"
              onChange={(e) => handleEmail(e.target.value)}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              name="emailCode"
              placeholder="Code"
              value={emailCode}
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => handleEmailCode(e.target.value)}
            />
          </div>
        )}

        {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Ingresa tu contraseña"
              onChange={(e) => handlePassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-dark"
            >
              {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
            </button>
          </div>
        ) : null}

        {mode === MODE.LOGIN && (
          <div
            onClick={() => handleMode(MODE.RESET_PASSWORD)}
            className="flex justify-start lg:justify-end"
          >
            <p className="text-h6 text-black block">Olvidé mi contraseña</p>
          </div>
        )}

        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? "Cargando..." : buttonTitle}
        </Button>

        {error && badgeState && (
          <div className="bg-red-500 py-1 px-2 rounded-lg">
            <p className="text-white font-semibold">{error}</p>
          </div>
        )}

        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => handleMode(MODE.REGISTER)}
          >
            {"No"} Tienes una cuenta?
          </div>
        )}
        {mode === MODE.REGISTER && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => handleMode(MODE.LOGIN)}
          >
            Tienes una cuenta?
          </div>
        )}
        {mode === MODE.RESET_PASSWORD && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => handleMode(MODE.LOGIN)}
          >
            Volver al login
          </div>
        )}
        {message && (
          <div className="bg-green-600 py-1 px-2 rounded-lg">
            <p className="text-white font-semibold">{message}</p>
          </div>
        )}
      </form>
    </div>
  );
}
