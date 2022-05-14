import fs from "fs";
import path from "path";
import { remark } from 'remark';
import html from 'remark-html';
import matter from "gray-matter";

export async function getTurnosData() {
  const turnosDirectory = path.join(process.cwd(), `content/turnos.md`);
  const fileContents = fs.readFileSync(turnosDirectory, 'utf8');

  // Use gray-matter to parse the service metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    contentHtml,
    ...matterResult.data
  };
};