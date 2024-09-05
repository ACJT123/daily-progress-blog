import { Client } from "@notionhq/client";

export const NOTION = new Client({ auth: process.env.NOTION_API_KEY });
