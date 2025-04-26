export default function About() {
  return (
    <section className="w-full min-h-[100vh] flex flex-col justify-center items-center bg-gold-50 py-20 md:py-40">
      <h3 className="text-3xl md:text-4xl font-bold mb-10">Nosotros</h3>
      <div className="max-w-[73rem] flex flex-col gap-5 px-5 text-base md:text-lg">
        <p>
          Descubre BS Belinda Store, donde la moda cobra vida con elegancia y
          propósito. Tu boutique de confianza, especializada en vestir a la
          mujer con prendas que combinan calidad, estilo y un toque de
          distinción. Cada pieza refleja nuestra pasión por el diseño y el
          compromiso con un servicio excepcional que ha marcado nuestra
          trayectoria por más de una década.
        </p>
        <p>
          En BS Belinda Store, encuentras una experiencia, un detalle pensado
          para ti, una forma de expresar quién eres.
        </p>
        <p>Atrévete a sentirte única, a verte inolvidable.</p>

        <span className="text-xl">
          <strong>
            Explora nuestras colecciones y eleva tu estilo con amor y
            autenticidad.
          </strong>
        </span>
      </div>
    </section>
  );
}
