import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Checkout({ product }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = useCallback(() => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'El nombre es obligatorio';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'El nombre debe tener al menos 2 caracteres';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'El email es obligatorio';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Ingresá un email válido';
    }
    
    const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/;
    if (!formData.phone.trim()) {
      errors.phone = 'El teléfono es obligatorio';
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Ingresá un teléfono válido';
    }
    
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }, [formData]);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('checkoutUserData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
      } catch (e) {
        console.error('Error loading saved data:', e);
      }
    }
  }, []);

  // Validate form whenever formData changes
  useEffect(() => {
    validateForm();
  }, [formData, validateForm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    // Final validation
    if (!isFormValid) {
      setError('Por favor completá todos los campos correctamente');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Save user data to localStorage before checkout
      const checkoutData = {
        ...formData,
        product: {
          category: product.category,
          slug: product.slug,
          title: product.title.replace(/<[^>]*>/g, ''),
          price: product.price,
          // Store delivery URL (fileUrl for ebooks, courseUrl for courses)
          deliveryUrl: product.fileUrl || product.courseUrl || null,
        },
        timestamp: new Date().toISOString(),
      };
      
      localStorage.setItem('checkoutUserData', JSON.stringify(formData));
      localStorage.setItem('lastCheckout', JSON.stringify(checkoutData));

      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: product.category,
          productSlug: product.slug,
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout');
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Producto no encontrado</h1>
        <p className="text-gray-600">El producto que buscás no existe.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-6xl mx-auto">
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-green-600">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href={`/${product.category}`} className="hover:text-green-600 capitalize">
            {product.category === 'ebooks' ? 'E-books' : 'Cursos y Talleres'}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Checkout</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {product.image && (
                <div className="relative w-full aspect-[3/4]">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                {product.categoryDisplay}
              </span>
            </div>

            <h1 
              className="text-3xl md:text-4xl font-bold text-gray-900"
              dangerouslySetInnerHTML={{ __html: product.title }}
            />

            <div 
              className="text-gray-700 text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.text }}
            />

            {product.features && product.features.length > 0 && (
              <div className="bg-green-50 rounded-lg p-6 space-y-3">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">
                  Características del curso:
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">{feature.featureText}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.ctas && product.ctas.length > 0 && (
              <div className="space-y-3">
                {product.ctas.map((cta, index) => cta.ctaUrl && (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <span className="text-gray-700">{cta.ctaText}</span>
                    <a
                      href={cta.ctaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 font-semibold"
                    >
                      Ver →
                    </a>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t-2 border-gray-200 pt-6 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Finalizar compra
              </h2>
              
              {product.price && (
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">
                      ${product.price.toLocaleString('es-AR')}
                    </span>
                    <span className="ml-2 text-gray-600">ARS</span>
                  </div>
                </div>
              )}

              <div className="mb-6 space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  Completá tus datos para continuar con el pago
                </p>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`
                      w-full px-4 py-3 rounded-lg border
                      ${formErrors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-green-500 focus:ring-green-500'}
                      focus:outline-none focus:ring-2
                      transition-colors
                    `}
                    placeholder="Juan Pérez"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`
                      w-full px-4 py-3 rounded-lg border
                      ${formErrors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-green-500 focus:ring-green-500'}
                      focus:outline-none focus:ring-2
                      transition-colors
                    `}
                    placeholder="Te enviaremos el archivo a este email"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`
                      w-full px-4 py-3 rounded-lg border
                      ${formErrors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-green-500 focus:ring-green-500'}
                      focus:outline-none focus:ring-2
                      transition-colors
                    `}
                    placeholder="+54 9 11 1234-5678"
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                  )}
                </div>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">
                    <strong>Error:</strong> {error}
                  </p>
                </div>
              )}

              {product.price ? (
                <button
                  onClick={handleCheckout}
                  disabled={loading || !isFormValid}
                  className={`
                    w-full py-4 px-6 rounded-lg font-semibold text-lg
                    transition-all duration-200
                    ${loading || !isFormValid
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
                    }
                    text-white
                    flex items-center justify-center
                  `}
                >
                  {loading ? (
                    <>
                      <svg 
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <circle 
                          className="opacity-25" 
                          cx="12" 
                          cy="12" 
                          r="10" 
                          stroke="currentColor" 
                          strokeWidth="4"
                        />
                        <path 
                          className="opacity-75" 
                          fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                      Pagar con MercadoPago
                    </>
                  )}
                </button>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800 text-sm">
                    Este producto no tiene precio configurado. Por favor, contactá al administrador.
                  </p>
                </div>
              )}

              {!isFormValid && (
                <p className="mt-2 text-sm text-gray-500 text-center">
                  Completá todos los campos para continuar
                </p>
              )}

              <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Pago seguro con MercadoPago
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
