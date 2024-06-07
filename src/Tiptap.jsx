import './styles.css'
import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Gapcursor from '@tiptap/extension-gapcursor';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import {CustomTable, CustomTableHeader, CustomTableCell } from './CustomTable.js';
import Popover from "./Popover.jsx";

const tableWrapperStyles = {
    padding: '1rem 0',
    border: '2px solid #ced4da',
    overflowX: 'auto',
    height: '80vh'
};

const Tiptap = () => {
    const [htmlContent, setHtmlContent] = useState('');

    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            Gapcursor,
            CustomTable,
            TableRow,
            TableHeader,
            CustomTableHeader,
            TableCell,
            CustomTableCell,
        ],
        content: '',
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setHtmlContent(html);
        }
    });

    if (!editor) {
        return null;
    }

    return (
        <div>
            <button onClick={() => editor.chain().focus().insertTable({ rows: 4, cols: 3, withHeaderRow: true }).run()}>
                Insert Table
            </button>
            <h2>Insert Table Below</h2>
            <EditorContent style={tableWrapperStyles} editor={editor} />
            <Popover />
            <div>
                <h3>Editor Content (HTML):</h3>
                <pre>{htmlContent}</pre>
            </div>
        </div>
    );
};

export default Tiptap;
