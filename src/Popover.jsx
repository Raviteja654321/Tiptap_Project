import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFill, faEraser, faTrashAlt, faArrowUp, faArrowDown, faArrowLeft, faArrowRight, faCaretSquareDown ,faCaretSquareRight} from '@fortawesome/free-solid-svg-icons';

const Popover = ({ editor }) => {
    const [showDropdown, setShowDropdown] = useState(false);

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
        <NodeViewWrapper className="react-component-with-content" style={{ display: "flex", width: 'fit-content', position: 'relative' }}>
            <button className="label" onClick={() => setShowDropdown(!showDropdown)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#B7C3CF' }}>
                <FontAwesomeIcon icon={!showDropdown? faCaretSquareDown: faCaretSquareRight} />
            </button>
            {showDropdown &&
                <div className="dropdown-container">
                    <ul className="popover-list">
                        <li>
                            <button onClick={() => handleBackgroundColorChange('#ffffff')}>
                                <FontAwesomeIcon icon={faFill} style={{marginRight: '0.5rem'}}  /> White
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleBackgroundColorChange('#f0f0f0')}>
                                <FontAwesomeIcon icon={faFill} style={{marginRight: '0.5rem'}} /> Light Gray
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleBackgroundColorChange('#e0e0e0')}>
                                <FontAwesomeIcon icon={faFill} style={{marginRight: '0.5rem'}} /> Gray
                            </button>
                        </li>
                        <li>
                            <button onClick={clearCell}>
                                <FontAwesomeIcon icon={faEraser} style={{marginRight: '0.5rem'}} /> Clear Cell
                            </button>
                        </li>
                        <li>
                            <button onClick={deleteRow}>
                                <FontAwesomeIcon icon={faTrashAlt} style={{marginRight: '0.5rem'}} /> Delete Row
                            </button>
                        </li>
                        <li>
                            <button onClick={deleteColumn}>
                                <FontAwesomeIcon icon={faTrashAlt} style={{marginRight: '0.5rem'}} /> Delete Column
                            </button>
                        </li>
                        <li>
                            <button onClick={addRowBefore}>
                                <FontAwesomeIcon icon={faArrowUp} style={{marginRight: '0.5rem'}} /> Add Row Above
                            </button>
                        </li>
                        <li>
                            <button onClick={addRowAfter}>
                                <FontAwesomeIcon icon={faArrowDown} style={{marginRight: '0.5rem'}} /> Add Row Below
                            </button>
                        </li>
                        <li>
                            <button onClick={addColumnBefore}>
                                <FontAwesomeIcon icon={faArrowLeft} style={{marginRight: '0.5rem'}} /> Add Column Left
                            </button>
                        </li>
                        <li>
                            <button onClick={addColumnAfter}>
                                <FontAwesomeIcon icon={faArrowRight} style={{marginRight: '0.5rem'}} /> Add Column Right
                            </button>
                        </li>
                    </ul>
                </div>
            }
            <NodeViewContent className="content" style={{ display: "flex", width: 'fit-content' }} />
        </NodeViewWrapper>
    );
};

export default Popover;
