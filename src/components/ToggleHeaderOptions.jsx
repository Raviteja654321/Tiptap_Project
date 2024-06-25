import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faArrowUp,
} from '@fortawesome/free-solid-svg-icons';

const iconStyle = { color: '#ffffff', fontSize: '1rem' };

const toggleHeaderRow = (editor) => {
    editor.chain().focus().toggleHeaderRow().run();
};

const toggleHeaderColumn = (editor) => {
    editor.chain().focus().toggleHeaderColumn().run();
};

const ToggleHeaderOptions = ({ editor, setShowHeaderOptions }) => {
    return (
        <div className="toggle-header-options">
            <button 
                onClick={() => {
                    toggleHeaderColumn(editor);
                    setShowHeaderOptions(false);
                }} 
                title="Toggle Header Column" 
                style={{ cursor: 'pointer', border: 'none', background: 'none', color: 'white' }}
            >
                <FontAwesomeIcon icon={faArrowLeft} style={iconStyle} /> Toggle Header Column
            </button>
            <button 
                onClick={() => {
                    toggleHeaderRow(editor);
                    setShowHeaderOptions(false);
                }} 
                title="Toggle Header Row" 
                style={{ cursor: 'pointer', border: 'none', background: 'none', color: 'white' }}
            >
                <FontAwesomeIcon icon={faArrowUp} style={iconStyle} /> Toggle Header Row
            </button>
        </div>
    );
};

export default ToggleHeaderOptions;