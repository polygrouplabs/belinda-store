"use client";

import { useState } from "react";
import { Dispatch, SetStateAction } from "react";

import useAuth, { MODE } from "@/hooks/auth/useAuth";

import { FaGoogle } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface InputFieldProps {
  type: string;
  name: string;
  value?: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface PasswordFieldProps {
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface SwitchModeLinkProps {
  text: string;
  onClick: () => void;
  className?: string;
}

interface AlertProps {
  message: string;
  type: "error" | "success";
}

export default function Login() {
  const {
    mode,
    email,
    error,
    message,
    badgeState,
    emailCode,
    isLoading,
    providerIsLoading,
    handleMode,
    handleEmail,
    handleEmailCode,
    handleSubmit,
    handleUsername,
    handlePassword,
    loginWithProvider,
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
    <div className="w-full flex justify-center flex-col min-h-[90vh] lg:min-h-[60vh] lg:my-40 py-20 max-w-[400px] mx-auto lg:max-w-[650px] lg:p-20 px-4 bg-grey-50 text-h5 shadow-lg">
      <form className="space-y-4 mb-5" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold">{formTitle}</h1>

        <div className="text-h5 text-black">Entra con e-mail y contraseña</div>

        {mode === MODE.REGISTER && (
          <InputField
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            onChange={(e) => handleUsername(e.target.value)}
          />
        )}

        {mode !== MODE.EMAIL_VERIFICATION ? (
          <InputField
            type="email"
            name="email"
            value={email}
            placeholder="Ej. ejemplo@gmail.com"
            onChange={(e) => handleEmail(e.target.value)}
          />
        ) : (
          <InputField
            type="text"
            name="emailCode"
            value={emailCode}
            placeholder="Code"
            onChange={(e) => handleEmailCode(e.target.value)}
          />
        )}

        {(mode === MODE.LOGIN || mode === MODE.REGISTER) && (
          <PasswordField
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            onChange={(e) => handlePassword(e.target.value)}
          />
        )}

        {mode === MODE.LOGIN && (
          <SwitchModeLink
            text="Olvidé mi contraseña"
            onClick={() => handleMode(MODE.RESET_PASSWORD)}
            className="flex justify-start lg:justify-end"
          />
        )}

        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? "Cargando..." : buttonTitle}
        </Button>

        {error && badgeState && <Alert message={error} type="error" />}

        {mode === MODE.LOGIN && (
          <SwitchModeLink
            text="No tienes una cuenta?"
            onClick={() => handleMode(MODE.REGISTER)}
          />
        )}
        {mode === MODE.REGISTER && (
          <SwitchModeLink
            text="Tienes una cuenta?"
            onClick={() => handleMode(MODE.LOGIN)}
          />
        )}
        {mode === MODE.RESET_PASSWORD && (
          <SwitchModeLink
            text="Volver al login"
            onClick={() => handleMode(MODE.LOGIN)}
          />
        )}

        {message && <Alert message={message} type="success" />}
      </form>

      {(mode === MODE.LOGIN || mode === MODE.REGISTER) && (
        <Button
          disabled={providerIsLoading}
          type="button"
          onClick={loginWithProvider}
          className="w-full bg-white hover:bg-grey text-black"
        >
          Iniciar sesión con <FaGoogle className="scale-90" /> | <BsFacebook />
        </Button>
      )}
    </div>
  );
}

function InputField({
  type,
  name,
  value,
  placeholder,
  onChange,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

function PasswordField({
  showPassword,
  setShowPassword,
  onChange,
}: PasswordFieldProps) {
  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="Ingresa tu contraseña"
        onChange={onChange}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-dark"
      >
        {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
      </button>
    </div>
  );
}

function SwitchModeLink({ text, onClick, className }: SwitchModeLinkProps) {
  return (
    <div
      className={`text-sm underline cursor-pointer ${className}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
}

function Alert({ message, type }: AlertProps) {
  const bgColor = type === "error" ? "bg-red" : "bg-green-600";
  return (
    <div className={`${bgColor} py-1 px-2 rounded-lg text-center`}>
      <p className="text-white font-medium">{message}</p>
    </div>
  );
}
