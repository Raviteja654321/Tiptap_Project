import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrashAlt,
    faCopy,
    faArrowLeft,
    faArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { DOMSerializer } from '@tiptap/pm/model';
import 'tippy.js/dist/tippy.css'; // optional for styling

const iconStyle = { color: '#ffffff', fontSize: '1rem' };

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

const deleteTable = (editor, parentTable) => {
    if (parentTable) {
        const { state, view } = editor;
        const { tr } = state;

        tr.delete(
            tr.mapping.map(parentTable.pos),
            tr.mapping.map(parentTable.pos + parentTable.node.nodeSize)
        );

        view.dispatch(tr);
        editor.commands.focus(parentTable.pos);
    }
};

const copyTable = (editor, parentTable) => {
    if (parentTable) {
        const { schema } = editor.state;
        const tableNode = parentTable.node;
        const domSerializer = DOMSerializer.fromSchema(schema);

        const tableFragment = domSerializer.serializeFragment(tableNode.content);
        const tempDiv = document.createElement('div');

        tempDiv.appendChild(tableFragment);
        let htmlString = tempDiv.innerHTML;
        htmlString = `<table>${htmlString}</table>`;

        const blob = new Blob([htmlString], { type: 'text/html' });
        const clipboardItem = new ClipboardItem({ 'text/html': blob });

        navigator.clipboard.write([clipboardItem]);
    }
};

const toggleHeaderRow = (editor) => {
    editor.chain().focus().toggleHeaderRow().run();
};

const toggleHeaderColumn = (editor) => {
    editor.chain().focus().toggleHeaderColumn().run();
};

const TableOptions = ({ editor, parentTable }) => {
    return (
        <div className="table-options-menu">
            <button onClick={() => deleteTable(editor, parentTable)} title="Delete Table" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
                <FontAwesomeIcon icon={faTrashAlt} style={iconStyle} />
            </button>
            <button onClick={() => copyTable(editor, parentTable)} title="Copy Table" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
                <FontAwesomeIcon icon={faCopy} style={iconStyle} />
            </button>
            <button onClick={() => toggleHeaderColumn(editor)} title="Toggle Header Column" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
                <FontAwesomeIcon icon={faArrowLeft} style={iconStyle} />
            </button>
            <button onClick={() => toggleHeaderRow(editor)} title="Toggle Header Row" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
                <FontAwesomeIcon icon={faArrowUp} style={iconStyle} />
            </button>
        </div>
    );
};

export {
    TableOptions,
    findParentClosestToPos
};
