// Product data helper
import { attributes as ebooksData } from "../content/ebooks.md";
import { attributes as coursesData } from "../content/cursos-y-talleres.md";

// Helper function to create URL-friendly slugs
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/<br\s*\/?>/gi, '') // Remove <br> tags specifically
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

// Get all products with their category and slug
export function getAllProducts() {
  const products = [];

  // Add ebooks
  if (ebooksData.ebooksList) {
    ebooksData.ebooksList.forEach((ebook) => {
      const slug = slugify(ebook.title);
      products.push({
        ...ebook,
        slug,
        category: 'ebooks',
        categoryDisplay: 'E-book',
        type: 'Ebook',
        price: ebook.price || null, // Use price from markdown
      });
    });
  }

  // Add courses
  if (coursesData.alimentationCourse) {
    coursesData.alimentationCourse.forEach((course) => {
      const slug = slugify(course.title);
      products.push({
        ...course,
        slug,
        category: 'cursos-y-talleres',
        categoryDisplay: 'Curso / Taller',
        type: 'Curso',
        features: course.features || [],
        ctas: course.ctas || [],
        price: course.price || null, // Use price from markdown
      });
    });
  }

  return products;
}

// Get a specific product by category and slug
export function getProductBySlug(category, productSlug) {
  const products = getAllProducts();
  return products.find(
    (product) => 
      product.category === category && 
      product.slug === productSlug
  );
}

// Get all products for a specific category
export function getProductsByCategory(category) {
  const products = getAllProducts();
  return products.filter((product) => product.category === category);
}

// Get all possible paths for static generation
export function getAllProductPaths() {
  const products = getAllProducts();
  return products.map((product) => ({
    params: {
      category: product.category,
      product: product.slug,
    },
  }));
}
