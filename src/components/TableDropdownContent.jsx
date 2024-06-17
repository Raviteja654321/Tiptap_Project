import React from 'react';

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

    return (
        <div style={{ padding: '10px'}}>
            <button onClick={handleDeleteTable} style={{ display: 'block', marginBottom: '2px', cursor: 'pointer' }}>Delete Table</button>
            <button onClick={handleCopyTable} style={{ display: 'block', marginBottom: '2px', cursor: 'pointer' }}>Copy Table</button>
            <button style={{ display: 'block', marginBottom: '2px', cursor: 'pointer' }}>Adjust Columns</button>
            <button onClick={handleToggleHeaderColumn} style={{ display: 'block', marginBottom: '2px', cursor: 'pointer' }}>Toggle Header Column</button>
            <button onClick={handleToggleHeaderRow} style={{ display: 'block', cursor: 'pointer' }}>Toggle Header Row</button>
        </div>
    );
};

export default TableDropdownContent;
