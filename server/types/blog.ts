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

export interface SingleBlog {
  block?: {
    type: string;
    heading_1?: {
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
    };
    heading_2?: {
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
    };
    heading_3?: {
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
    };
    paragraph?: {
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
    };
    number: number;
    numbered_list_item?: {
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
    };
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
