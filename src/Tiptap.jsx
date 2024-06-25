import './styles.css';
import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Gapcursor from '@tiptap/extension-gapcursor';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { TableMenu } from './extensions/TableMenu/TableMenu';
import CustomTable from './extensions/CustomTable';
import CustomTableHeader from './extensions/CustomTableHeader';
import CustomTableCell from './extensions/CustomTableCell';
import TableMenuExtension from './extensions/TableMenu/TableMenuExtension';
import { TableOptions, findParentClosestToPos } from './components/TableOptions';
import 'tippy.js/dist/tippy.css'; // optional for styling

const tableWrapperStyles = {
    border: '2px solid #ced4da',
    padding: '50px',
    overflowX: 'auto',
    height: '50vh'
};

const Tiptap = () => {
    const [htmlContent, setHtmlContent] = useState();

    const editor = useEditor({
        style: ` padding:50px`,
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
            TableMenuExtension,
        ],
        content: `
            <table>
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

    const resolvedPos = editor.state.doc?.resolve(editor.state.selection.from);
    const parentTable = (resolvedPos)?findParentClosestToPos(resolvedPos, node => node.type.name === 'table'):null;

    return (
        <div>
            <button onClick={() => editor.chain().focus().insertTable({ rows: 4, cols: 3, withHeaderRow: true }).run()}>
                Insert Table
            </button>
            <h2>Insert Table Below</h2>
            {editor && <TableMenu editor={editor}>
                <TableOptions editor={editor} parentTable={parentTable} />
            </TableMenu>}
            <EditorContent style={tableWrapperStyles} editor={editor} />
            <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                    <h3>Editor Content (HTML):</h3>
                    <pre>{htmlContent}</pre>
                </div>
                <div style={{ width: '50%', right: '0px' }} dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
        </div>
    );
};

export default Tiptap;
