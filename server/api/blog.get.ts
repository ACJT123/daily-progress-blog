import { Client } from "@notionhq/client";

// Create a Notion instance
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const database_id = process.env.NOTION_DATABASE_ID;

async function getBlogPosts() {
  const data = await notion.databases.query({
    database_id: database_id!,
  });

  return data.results; // Return only the results
}

async function getBlogContent(id: string) {
  const response = await notion.blocks.children.list({
    block_id: id,
  });

  return response.results;
}

export default defineEventHandler(async () => {
  try {
    const blogs: { id: string; content?: any }[] = await getBlogPosts();

    if (!blogs) {
      return { error: "Failed to fetch blog posts" };
    }

    const blogIds = blogs.map((blog) => blog.id);

    const blogContent = await Promise.all(
      blogIds.map((id) => getBlogContent(id))
    );

    // merge
    blogs.forEach((blog, index) => {
      blog.content = blogContent[index][0];
    });

    return blogs;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return { error: "Failed to fetch blog posts" };
  }
});
