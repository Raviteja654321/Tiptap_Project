import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFill, faEraser, faCircle, faTrashAlt, faArrowUp, faArrowDown, faArrowLeft, faArrowRight, faCaretSquareDown, faCaretSquareRight } from '@fortawesome/free-solid-svg-icons';

const TableCellNodeView = ({ updateAttributes, editor, selected, getPos, getdom, node }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isfocused, setIsfocused] = useState(false);
    const [cell, setCell] = useState(null);
    const [showColors, setShowColors] = useState(false);

    const { from, to } = editor.state.selection;

    const nodeFrom = getPos();
    const nodeTo = nodeFrom + node.nodeSize;
    useEffect(()=>{
        
        console.log("from = ",from, "to = ",to);


        console.log("nodefrom = ",nodeFrom, "nodeto = ",nodeTo);
    },[from,to,nodeFrom,nodeTo])
    

    if(selected)
    {
        console.log("Selected a cell");
    }

    const clearCell = () => {
        console.log("Inside Clearcell", node.content);
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
            onMouseEnter={(event) => {
                setIsfocused(true);
                if (event.target.tagName === 'DIV') {
                    setCell(event.target);
                }
            }}
            onMouseLeave={() => { setIsfocused(false); setShowDropdown(false) }}
            style={{
                display: "flex",
                width: '100%',
                position: 'relative',
                height: 'auto',
            }}>
            <NodeViewContent className="content" style={{ width: '100%', margin: '0', padding: '0' }} />
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
                            {showColors &&
                                <div className="dropdown-colors-container">
                                    <ul className='popover-colors'>
                                        <li>
                                            <button onClick={() => { updateAttributes({ backgroundColor: 'white' }); cell.style.backgroundColor = 'white' }}>
                                                <FontAwesomeIcon icon={faCircle} style={{ color: '#ffffff', marginRight: '0.5rem' }} /> White
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => { updateAttributes({ backgroundColor: 'lightblue' }); cell.style.backgroundColor = 'lightblue' }}>
                                                <FontAwesomeIcon icon={faCircle} style={{ color: '#add8e6', marginRight: '0.5rem' }} /> Light Blue
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => { updateAttributes({ backgroundColor: 'gray' }); cell.style.backgroundColor = 'gray' }}>
                                                <FontAwesomeIcon icon={faCircle} style={{ color: '#e0e0e0', marginRight: '0.5rem' }} /> Gray
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => { updateAttributes({ backgroundColor: 'pink' }); cell.style.backgroundColor = 'pink' }}>
                                                <FontAwesomeIcon icon={faCircle} style={{ color: '#ffc0cb', marginRight: '0.5rem' }} /> Pink
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => { updateAttributes({ backgroundColor: 'yellow' }); cell.style.backgroundColor = 'yellow' }}>
                                                <FontAwesomeIcon icon={faCircle} style={{ color: '#ffff00', marginRight: '0.5rem' }} /> Yellow
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => { updateAttributes({ backgroundColor: 'blue' }); cell.style.backgroundColor = 'blue' }}>
                                                <FontAwesomeIcon icon={faCircle} style={{ color: '#0000ff', marginRight: '0.5rem' }} /> Blue
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => { updateAttributes({ backgroundColor: 'black' }); cell.style.backgroundColor = 'black' }}>
                                                <FontAwesomeIcon icon={faCircle} style={{ color: '#000000', marginRight: '0.5rem' }} /> Black
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => { updateAttributes({ backgroundColor: 'orange' }); cell.style.backgroundColor = 'orange' }}>
                                                <FontAwesomeIcon icon={faCircle} style={{ color: '#ffa500', marginRight: '0.5rem' }} /> Orange
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => { updateAttributes({ backgroundColor: 'violet' }); cell.style.backgroundColor = 'violet' }}>
                                                <FontAwesomeIcon icon={faCircle} style={{ color: '#ee82ee', marginRight: '0.5rem' }} /> Violet
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </li>
                        <li>
                            <button
                                onClick={() => { console.log(cell) }}
                                onMouseEnter={() => setShowColors(false)}
                            >
                                <FontAwesomeIcon icon={faEraser} style={{ marginRight: '0.5rem' }} /> Clear Cell
                            </button>
                        </li>
                        <li>
                            <button onClick={deleteRow}
                                onMouseEnter={() => setShowColors(false)}
                            >
                                <FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '0.5rem' }} /> Delete Row
                            </button>
                        </li>
                        <li>
                            <button onClick={deleteColumn}
                            onMouseEnter={() => setShowColors(false)}
                                    >
                                <FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '0.5rem' }} /> Delete Column
                            </button>
                        </li>
                        <li>
                            <button onClick={addRowBefore}
                            onMouseEnter={() => setShowColors(false)}
                            >
                                <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '0.5rem' }} /> Add Row Above
                            </button>
                        </li>
                        <li>
                            <button onClick={addRowAfter}
                            onMouseEnter={() => setShowColors(false)}
                            >
                                <FontAwesomeIcon icon={faArrowDown} style={{ marginRight: '0.5rem' }} /> Add Row Below
                            </button>
                        </li>
                        <li>
                            <button onClick={addColumnBefore}
                            onMouseEnter={() => setShowColors(false)}
                            >
                                <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '0.5rem' }} /> Add Column Left
                            </button>
                        </li>
                        <li>
                            <button onClick={addColumnAfter}
                            onMouseEnter={() => setShowColors(false)}
                            >
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
