"use client";

import Link from "next/link";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useRef } from "react";

export default function NewsLetter() {
  const emailRef = useRef<HTMLInputElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const email = emailRef.current?.value;
    const isChecked = checkboxRef.current?.checked;

    if (!email) {
      toast.error("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    if (!isChecked) {
      toast.error(
        "Debes aceptar la política de tratamiento de datos personales."
      );
      return;
    }

    try {
      // Simulación de envío de datos
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve({ success: true }), 1000)
      );

      if (response) {
        toast.success("Gracias por suscribirte a nuestro newsletter");
        if (emailRef.current) emailRef.current.value = "";
        if (checkboxRef.current) checkboxRef.current.checked = false;
      } else {
        toast.error("Hubo un problema al suscribirte. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al enviar los datos. Por favor, inténtalo más tarde.");
    }
  }

  return (
    <section className="flex flex-col justify-center items-center py-20 bg-pink-dark/50">
      <h3 className="font-semibold">SUSCRÍBETE A NUESTRO NEWSLETTER</h3>

      <form
        onSubmit={handleSubmit}
        className="w-[80%] md:w-[60%] lg:w-[35%] flex flex-col items-center gap-4 mt-5"
      >
        <div className="w-full flex items-center">
          <Input
            type="email"
            placeholder="Correo eléctronico"
            className="rounded-l-full"
            ref={emailRef}
          />
          <Button
            type="submit"
            variant="form-solid"
            className="w-max text-[14px] leading-[28px] font-bold rounded-r-full"
          >
            Suscribirme
          </Button>
        </div>

        <label className="flex items-start gap-2">
          <input type="checkbox" ref={checkboxRef} />
          <p className="text-[.8rem]">
            Sí, autorizo a BS Belinda el tratamiento de mis datos personales, de
            acuerdo a las finalidades de su política de tratamiento de datos
            personales{" "}
            <Link href="/" className="font-semibold">
              Consulta aquí
            </Link>
          </p>
        </label>
      </form>
    </section>
  );
}
