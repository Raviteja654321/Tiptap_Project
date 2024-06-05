import React from 'react';

const Popover = ({ position, onApplyBackgroundColor }) => {
    return (
        <div style={{ position: 'absolute', top: position.top, left: position.left, backgroundColor: 'white', border: '1px solid #ced4da', padding: '1rem' }}>
            <h4>Cell Formatting</h4>
            <button onClick={() => onApplyBackgroundColor('#ffeb3b')}>Yellow Background</button>
            {/* Add more buttons for other functionalities like Clear Cell, Delete Row/Column, Add Row/Column, etc. */}
        </div>
    );
};

export default Popover;
