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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Add source field based on current page
    const currentPath = window.location.pathname;
    formData.append('source', currentPath);
    
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbxkNhcKafcfD4k5o7U8R40llpqOFf8lUPKWdKqSaruyJvaeX5Ecau7YKene-FrQs6Re/exec', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        // Redirect to success page
        window.location.href = '/exito';
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
    }
  };

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
        onSubmit={handleSubmit}
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