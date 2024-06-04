import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Gapcursor from '@tiptap/extension-gapcursor';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { CustomTable, CustomTableRow, CustomTableHeader, CustomTableCell} from './CustomTable.js';

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
            CustomTable,
            CustomTableRow,
            CustomTableHeader,
            CustomTableCell,
        ],
        content: `
        <p>Hello World</p>
        
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>singer</td>
              <td>songwriter</td>
              <td>actress</td>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>singer</td>
              <td>songwriter</td>
              <td>actress</td>
            </tr>
          </tbody>
        </table>
    `,
    });

    if (!editor) {
        return null;
    }
    return (
        <div style={tableWrapperStyles}>
            <EditorContent editor={editor} />
        </div>
    );
};

export default Tiptap;
