import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Base from '../../components/Base';
import Footer from '../../components/Footer';
import { getProductBySlug } from '../../lib/products';

export default function CheckoutSuccess() {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [checkoutData, setCheckoutData] = useState(null);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [sheetsSaved, setSheetsSaved] = useState(false);

  const sendCustomerEmail = useCallback(async () => {
    try {
      const response = await fetch('/api/send-customer-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: checkoutData.email,
          name: checkoutData.name,
          phone: checkoutData.phone,
          productTitle: product.title.replace(/<[^>]*>/g, ''),
          productCategory: product.categoryDisplay,
          productPrice: product.price,
          deliveryUrl: checkoutData.product?.deliveryUrl || null,
          isEbook: product.category === 'ebooks',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Purchase email sent to customer successfully');
        setEmailSent(true);
      } else {
        console.error('Failed to send email:', data.error);
        setEmailError(data.error);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setEmailError(error.message);
    }
  }, [checkoutData, product]);

  const saveToGoogleSheets = useCallback(async () => {
    try {
      const formData = new FormData();
      
      // Add all purchase data to the form
      formData.append('name', checkoutData.name || '');
      formData.append('email', checkoutData.email || '');
      formData.append('phone', checkoutData.phone || '');
      formData.append('message', `Compra: ${product.title.replace(/<[^>]*>/g, '')} - ${product.categoryDisplay} - $${product.price?.toLocaleString('es-AR')} ARS`);
      formData.append('source', '/checkout/success');
      formData.append('product', product.title.replace(/<[^>]*>/g, ''));
      formData.append('category', product.category);
      formData.append('price', product.price || '');
      
      // Submit to Google Sheets
      await fetch('https://script.google.com/macros/s/AKfycbxkNhcKafcfD4k5o7U8R40llpqOFf8lUPKWdKqSaruyJvaeX5Ecau7YKene-FrQs6Re/exec', {
        method: 'POST',
        body: formData
      });
      
      console.log('Purchase data saved to Google Sheets successfully');
      setSheetsSaved(true);
    } catch (error) {
      console.error('Error saving to Google Sheets:', error);
      // Don't block the UI if this fails
    }
  }, [checkoutData, product]);

  useEffect(() => {
    // Load checkout data from localStorage
    const savedCheckout = localStorage.getItem('lastCheckout');
    if (savedCheckout) {
      try {
        const parsed = JSON.parse(savedCheckout);
        setCheckoutData(parsed);
        
        // Get product details using category and slug from localStorage
        if (parsed.product?.category && parsed.product?.slug) {
          const productData = getProductBySlug(parsed.product.category, parsed.product.slug);
          setProduct(productData);
        }
      } catch (e) {
        console.error('Error loading checkout data:', e);
      }
    }
  }, []);

  // Send email to customer when product and checkout data are available
  useEffect(() => {
    if (product && checkoutData && !emailSent && checkoutData.email) {
      sendCustomerEmail();
    }
  }, [product, checkoutData, emailSent, sendCustomerEmail]);

  // Save to Google Sheets when product and checkout data are available
  useEffect(() => {
    if (product && checkoutData && !sheetsSaved) {
      saveToGoogleSheets();
    }
  }, [product, checkoutData, sheetsSaved, saveToGoogleSheets]);

  return (
    <Base 
      title="¡Compra exitosa!"
      metaTitle="Compra exitosa - Mami Ayurveda"
      metaDescription="Tu compra se ha procesado exitosamente"
      classes="bg-slate-50"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="rounded-full bg-green-100 p-6">
              <svg
                className="w-16 h-16 text-green-600"
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
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              ¡Pago exitoso!
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Tu compra se ha procesado correctamente.
            </p>
            
            {/* Email Status Indicator */}
            {emailSent && (
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                <svg
                  className="w-5 h-5 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-blue-800 text-sm font-medium">
                  Email de confirmación enviado a {checkoutData?.email}
                </span>
              </div>
            )}
          </div>

          {checkoutData && (
            <div className="bg-green-50 rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-green-900">Información de contacto</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <div>
                    <span className="text-gray-600 text-sm">Nombre:</span>
                    <p className="font-semibold">{checkoutData.name}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <span className="text-gray-600 text-sm">Email:</span>
                    <p className="font-semibold">{checkoutData.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div>
                    <span className="text-gray-600 text-sm">Teléfono:</span>
                    <p className="font-semibold">{checkoutData.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product Info */}
          {product && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Detalles de tu compra</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600">Producto:</span>
                  <p 
                    className="font-semibold text-lg"
                    dangerouslySetInnerHTML={{ __html: product.title }}
                  />
                </div>
                <div>
                  <span className="text-gray-600">Tipo:</span>
                  <p className="font-semibold">{product.categoryDisplay}</p>
                </div>
                {product.price && (
                  <div>
                    <span className="text-gray-600">Precio:</span>
                    <p className="font-semibold text-lg">
                      ${product.price.toLocaleString('es-AR')} ARS
                    </p>
                  </div>
                )}
              </div>

              {/* Delivery Access - Show download or course access button */}
              {checkoutData?.product?.deliveryUrl && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">
                    {product.category === 'ebooks' ? 'Descargá tu e-book' : 'Accedé a tu curso'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {product.category === 'ebooks' 
                      ? 'Tu e-book está listo para descargar. Hacé click en el botón de abajo para obtener tu archivo PDF.'
                      : 'Ya podés acceder a tu curso. Hacé click en el botón de abajo para ingresar a la plataforma.'
                    }
                  </p>
                  <a
                    href={checkoutData.product.deliveryUrl}
                    target={product.category === 'cursos-y-talleres' ? '_blank' : '_self'}
                    rel="noreferrer"
                    download={product.category === 'ebooks'}
                    className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    {product.category === 'ebooks' ? (
                      <>
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Descargar E-book (PDF)
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                        Acceder al Curso
                      </>
                    )}
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">
              Próximos pasos
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>
                  Recibirás un email de confirmación de MercadoPago
                </span>
              </li>
              {checkoutData?.product?.deliveryUrl ? (
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-2 flex-shrink-0"
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
                  <span>
                    {product?.category === 'ebooks' 
                      ? '¡Tu e-book ya está disponible para descargar arriba!'
                      : '¡Ya podés acceder a tu curso usando el botón de arriba!'
                    }
                  </span>
                </li>
              ) : (
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>
                    {product?.category === 'ebooks' 
                      ? 'Tu e-book llegará a tu correo dentro de las próximas 24 horas hábiles'
                      : 'Recibirás las instrucciones de acceso al curso por email'
                    }
                  </span>
                </li>
              )}
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  Si tenés alguna duda, contactanos a través de Instagram
                </span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-center font-semibold"
            >
              Volver al inicio
            </Link>
            <Link
              href={product?.category === 'ebooks' ? '/ebooks' : '/cursos-y-talleres'}
              className="flex-1 px-6 py-3 bg-white border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition text-center font-semibold"
            >
              Ver más productos
            </Link>
          </div>
        </div>
      </div>
      <Footer
        page="checkout"
      />
    </Base>
  );
}
