import { mergeAttributes } from "@tiptap/react";
import  Table from "@tiptap/extension-table";
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'
import Paragraph from '@tiptap/extension-paragraph'

 const CustomTable = Table.extend({
  addAttributes() {
    return {
      style: {
        default: null,
        parseHTML: (element) => {
          return element.hasAttribute("style")
            ? element.getAttribute("style")
            : null;
        },
      },
    };
  },

  addOptions() {
    return {
      HTMLAttributes: {
        style: "color: 'pink'; border-collapse: collapse; margin: 0; overflow: hidden; table-layout: fixed; width: 100%;",
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "td",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      ["tbody", 0],
    ];
  },
});

 const CustomTableRow = TableRow.extend({
  addAttributes() {
    return {
      style: {
        default: null,
        parseHTML: (element) => {
          return element.hasAttribute("style")
            ? element.getAttribute("style")
            : null;
        },
      },
    };
  },

//   addOptions() {
//     return {
//       HTMLAttributes: {
//         style: "",
//       },
//     };
//   },

  renderHTML({ HTMLAttributes }) {
    return ["tr", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});

 const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      style: {
        default: null,
        parseHTML: (element) => {
          return element.hasAttribute("style")
            ? element.getAttribute("style")
            : null;
        },
      },
    };
  },

  addOptions() {
    return {
      HTMLAttributes: {
        style: "border: 2px solid #ced4da; box-sizing: border-box; min-width: 1em; padding: 3px 5px; position: relative; vertical-align: top;",
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["td", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});

 const CustomTableHeader = TableHeader.extend({
  addOptions() {
    return {
      HTMLAttributes: {
        style: "background-color: #f1f3f5; font-weight: bold; text-align: left; border: 2px solid #ced4da; box-sizing: border-box; min-width: 1em; padding: 3px 5px; position: relative; vertical-align: top;",
      },
    };
  },

  content: 'inline*',

  tableRole: 'header_cell',

  isolating: true,

  parseHTML() {
    return [{ tag: 'th' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['th', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },
});

const CustomParagraph = Paragraph.extend({
    addAttributes() {
      return {
        color: {
          default: 'pink',
          renderHTML: attributes => ( { style: `color: ${attributes.color}` } ),
          // Allow setting a custom color through a constructor argument
        //   parse: value => (typeof value === 'string' ? value : 'pink'), // Handle invalid values gracefully
        },
      };
    },

    

  });
  
  

export { CustomTable, CustomTableRow, CustomTableHeader, CustomTableCell, CustomParagraph };