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
