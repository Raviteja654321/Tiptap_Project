import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Gapcursor from '@tiptap/extension-gapcursor';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { CustomTable, CustomTableRow, CustomTableHeader, CustomTableCell} from './CustomTable.js';

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
            CustomTable,
            CustomTableRow,
            CustomTableHeader,
            CustomTableCell,
        ],
        content: ``,
    });

    if (!editor) {
        return null;
    }
    return (
        <div >
        <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
            insertTable
        </button>
        <button onClick={() => editor.chain().focus().addColumnBefore().run()}>
            addColumnBefore
        </button>
        <button onClick={() => editor.chain().focus().addColumnAfter().run()}>addColumnAfter</button>
        <button onClick={() => editor.chain().focus().deleteColumn().run()}>deleteColumn</button>
        <button onClick={() => editor.chain().focus().addRowBefore().run()}>addRowBefore</button>
        <button onClick={() => editor.chain().focus().addRowAfter().run()}>addRowAfter</button>
        <button onClick={() => editor.chain().focus().deleteRow().run()}>deleteRow</button>
        <button onClick={() => editor.chain().focus().deleteTable().run()}>deleteTable</button>
        <button onClick={() => editor.chain().focus().mergeCells().run()}>mergeCells</button>
        <button onClick={() => editor.chain().focus().splitCell().run()}>splitCell</button>
        <button onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>
            toggleHeaderColumn
        </button>
        <button onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
            toggleHeaderRow
        </button>
        <button onClick={() => editor.chain().focus().toggleHeaderCell().run()}>
            toggleHeaderCell
        </button>
        <button onClick={() => editor.chain().focus().mergeOrSplit().run()}>mergeOrSplit</button>
        <button onClick={() => editor.chain().focus().setCellAttribute('colspan', 2).run()}>
            setCellAttribute
        </button>
        <button onClick={() => editor.chain().focus().fixTables().run()}>fixTables</button>
        <button onClick={() => editor.chain().focus().goToNextCell().run()}>goToNextCell</button>
        <button onClick={() => editor.chain().focus().goToPreviousCell().run()}>
            goToPreviousCell
        </button>
            <h2>Insert Table Below</h2>
            <EditorContent style={tableWrapperStyles} editor={editor} />
        </div>
    );
};

export default Tiptap;
