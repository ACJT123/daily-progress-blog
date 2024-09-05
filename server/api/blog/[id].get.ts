import { NOTION } from "~/lib/notion";
import { SingleBlog } from "~/server/types/blog";

async function getBlogContentBlock(id: string) {
  const response = await NOTION.blocks.children.list({
    block_id: id,
  });
  return response;
}

async function getBlogHeaders(id: string) {
  const response = await NOTION.pages.retrieve({
    page_id: id,
  });
  return response;
}

export default defineEventHandler(async (event: any) => {
  try {
    const { id } = event.context.params;
    const blog = await getBlogContentBlock(id);

    const headers = (await getBlogHeaders(id)) as { properties: {} };

    console.log("headers", headers);

    // add number label for numbered list
    blog.results
      .filter((block: any) => block.type === "numbered_list_item")
      .forEach((block: any, index: number) => {
        if (block.type === "numbered_list_item") {
          block.number = index + 1;
        }
      });

    return { block: blog.results, headers: headers.properties };
  } catch (error) {
    console.error("Error fetching blog content", error);
    return { blog: null };
  }
});
