import './styles.css';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrashAlt,
    faCopy,
    faArrowUp,
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

import { useEditor, EditorContent } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Gapcursor from '@tiptap/extension-gapcursor';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { TableMenu } from './extensions/TableOptions/TableMenu';

import CustomTable from './extensions/CustomTable';
import CustomTableHeader from './extensions/CustomTableHeader';
import CustomTableCell from './extensions/CustomTableCell';
import TableMenuExtension from './extensions/TableOptions/table-menu';

const tableWrapperStyles = {
    border: '2px solid #ced4da',
    padding: '50px',
    overflowX: 'auto',
    height: '50vh'
};

const findParentClosestToPos = ($pos, predicate) => {
    const depth = $pos.depth;

    for (let i = depth; i > 0; i -= 1) {
        const node = $pos.node(i);
        if (predicate(node)) {
            return { pos: $pos.before(i), node };
        }
    }

    return undefined;
};

const handleDeleteTable = ({ editor, parentTable }) => {
    console.log("Deleting table");
    if (parentTable) {
        const { tr } = editor.state;
        tr.delete(tr.mapping.map(parentTable.pos), tr.mapping.map(parentTable.pos + parentTable.node.nodeSize));
        editor.view.dispatch(tr);
    }
};

// Function to copy the table
const handleCopyTable = (editor, parentTable) => {
    console.log("copying table");
    if (parentTable) {
        const { tr } = editor.state;
        const tableFragment = tr.doc.slice(parentTable.pos, parentTable.pos + parentTable.node.nodeSize);
        navigator.clipboard.writeText(tableFragment);
    }
};

const handleToggleHeaderRow = (editor) => {
    editor.chain().focus().toggleHeaderRow().run();
};

const handleToggleHeaderColumn = (editor) => {
    editor.chain().focus().toggleHeaderColumn().run();
};

const iconStyle = { color: '#ffffff', fontSize: '1rem' };

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

    const resolvedPos = editor.state.doc.resolve(editor.state.selection.from);
    const parentTable = findParentClosestToPos(resolvedPos, node => node.type.name === 'table');

    return (
        <div>
            <button onClick={() => editor.chain().focus().insertTable({ rows: 4, cols: 3, withHeaderRow: true }).run()}>
                Insert Table
            </button>
            <h2>Insert Table Below</h2>
            {editor && <TableMenu editor={editor} >
                <button onClick={() => handleDeleteTable(editor,parentTable)} title="Delete Table" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
                    <FontAwesomeIcon icon={faTrashAlt} style={iconStyle} />
                </button>
                <button onClick={() => handleCopyTable(editor, parentTable)} title="Copy Table" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
                    <FontAwesomeIcon icon={faCopy} style={iconStyle} />
                </button>
                <button onClick={() => handleToggleHeaderColumn(editor)} title="Toggle Header Column" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
                    <FontAwesomeIcon icon={faArrowLeft} style={iconStyle} />
                </button>
                <button onClick={() => handleToggleHeaderRow(editor)} title="Toggle Header Row" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
                    <FontAwesomeIcon icon={faArrowUp} style={iconStyle} />
                </button>
            </TableMenu>}
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
