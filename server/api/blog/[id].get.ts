import { NOTION } from "~/lib/notion";
import { BlockType, SingleBlog } from "~/server/types/blog";

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

    const headers = (await getBlogHeaders(id)) as any;

    // add number label for numbered list block
    let counter = 1;

    for (let i = 0; i < blog.results.length; i++) {
      const current = blog.results[i] as any;
      const next = blog.results[i + 1] as any;

      if (current.type === BlockType.NUMBERED_LIST_ITEM) {
        current.number = counter;

        if (next && next.type === BlockType.NUMBERED_LIST_ITEM) {
          counter++;
        } else {
          counter = 1;
        }
      }
    }

    return {
      block: blog.results,
      headers: headers.properties,
      createdDate: headers.created_time,
    };
  } catch (error) {
    console.error("Error fetching blog content", error);
    return { blog: null };
  }
});
