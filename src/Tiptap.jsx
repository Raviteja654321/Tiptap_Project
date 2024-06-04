import React from 'react';
import {useEditor } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Gapcursor from '@tiptap/extension-gapcursor';
// import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { CustomTable, CustomTableRow, CustomTableHeader, CustomTableCell ,CustomParagraph} from './CustomTable.js';

const tableWrapperStyles = {
  padding: '1rem 0',
  overflowX: 'auto',
};

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      Document,
      // Paragraph,
      Text,
      Gapcursor,
      CustomTable,
      CustomTableRow,
      CustomTableHeader,
      CustomTableCell,
      CustomParagraph,
    ],
    content: `
    `,
  });

  if (!editor) {
    return null;
  }
  console.log("Hello")
  return (
    <div style={tableWrapperStyles}>
      <p>Hello all</p>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
          <tr>
            <td>Cyndi Lauper</td>
            <td>singer, songwriter, actress</td>
          </tr>
          <tr>
            <td>Bob Dylan</td>
            <td>singer-songwriter, musician</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Tiptap;
