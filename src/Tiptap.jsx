import './styles.css'
import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Gapcursor from '@tiptap/extension-gapcursor';
import Paragraph from '@tiptap/extension-paragraph';
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import Text from '@tiptap/extension-text';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';

import CustomTable from './extensions/CustomTable'
import CustomTableHeader from './extensions/CustomTableHeader';
import CustomTableCell from './extensions/CustomTableCell';
import { tableDecorationsPlugin, tableHoverPlugin } from './extensions/tablePlugins';

// import {CustomBubbleMenu} from './extensions/CustomBubbleMenu';

const tableWrapperStyles = {
    border: '2px solid #ced4da',
    padding: '50px',
    overflowX: 'auto',
    height: '50vh'
};

const Tiptap = () => {
    const [htmlContent, setHtmlContent] = useState();

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
            BulletList,
            // CustomBubbleMenu,
            ListItem,
            tableDecorationsPlugin,
            tableHoverPlugin,
        ],
        content: `
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Place</th>
                        <th>Animal</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>8</td>
                        <td>9</td>
                    </tr>
                </tbody>
            </table>

            <p>Hello</p>
      `,
        onCreate: ({ editor }) => {
            setHtmlContent(editor.getHTML());
        },
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
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()} >
                Toggle bullet list
            </button>
            <h2>Insert Table Below</h2>
            <EditorContent style={tableWrapperStyles} editor={editor} />
            <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                    <h3>Editor Content (HTML):</h3>
                    <pre>{htmlContent}</pre>
                </div>
                <div style={{ width: '50%', right: '0px' }} dangerouslySetInnerHTML={{ __html: htmlContent }} /> </div>
        </div>
    );
};

export default Tiptap;
