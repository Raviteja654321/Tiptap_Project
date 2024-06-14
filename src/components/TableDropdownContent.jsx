// TableDropdownContent.jsx
import React from 'react';

const TableDropdownContent = ({ editor, parentTable, closeDropdown }) => {
    const handleDeleteTable = () => {
        if (parentTable) {
            const { tr } = editor.state;
            tr.delete(tr.mapping.map(parentTable.pos), tr.mapping.map(parentTable.pos + parentTable.node.nodeSize));
            editor.view.dispatch(tr);
            closeDropdown();
        }
    };

    const handleCopyTable = () => {
        if (parentTable) {
            const { tr } = editor.state;
            const tableFragment = tr.doc.slice(parentTable.pos, parentTable.pos + parentTable.node.nodeSize);
            navigator.clipboard.writeText(tableFragment); 
            closeDropdown();
        }
    };

    return (
        <div style={{ padding: '10px' }}>
            <button onClick={handleDeleteTable} style={{ display: 'block', marginBottom: '2px' }}>Delete Table</button>
            <button onClick={handleCopyTable} style={{ display: 'block', marginBottom: '2px' }}>Copy Table</button>
            <button style={{ display: 'block' }}>Adjust Columns</button>
        </div>
    );
};

export default TableDropdownContent;
