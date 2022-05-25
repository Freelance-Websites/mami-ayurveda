// Globals
import { useState } from 'react';
import Image from 'next/image';

// Components
import Button from './forms/Button';
import Input from './forms/Input';
import Select from './forms/Select';

export default function Hero({ title, text, cta, desktopImage, mobileImage, showForm, position }) {
  return (
    <section
      className="
        p-4 md:p-12
        relative
      "
    >
      {/* Desktop image */}
      <div
        className={`
          absolute top-0 left-0 w-full h-full
          ${mobileImage && 'hidden md:block'}
        `}
      >
        <Image
          src={desktopImage}
          layout="fill"
          objectFit="cover"
          alt={title}
          priority
          objectPosition={position ? position : undefined}
        />
      </div>
      {/* Mobile image */}
      {mobileImage &&
        <div
          className="absolute top-0 left-0 w-full h-full md:hidden"
        >
          <Image
            src={mobileImage}
            layout="fill"
            objectFit="cover"
            alt={title}
            objectPosition={position ? position : undefined}
            priority
          />
        </div>
      }
      {/* Gradient */}
      <div
        className="absolute w-full h-full bg-gray-800/40 top-0 left-0 mix-blend-multiply"
      />
      {/* Text */}
      <article
        className={`
          ${showForm === false ? 'pt-16 md:pt-24 lg:pt-32 xl:pt-44' : 'md:grid-cols-2'}
          container mx-auto relative grid grid-cols-1
        `}
      >
        <div className="max-w-lg self-end mb-4 md:mb-0">
          <h1
            className="text-white font-serif text-3xl md:text-4xl"
          >
            {title}
          </h1>
          {text &&
            <p
              className="my-2 text-white"
              dangerouslySetInnerHTML={{ __html: text}}
            />
          }
          {cta &&
            <Button
              cta={cta}
            />
          }
        </div>
        {/* Form */}
        {showForm && <Form />}
      </article>
    </section>
  );
}

export function Form() {
  const [activeType, setActiveType] = useState('online');

  const formCTA = {
    action: (e) => submitForm(e),
    text: 'Reservar',
    isExternal: false,
    isButton: true,
    theme: 'solid',
    classes: 'mb-2 justify-self-start px-6',
    icon: true,
  };

  return (
    <div
      className="
        justify-self-end
        bg-gray-900/70
        p-4 rounded
        max-w-md w-full
      "
    >
      <h2
        className="font-serif text-white text-xl md:text-2xl mb-4"
      >
        Reserv&aacute; un turno!
      </h2>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        name="appointments"
        data-netlify="true"
        method="POST"
        action={activeType === 'online' ? 'https://calendly.com/dravictoriagallo-ayurveda/' : 'https://calendly.com/victoriaegallo/'}
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
          classes="text-gray-400 md:col-span-full"
        />
        <Select
          id="user-type"
          label="Consulta"
          required={true}
          classes="text-gray-400"
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
          classes="text-gray-400"
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
          classes="text-gray-400 md:col-span-full"
          prepend="+54 9"
        />
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="ejemplo@gmail.com"
          required={true}
          classes="text-gray-400 md:col-span-full"
        />
        <Button
          cta={formCTA}
        />
      </form>
    </div>
  )
}