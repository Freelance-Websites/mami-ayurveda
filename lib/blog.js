const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function getSlugFromFilename(filename) {
  return filename.replace(/\.md$/, '');
}

function getAllPostSlugs() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.md'))
    .map(getSlugFromFilename);
}

function serializeDate(date) {
  if (!date) return null;
  const d = date instanceof Date ? date : new Date(date);
  return isNaN(d.getTime()) ? null : d.toISOString();
}

function getPostBySlug(slug) {
  const fullPath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return {
    slug,
    title: data.title || slug,
    date: serializeDate(data.date),
    description: data.description || null,
    image: data.image || null,
    body: content,
  };
}

function getAllPosts() {
  const slugs = getAllPostSlugs();
  const posts = slugs.map((slug) => {
    const fullPath = path.join(BLOG_DIR, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return {
      slug,
      title: data.title || slug,
      date: serializeDate(data.date),
      description: data.description || null,
      image: data.image || null,
    };
  });
  return posts.sort((a, b) => {
    const dateA = a.date ? new Date(a.date) : new Date(0);
    const dateB = b.date ? new Date(b.date) : new Date(0);
    return dateB - dateA;
  });
}

module.exports = {
  getAllPostSlugs,
  getPostBySlug,
  getAllPosts,
};
