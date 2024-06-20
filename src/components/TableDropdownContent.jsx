import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrashAlt,
    faCopy,
    faColumns,
    faArrowUp,
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

const TableDropdownContent = ({ editor, parentTable, closeDropdown }) => {
    
    // Function to delete the table
    const handleDeleteTable = () => {
        if (parentTable) {
            const { tr } = editor.state;
            tr.delete(tr.mapping.map(parentTable.pos), tr.mapping.map(parentTable.pos + parentTable.node.nodeSize));
            editor.view.dispatch(tr);
            closeDropdown();
        }
    };

    // Function to copy the table
    const handleCopyTable = () => {
        if (parentTable) {
            const { tr } = editor.state;
            const tableFragment = tr.doc.slice(parentTable.pos, parentTable.pos + parentTable.node.nodeSize);
            navigator.clipboard.writeText(tableFragment); 
            closeDropdown();
        }
    };

    // Function to toggle the header row
    const handleToggleHeaderRow = () => {
        editor.chain().focus().toggleHeaderRow().run();
        closeDropdown();
    };

    // Function to toggle the header column
    const handleToggleHeaderColumn = () => {
        editor.chain().focus().toggleHeaderColumn().run();
        closeDropdown();
    };

    const iconStyle = { color: '#ffffff', fontSize: '1rem' }; // Custom icon color and size

    return (
        <div style={{ padding: '4px', display: 'flex', justifyContent: 'space-around' }}>
            <button onClick={handleDeleteTable} title="Delete Table" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
                <FontAwesomeIcon icon={faTrashAlt} style={iconStyle} />
            </button>
            <button onClick={handleCopyTable} title="Copy Table" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
                <FontAwesomeIcon icon={faCopy} style={iconStyle} />
            </button>
            <button title="Adjust Columns" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
                <FontAwesomeIcon icon={faColumns} style={iconStyle} />
            </button>
            <button onClick={handleToggleHeaderColumn} title="Toggle Header Column" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
                <FontAwesomeIcon icon={faArrowLeft} style={iconStyle} />
            </button>
            <button onClick={handleToggleHeaderRow} title="Toggle Header Row" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
                <FontAwesomeIcon icon={faArrowUp} style={iconStyle} />
            </button>
        </div>
    );
};

export default TableDropdownContent;
