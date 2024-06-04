import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Gapcursor from '@tiptap/extension-gapcursor';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
// import { CustomTable, CustomTableRow, CustomTableHeader, CustomTableCell } from './CustomTable';

const tableStyles = {
  borderCollapse: 'collapse',
  margin: '0',
  overflow: 'hidden',
  tableLayout: 'fixed',
  width: '100%',
};

const cellStyles = {
  border: '2px solid #ced4da',
  boxSizing: 'border-box',
  minWidth: '1em',
  padding: '3px 5px',
  position: 'relative',
  verticalAlign: 'top',
};

const headerStyles = {
  backgroundColor: '#f1f3f5',
  fontWeight: 'bold',
  textAlign: 'left',
};

const tableWrapperStyles = {
  padding: '1rem 0',
  overflowX: 'auto',
};

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Gapcursor,
      // CustomTable,
      // CustomTableRow,
      // CustomTableHeader,
      // CustomTableCell,
    ],
    content: `
    `,
  });

  if (!editor) {
    return null;
  }

  return (
    <div style={tableWrapperStyles}>
      <table style={tableStyles}>
        <tbody>
          <tr>
            <th style={headerStyles}>Name</th>
            <th style={headerStyles} colSpan="3">Description</th>
          </tr>
          <tr>
            <td style={cellStyles}>Cyndi Lauper</td>
            <td style={cellStyles}>singer</td>
            <td style={cellStyles}>songwriter</td>
            <td style={cellStyles}>actress</td>
          </tr>
        </tbody>
      </table>
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
