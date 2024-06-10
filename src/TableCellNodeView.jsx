import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFill, faEraser,faCircle, faTrashAlt, faArrowUp, faArrowDown, faArrowLeft, faArrowRight, faCaretSquareDown, faCaretSquareRight } from '@fortawesome/free-solid-svg-icons';

const TableCellNodeView = ({ editor, selected }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isfocused, setIsfocused] = useState(false);
    const [showColors, setShowColors] = useState(false);

    const handleBackgroundColorChange = (color) => {
        editor.chain().focus().setCellAttribute('backgroundColor', color).run();
    };

    const clearCell = () => {
        editor.chain().focus().deleteSelection().run();
    };

    const deleteRow = () => {
        editor.chain().focus().deleteRow().run();
    };

    const deleteColumn = () => {
        editor.chain().focus().deleteColumn().run();
    };

    const addRowBefore = () => {
        editor.chain().focus().addRowBefore().run();
    };

    const addRowAfter = () => {
        editor.chain().focus().addRowAfter().run();
    };

    const addColumnBefore = () => {
        editor.chain().focus().addColumnBefore().run();
    };

    const addColumnAfter = () => {
        editor.chain().focus().addColumnAfter().run();
    };

    return (
        <NodeViewWrapper
            className="react-component-with-content"
            onMouseEnter={() => setIsfocused(true)}
            onMouseLeave={() => { setIsfocused(false); setShowDropdown(false) }}
            style={{
                display: "flex",
                width: '100%',
                position: 'relative',
                height: 'auto',
                backgroundColor: 'green'
            }}>
            <NodeViewContent className="content" style={{ display: "flex", width: 'fit-content', margin: '0', padding: '0' }} />
            {isfocused && (
                <button
                    className="label"
                    onClick={() => setShowDropdown(!showDropdown)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#B7C3CF',
                        width: 'fit-content',
                        position: 'absolute',
                        right: '0px'
                    }}
                >
                    <FontAwesomeIcon icon={!showDropdown ? faCaretSquareDown : faCaretSquareRight} />
                </button>
            )}
            {showDropdown && (
                <div className="dropdown-container">
                    <ul className="popover-list">
                        <li>
                            <button
                                onMouseEnter={() => setShowColors(true)}
                            >
                                <FontAwesomeIcon icon={faFill} style={{ marginRight: '0.5rem' }} />Background Color 
                            </button>
                            {
                                showColors &&
                                <div className="dropdown-colors-container">
                                    <ul className='popover-colors'>
                                        <li>
                                            <button onClick={() => handleBackgroundColorChange('#ffffff')}>
                                                <FontAwesomeIcon icon={faCircle} style={{ color: '#ffffff', marginRight: '0.5rem' }} /> White
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleBackgroundColorChange('#add8e6')}>
                                                <FontAwesomeIcon icon={faCircle} style={{ color: '#add8e6', marginRight: '0.5rem' }} /> Light Blue
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleBackgroundColorChange('#e0e0e0')}>
                                                <FontAwesomeIcon icon={faCircle} style={{ color: '#e0e0e0', marginRight: '0.5rem' }} /> Gray
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleBackgroundColorChange('#ffc0cb')}>
                                                <FontAwesomeIcon icon={faCircle} style={{ color: '#ffc0cb', marginRight: '0.5rem' }} /> Pink
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleBackgroundColorChange('#ffff00')}>
                                                <FontAwesomeIcon icon={faCircle} style={{ color: '#ffff00', marginRight: '0.5rem' }} /> Yellow
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleBackgroundColorChange('#0000ff')}>
                                                <FontAwesomeIcon icon={faCircle} style={{ color: '#0000ff', marginRight: '0.5rem' }} /> Blue
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleBackgroundColorChange('#000000')}>
                                                <FontAwesomeIcon icon={faCircle} style={{ color: '#000000', marginRight: '0.5rem' }} /> Black
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleBackgroundColorChange('#ffa500')}>
                                                <FontAwesomeIcon icon={faCircle} style={{ color: '#ffa500', marginRight: '0.5rem' }} /> Orange
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleBackgroundColorChange('#ee82ee')}>
                                                <FontAwesomeIcon icon={faCircle} style={{ color: '#ee82ee', marginRight: '0.5rem' }} /> Violet
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </li>
                        <li>
                            <button
                                onClick={clearCell}
                                onMouseEnter={() => setShowColors(false)}
                            >
                                <FontAwesomeIcon icon={faEraser} style={{ marginRight: '0.5rem' }} /> Clear Cell
                            </button>
                        </li>
                        <li>
                            <button onClick={deleteRow}>
                                <FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '0.5rem' }} /> Delete Row
                            </button>
                        </li>
                        <li>
                            <button onClick={deleteColumn}>
                                <FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '0.5rem' }} /> Delete Column
                            </button>
                        </li>
                        <li>
                            <button onClick={addRowBefore}>
                                <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '0.5rem' }} /> Add Row Above
                            </button>
                        </li>
                        <li>
                            <button onClick={addRowAfter}>
                                <FontAwesomeIcon icon={faArrowDown} style={{ marginRight: '0.5rem' }} /> Add Row Below
                            </button>
                        </li>
                        <li>
                            <button onClick={addColumnBefore}>
                                <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '0.5rem' }} /> Add Column Left
                            </button>
                        </li>
                        <li>
                            <button onClick={addColumnAfter}>
                                <FontAwesomeIcon icon={faArrowRight} style={{ marginRight: '0.5rem' }} /> Add Column Right
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </NodeViewWrapper>
    );
};

export default TableCellNodeView;
