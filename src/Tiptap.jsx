import './styles.css'
import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Gapcursor from '@tiptap/extension-gapcursor'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row';

import { CustomTableHeader, CustomTableCell } from './CustomTable.js';

const tableWrapperStyles = {
    padding: '1rem 0',
    border: '2px solid #ced4da',
    overflowX: 'auto',
};

const Tiptap = () => {
    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            Gapcursor,
            Table,
            TableRow,
            // Table.configure({
            //     resizable: true,
            // }),
            CustomTableHeader,
            CustomTableCell,
        ],
        content: ``,
    });

    if (!editor) {
        return null;
    }
    return (
        <div>
            <button onClick={() => editor.chain().focus().insertTable({ rows: 4, cols: 3, withHeaderRow: true }).run()}>
                insertTable
            </button>
            <h2>Insert Table Below</h2>
            <EditorContent style={tableWrapperStyles} editor={editor} />
        </div>
    );
};

export default Tiptap;