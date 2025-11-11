import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Base from '../../components/Base';
import { getProductBySlug } from '../../lib/products';

export default function CheckoutPending() {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [checkoutData, setCheckoutData] = useState(null);

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

  return (
    <Base 
      title="Pago pendiente"
      metaTitle="Pago pendiente - Mami Ayurveda"
      metaDescription="Tu pago está siendo procesado"
      classes="bg-slate-50"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Pending Icon */}
          <div className="flex justify-center mb-8">
            <div className="rounded-full bg-amber-100 p-6">
              <svg
                className="w-16 h-16 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Pending Message */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Pago pendiente
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Tu pago está siendo procesado
            </p>
          </div>

          {/* Customer Info */}
          {checkoutData && (
            <div className="bg-amber-50 rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-amber-900">Información de contacto</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-amber-600 mr-3"
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
                    className="w-5 h-5 text-amber-600 mr-3"
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
                    className="w-5 h-5 text-amber-600 mr-3"
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
            </div>
          )}

          {/* Info Message */}
          <div className="bg-amber-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">
              ¿Qué significa esto?
            </h3>
            <div className="space-y-3 text-gray-700">
              <p>
                Tu pago está siendo procesado por MercadoPago. Esto puede suceder cuando:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Elegiste pagar en efectivo (Rapipago, Pago Fácil, etc.)</li>
                <li>Seleccionaste una transferencia bancaria</li>
                <li>El pago requiere verificación adicional</li>
              </ul>
              <p className="mt-4">
                <strong>Te notificaremos por email cuando el pago sea confirmado.</strong>
              </p>
            </div>
          </div>

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
                  Revisá tu email para ver las instrucciones de pago
                </span>
              </li>
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  Una vez confirmado el pago, recibirás el producto
                </span>
              </li>
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
                  Si tenés dudas, contactanos por Instagram
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
            <a
              href="https://www.instagram.com/mami.ayurveda"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-6 py-3 bg-white border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition text-center font-semibold"
            >
              Contactar por Instagram
            </a>
          </div>
        </div>
      </div>
    </Base>
  );
}
