import { useRouter } from 'next/router';
import Link from 'next/link';

import Base from '../../../components/Base';
import Checkout from '../../../components/Checkout';
import { 
  getProductBySlug, 
  getAllProductPaths 
} from '../../../lib/products';
import Footer from '../../../components/Footer';

export default function CheckoutPage({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Base title="Cargando...">
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-gray-600">Cargando producto...</p>
        </div>
      </Base>
    );
  }

  if (!product) {
    return (
      <Base title="Producto no encontrado">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Producto no encontrado</h1>
          <p className="text-gray-600 mb-8">
            El producto que buscás no existe.
          </p>
          <div className="space-x-4">
            <Link
              href="/ebooks"
              className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Ver E-books
            </Link>
            <Link
              href="/cursos-y-talleres"
              className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Ver Cursos
            </Link>
          </div>
        </div>
      </Base>
    );
  }

  const pageTitle = `Checkout - ${product.title.replace(/<[^>]*>/g, '')}`;
  const metaDescription = product.text ? 
    product.text.replace(/<[^>]*>/g, '').substring(0, 160) : 
    'Completa tu compra en Mami Ayurveda';

  return (
    <Base 
      title={pageTitle}
      metaTitle={pageTitle}
      metaDescription={metaDescription}
      classes="bg-slate-50"
    >
      <Checkout product={product} />
      <Footer
        page="checkout"
      />
    </Base>
  );
}

export async function getStaticPaths() {
  const paths = getAllProductPaths();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { category, product: productSlug } = params;

  const product = getProductBySlug(category, productSlug);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 3600,
  };
}
