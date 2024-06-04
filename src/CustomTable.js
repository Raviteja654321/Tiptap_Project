import Table from "@tiptap/extension-table";
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'

// Custom Table Extension with Enhanced CSS
const CustomTable = Table.extend({
    addAttributes() {
      return {
        color: {
          renderHTML: (attributes) => {
            return {
              // style: `border-collapse: collapse; margin: 0; overflow: hidden; table-layout: fixed; width: 100%; background-color: #f0f8ff;`,
            };
          },
        },
      };
    },
  });
  
  const CustomTableRow = TableRow.extend({
    addAttributes() {
      return {
        color: {
          renderHTML: (attributes) => {
            return {
              style: `height: 100%;`,
            };
          },
        },
      };
    },
  });
  
  const CustomTableCell = TableCell.extend({
    addAttributes() {
      return {
        color: {
          renderHTML: (attributes) => {
            return {
              style: `
                border: 1px solid #ced4da;
                min-width: 1em;
                position: relative;
                vertical-align: top;
                height: 100%;
              `,
            };
          },
        },
      };
    },
  });
  
  const CustomTableHeader = TableHeader.extend({
    addAttributes() {
      return {
        color: {
          renderHTML: (attributes) => {
            return {
              style: `
                background-color: #262626;
                color: #ffffff;
                font-weight: bold;
                text-align: center;
                border: 1px solid #ced4da;
                min-width: 1em;
                position: relative;
                vertical-align: top;
                height: 100%;
              `,
            };
          },
        },
      };
    },
  });
  
  export { CustomTable, CustomTableRow, CustomTableHeader, CustomTableCell };