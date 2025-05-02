"use client";

import { LoginState } from "@wix/sdk";

import { NEXT_PUBLIC_URL } from "@/utils/env";

import { useState } from "react";
import { useHeadlessClient } from "../sdk/useHeadlessClient";
import { usePathname, useRouter } from "next/navigation";

import Cookies from "js-cookie";

const env = {
  url: NEXT_PUBLIC_URL ?? "https://bsbelindastore.com",
};

export enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

export default function useAuth() {
  const [mode, setMode] = useState(MODE.LOGIN);
  const [badgeState, setBadgeState] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [providerIsLoading, setProviderIsLoading] = useState(false);

  const headlessClient = useHeadlessClient();

  const pathName = usePathname();
  const route = useRouter();

  const handleMode = (mode: MODE) => setMode(mode);
  const handleEmail = (email: string) => setEmail(email);
  const handleEmailCode = (emailCode: string) => setEmailCode(emailCode);
  const handlePassword = (password: string) => setPassword(password);
  const handleUsername = (username: string) => setUsername(username);

  const handleError = (errorCode: string) => {
    const errorMessages: Record<string, string> = {
      invalidEmail: "Correo o contraseña incorrecta",
      invalidPassword: "Correo o contraseña incorrecta",
      emailAlreadyExists: "Ya existe una cuenta con este Email",
      resetPassword: "Necesitas crear una nueva contraseña",
    };

    setError(
      errorMessages[errorCode] ||
        "Ha ocurrido un error, por favor intenta más tarde"
    );
  };

  const handleSuccess = (message: string) => {
    setMessage(message);
    setTimeout(() => {
      setBadgeState(false);
    }, 3000);
  };

  const loginWithProvider = async (): Promise<void> => {
    try {
      setProviderIsLoading(true);
      const loginRequestData = headlessClient.auth.generateOAuthData(env.url);

      localStorage.setItem("AUTH_SESSION", JSON.stringify(loginRequestData));

      const { authUrl } = await headlessClient.auth.getAuthUrl(
        loginRequestData
      );

      window.location.href = authUrl;
    } catch (err) {
      console.error("Error en loginWithProvider:", err);
      setError("Ha ocurrido un error al iniciar sesión con el proveedor.");
    } finally {
      setProviderIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setBadgeState(true);

    try {
      let response;

      switch (mode) {
        case MODE.LOGIN:
          response = await headlessClient.auth.login({ email, password });
          break;
        case MODE.REGISTER:
          response = await headlessClient.auth.register({
            email,
            password,
            profile: { nickname: username },
          });
          break;
        case MODE.RESET_PASSWORD:
          response = await headlessClient.auth.sendPasswordResetEmail(
            email,
            pathName
          );
          break;
        case MODE.EMAIL_VERIFICATION:
          response = await headlessClient.auth.processVerification({
            verificationCode: emailCode,
          });
          break;
        default:
          throw new Error("Modo no soportado");
      }

      if (!response) throw new Error("Respuesta nula del servidor");

      switch (response.loginState) {
        case LoginState.SUCCESS:
          const sessionToken = response.data.sessionToken;

          if (!sessionToken)
            throw new Error("El sessionToken es nulo o indefinido");

          const tokens =
            await headlessClient.auth.getMemberTokensForDirectLogin(
              sessionToken
            );
          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
            sameSite: "strict",
          });

          headlessClient.auth.setTokens(tokens);
          handleSuccess("Has iniciado sesión, serás redireccionado");

          setTimeout(() => {
            route.push("/");
          }, 500);
          break;

        case "EMAIL_VERIFICATION_REQUIRED":
          setMode(MODE.EMAIL_VERIFICATION);
          break;

        case LoginState.FAILURE:
          handleError(response.errorCode ?? "");
          break;

        case LoginState.OWNER_APPROVAL_REQUIRED:
          handleSuccess("Tu cuenta está pendiente por validación");
          break;

        default:
          throw new Error("Estado de login desconocido");
      }
    } catch (err) {
      console.error("Error en handleSubmit:", err);
      setError("Ha ocurrido un error, por favor intenta más tarde");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setBadgeState(false);
      }, 3000);
    }
  };

  return {
    mode,
    email,
    error,
    message,
    badgeState,
    emailCode,
    password,
    isLoading,
    providerIsLoading,
    handleMode,
    handleEmail,
    handleEmailCode,
    handleSubmit,
    handleUsername,
    handlePassword,
    loginWithProvider,
  };
}
