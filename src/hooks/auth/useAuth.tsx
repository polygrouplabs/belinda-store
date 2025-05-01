"use client";
import { LoginState } from "@wix/sdk";

import { useState } from "react";
import { useHeadlessClient } from "../sdk/useHeadlessClient";
import { usePathname, useRouter } from "next/navigation";

import Cookies from "js-cookie";
import { Tokens } from "@wix/sdk";

export enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

export default function useAuth() {
  const [mode, setMode] = useState(MODE.LOGIN);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [badgeState, setBadgeState] = useState(false);

  const headlessClient = useHeadlessClient();

  const pathName = usePathname();
  const route = useRouter();

  const handleMode = (mode: MODE) => {
    setMode(mode);
  };

  const handleEmail = (email: string) => {
    setEmail(email);
  };

  const handleEmailCode = (emailCode: string) => {
    setEmailCode(emailCode);
  };

  const handlePassword = (password: string) => {
    setPassword(password);
  };

  const handleUsername = (username: string) => {
    setUsername(username);
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
          response = await headlessClient.auth.login({
            email,
            password,
          });
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
          break;
      }

      switch (response?.loginState) {
        case LoginState.SUCCESS:
          const sessionToken = response.data.sessionToken;

          if (!sessionToken) {
            console.error("El sessionToken es nulo o indefinido");
            return;
          }

          await headlessClient.auth
            .getMemberTokensForDirectLogin(sessionToken)
            .then((tokens: Tokens) => {
              Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
                expires: 2,
                sameSite: "strict",
              });

              headlessClient.auth.setTokens(tokens);
              setMessage("Has iniciado sesión, serás redireccionado");

              setTimeout(() => {
                route.push("/");
              }, 500);
            })
            .catch((e) => {
              console.log(e);
              setError("Ups, algo ha salido mal.");
            })
            .finally(() => {
              setIsLoading(false);
            });

          break;
        case "EMAIL_VERIFICATION_REQUIRED":
          setMode(MODE.EMAIL_VERIFICATION);
          break;
        case LoginState.FAILURE:
          if (
            response.errorCode === "invalidEmail" ||
            response.errorCode === "invalidPassword"
          ) {
            setError("Correo o contraseña incorrecta");
          } else if (response.errorCode === "emailAlreadyExists") {
            setError("Ya existe una cuenta con este Email");
          } else if (response.errorCode === "resetPassword") {
            setError("Necesitas crear una nueva contraseña");
          } else {
            console.log(response.errorCode);
            setError("Ha ocurrido un error, por favor intenta más tarde");
          }
          break;
        case LoginState.OWNER_APPROVAL_REQUIRED:
          setMessage("Tu cuenta esta pendiente por validación");
        default:
          break;
      }

      setTimeout(() => {
        setBadgeState(false);
      }, 3000);
    } catch (err) {
      console.log(err);
      setError("Ha ocurrido un error, por favor intenta más tarde");
    } finally {
      setIsLoading(false);
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
    handleMode,
    handleEmail,
    handleEmailCode,
    handleSubmit,
    handleUsername,
    handlePassword,
  };
}
