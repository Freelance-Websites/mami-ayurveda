// Globals
import Image from 'next/image';

// Components
import Input from './forms/Input';
import Textarea from './forms/Textarea';
import Button from './forms/Button';
import Footer from './Footer';

export default function Contact({ title, subtitle, ctas }) {
  return (
    <section
      className="
        relative 
        -mt-16 lg:-mt-24 xl:-mt-32
        xl:border-t-8 xl:border-white
      "
    >
      {/* Desktop Background image */}
      <div className="absolute top-0 left-0 w-full h-full hidden lg:block">
        <Image
          src="/images/uploads/bg/contact-form-desktop.jpg"
          layout="fill"
          objectFit="cover"
          alt="Imagen de una tabla de madera con flores encima"
        />
      </div>
      {/* Mobile Background image */}
      <div className="absolute top-0 left-0 w-full h-full block lg:hidden">
        <Image
          src="/images/uploads/bg/contact-form-mobile.jpg"
          layout="fill"
          objectFit="cover"
          objectPosition="bottom"
          alt="Imagen de una tabla de madera con flores encima"
        />
      </div>
      {/* Overlay */}
      <div
        className="absolute w-full h-full bg-gray-800/20 top-0 left-0 mix-blend-multiply"
      />
      {/* Content */}
      <article
        className="
          relative
          mx-auto
          max-w-lg
          pt-40 md:pt-52 lg:pt-64
          pb-24
          px-4
        "
      >
        <div>
          <h6
            className="font-serif text-white text-2xl md:text-4xl text-center"
          >
            {title}
          </h6>
          <ul
            className="flex items-baseline justify-center py-6"
          >
            {ctas.map((cta, index) =>
              <li
                key={index}
                className={ctas.length > 1 ? 'ml-4' : undefined}
              >
                <Button
                  cta={{
                    theme: index === 0 ? 'outline' : 'transparent',
                    link: cta.link,
                    text: cta.text,
                    icon: true
                  }}
                />
              </li>
            )}
          </ul>
        </div>
        <ContactForm
          title={subtitle}
        />
      </article>
      <Footer />
    </section>
  );
}

export function ContactForm({ title }) {
  return (
    <div
      className="pt-4 md:pt-8"
    >
      {title &&
        <h6 className="font-serif text-white text-xl md:text-2xl">{title}</h6>
      }
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4"
      >
        <Input
          id="name"
          type="text"
          label="Nombre y apellido"
          placeholder="Nombre completo"
          required={true}
          classes="text-white"
        />
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="ejemplo@gmail.com"
          required={true}
          classes="text-white"
        />
        <Textarea
          id="message"
          label="Tu mensaje"
          placeholder="Escribí tu mensaje acá"
          required={true}
          classes="text-white col-span-full"
        />
        <Button
          cta={{
            theme: 'transparent',
            isButton: true,
            text: 'Enviar',
            icon: true,
            classes: "col-span-full justify-end",
          }}
        />
      </form>
    </div>
  );
}