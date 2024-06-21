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
import { BubbleMenu } from '@tiptap/react';
import BubbleMenuExtension from '@tiptap/extension-bubble-menu'

import CustomTable from './extensions/CustomTable'
import CustomTableHeader from './extensions/CustomTableHeader';
import CustomTableCell from './extensions/CustomTableCell';
// import BubbleMenuExtension from './extensions/bubble-menu'

const tableWrapperStyles = {
    border: '2px solid #ced4da',
    padding: '50px',
    overflowX: 'auto',
    height: '50vh'
};

let tablerect ;

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

const Tablerectfinder = ({ editor, view, state, oldState, from, to }) => {
    const resolvedPos = editor.state.doc.resolve(from);
    const tableNode = findParentClosestToPos(resolvedPos, node => node.type.name === 'table');
    if (tableNode) {
        const rect = tableNode.node.getBoundingClientRect();
        console.log(rect);
        tablerect = rect;
    }
    return null;
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
            BubbleMenuExtension.extend({
                addOptions() {
                    console.log(11111111, this.editor);
                    return {
                        ...this.parent?.(),
                        shouldShow: ({ editor, view, state, oldState, from, to }) => {
                            Tablerectfinder({editor, view, state, oldState, from, to})
                            return editor.isActive('table')
                        },
                        tippyOptions: {getReferenceClientRect:  tablerect},
                    }
                },
            }),
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
            <h2>Insert Table Below</h2>
            {editor && <BubbleMenu shouldShow={()=>editor.isActive('table')}  editor={editor} tippyOptions={{getReferenceClientRect: tablerect }} >
                <div className="bubble-menu">
                    <button
                        // onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? 'is-active' : ''}
                    >
                        Bold
                    </button>
                    <button
                        // onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={editor.isActive('italic') ? 'is-active' : ''}
                    >
                        Italic
                    </button>
                    <button
                        // onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={editor.isActive('strike') ? 'is-active' : ''}
                    >
                        Strike
                    </button>
                </div>
            </BubbleMenu>}
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
