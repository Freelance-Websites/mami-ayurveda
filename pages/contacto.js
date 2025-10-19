// Globals
import Image from 'next/image';

// Components
import Base from '../components/Base';
import Input from '../components/forms/Input';
import Textarea from '../components/forms/Textarea';
import Button from '../components/forms/Button';
import Footer from '../components/Footer';

// Content
import { attributes } from "../content/contacto.md";

export default function Contact() {
  const {
    pageTitle,
    metaTitle,
    metaDescription,
    heroTitle,
    heroDesktopImage,
  } = attributes;

  return (
    <Base title={pageTitle} metaTitle={metaTitle} metaDescription={metaDescription}>
      <section
        className="min-h-screen relative px-4 flex items-center justify-center"
      >
        {/* Desktop image */}
        <Image
          src={heroDesktopImage}
          alt={heroTitle}
          layout="fill"
          objectFit="cover"
          className="absolute w-full h-full top-0"
        />
        {/* Overlay */}
        <div
          className="absolute w-full h-full bg-gray-800/20 top-0 left-0 mix-blend-multiply"
        />
        {/* Form */}
        <Form title={heroTitle} />
      </section>
      <Footer page="contact" />
    </Base>
  )
}

export function Form({ title }) {
  return (
    <div
      className="
        relative z-10
        bg-gray-900/70
        p-4 rounded
        max-w-md w-full
      "
    >
      <h2
        className="font-serif text-white text-xl md:text-2xl mb-4"
      >
        {title}
      </h2>
      <form
        className="grid grid-cols-1 gap-4"
        name="contact"
        data-netlify="true"
        method="POST"
        action="/exito"
      >
        {/* Netlify stuff */}
        <input type="hidden" name="form-name" value="contact" />
        <p className="hidden">
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>
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
            theme: 'solid',
            isButton: true,
            text: 'Enviar consulta',
            icon: false,
            classes: "justify-center"
          }}
        />
      </form>
    </div>
  )
}