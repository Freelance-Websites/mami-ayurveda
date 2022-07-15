// Globals
import { useState } from 'react';
import Image from 'next/image';

// Components
import Input from './forms/Input';
import Select from './forms/Select';
import Textarea from './forms/Textarea';
import Button from './forms/Button';
import Footer from './Footer';

export default function Contact({ title, text, subtitle, ctas, type }) {
  return (
    <section
      className={`
        relative
        ${type === 'appointments' ?
          '-mt-20'
         : type === 'courses' ?
          ''
         : type === 'success' ?
          'min-h-screen'
         :
          '-mt-16 lg:-mt-24 xl:-mt-32'
        }
      `}
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
        className={`
          relative mx-auto max-w-lg
          ${type === 'success' ? 'min-h-screen flex items-center' : 'pt-40 md:pt-52 lg:pt-64 pb-24 px-4'}
        `}
      >
        <div>
          <h6
            className="font-serif text-white text-2xl md:text-4xl text-center"
          >
            {title}
          </h6>
          {text &&
            <p
              className="text-white pt-2 text-lg text-center"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          }
          <ul
            className="flex items-center md:items-baseline justify-center flex-col md:flex-row py-6"
          >
            {ctas && ctas.map((cta, index) =>
              <li
                key={index}
                className={index > 0 ? 'mt-4 md:ml-4' : undefined}
              >
                <Button
                  cta={{
                    theme: index === 0 ? 'outline' : 'transparent',
                    link: cta.link,
                    text: cta.text,
                    icon: index === 0 ? true : false,
                    isExternal: cta.link.startsWith('http') || cta.link.startsWith('www') ? true : false,
                  }}
                />
              </li>
            )}
          </ul>
        </div>
        {type === 'appointments' ?
          <AppointmentsForm />
        : type === 'success' ? undefined
        :
          <ContactForm
            title={subtitle}
          />
        }
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

export function AppointmentsForm() {
  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      name="appointments"
      data-netlify="true"
      method="POST"
      action="/exito"
    >
      {/* Netlify stuff */}
        <input type="hidden" name="form-name" value="appointments" />
        <p className="hidden">
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>
      <Input
        id="name"
        type="text"
        label="Nombre y apellido"
        placeholder="Nombre completo del paciente"
        required={true}
        classes="text-white md:col-span-full"
      />
      <Select
        id="user-type"
        label="Consulta"
        required={true}
        classes="text-white"
        options={[
          {
            text: 'Pediátrica',
            value: 'pediatrica',
            selected: true,
            disabled: false
          },
          {
            text: 'Adulto',
            value: 'adulto',
            selected: false,
            disabled: false
          },
          {
            text: 'Familia',
            value: 'familia',
            selected: false,
            disabled: false
          },
          {
            text: 'Embarazada',
            value: 'embarazada',
            selected: false,
            disabled: false
          },
        ]}
      />
      <Select
        id="type"
        label="Modalidad"
        required={true}
        classes="text-white"
        onChangeMethod={(e) => setActiveType(e.currentTarget.value)}
        options={[
          {
            text: 'Online',
            value: 'online',
            selected: true,
            disabled: false
          },
          {
            text: 'Presencial',
            value: 'presencial',
            selected: false,
            disabled: false
          },
        ]}
      />
      <Input
        id="phone"
        type="number"
        label="Número de celular"
        placeholder="Número completo con código de área"
        required={true}
        classes="text-white md:col-span-full"
        prepend="+54 9"
      />
      <Input
        id="email"
        type="email"
        label="Email"
        placeholder="ejemplo@gmail.com"
        required={true}
        classes="text-white md:col-span-full"
      />
      <Button
        cta={{
          theme: 'transparent',
          isButton: true,
          text: 'Reservar turno',
          icon: true,
          classes: "col-span-full justify-end",
        }}
      />
    </form>
  )
}