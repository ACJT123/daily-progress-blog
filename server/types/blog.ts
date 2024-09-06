export enum BlockType {
  PARAGRAPH = "paragraph",
  HEADING_1 = "heading_1",
  HEADING_2 = "heading_2",
  HEADING_3 = "heading_3",
  NUMBERED_LIST_ITEM = "numbered_list_item",
}

export interface Blog {
  id: string;
  created_time: string;
  properties: {
    Name: {
      title: {
        text: {
          content: string;
        };
      }[];
    };
    Tags: {
      multi_select: {
        name: string;
        id: string;
        color: string;
      }[];
    };
    "Files & media": {
      files: {
        file: {
          url: string;
        };
      }[];
    };
  };
  content: {
    paragraph: {
      rich_text: {
        annotations: {
          bold: boolean;
          code: boolean;
          color: string;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
        };
        plain_text: string;
        text: {
          content: string;
          link: null;
        }[];
      }[];
    };
  };
}

interface RichTextBlock {
  rich_text: {
    text: {
      content: string;
    };
    annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
      color: string;
    };
  }[];
}

export interface SingleBlog {
  block?: {
    type: BlockType;
    heading_1?: RichTextBlock;
    heading_2?: RichTextBlock;
    heading_3?: RichTextBlock;
    paragraph?: RichTextBlock;
    numbered_list_item?: RichTextBlock;
    number?: number;
  }[];
  headers?: {
    Name: {
      title: {
        text: {
          content: string;
        };
      }[];
    };
    Tags: {
      multi_select: {
        name: string;
        id: string;
        color: string;
      }[];
    };
    "Files & media": {
      files: {
        file: {
          url: string;
        };
      }[];
    };
  };
}
