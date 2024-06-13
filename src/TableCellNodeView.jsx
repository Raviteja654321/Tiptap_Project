import { NodeViewWrapper, NodeViewContent, ReactRenderer } from '@tiptap/react';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import {
    faFill,
    faEraser,
    faCircle,
    faTrashAlt,
    faArrowUp,
    faArrowDown,
    faArrowLeft,
    faArrowRight,
    faCaretSquareDown,
    faCaretSquareRight,
} from '@fortawesome/free-solid-svg-icons';

const DropdownContent = ({editor}) => {

    const colorOptions = [
        { name: 'White', color: '#ffffff' },
        { name: 'Light Blue', color: '#add8e6' },
        { name: 'Gray', color: '#e0e0e0' },
        { name: 'Pink', color: '#ffc0cb' },
        { name: 'Yellow', color: '#ffff00' },
        { name: 'Blue', color: '#0000ff' },
        { name: 'Black', color: '#000000' },
        { name: 'Orange', color: '#ffa500' },
        { name: 'Violet', color: '#ee82ee' },
    ];

    const clearCell = () => {
        // console.log("before -> from ",from," to ", to);

        editor.chain().focus().command(({ tr }) => {
            // tr.delete(nodeFrom + 2, nodeTo - 2);
            return true;
        }).run();
        // console.log("after -> from ",from," to ", to);
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
    
   return  <ul className="popover-list">
        <li>
            <button onMouseOver={(e) => e.currentTarget.nextElementSibling.style.display = 'block'}>
                <FontAwesomeIcon icon={faFill} style={{ marginRight: '0.5rem' }} />Background Color
            </button>
            <div className="dropdown-colors-container" style={{ display: 'none' }}>
                <ul className="popover-colors">
                    {colorOptions.map(({ name, color }) => (
                        <li key={name}>
                            {/* <button onClick={() => {
                                updateAttributes({ backgroundColor: color });
                                cell.style.backgroundColor = color;
                                console.log(cell);
                            }}>
                                <FontAwesomeIcon icon={faCircle} style={{ color, marginRight: '0.5rem' }} /> {name}
                            </button> */}
                        </li>
                    ))}
                </ul>
            </div>
        </li>
        <li><button onClick={clearCell}><FontAwesomeIcon icon={faEraser} style={{ marginRight: '0.5rem' }} /> Clear Cell</button></li>
        <li><button onClick={deleteRow}><FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '0.5rem' }} /> Delete Row</button></li>
        <li><button onClick={deleteColumn}><FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '0.5rem' }} /> Delete Column</button></li>
        <li><button onClick={addRowBefore}><FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '0.5rem' }} /> Add Row Above</button></li>
        <li><button onClick={addRowAfter}><FontAwesomeIcon icon={faArrowDown} style={{ marginRight: '0.5rem' }} /> Add Row Below</button></li>
        <li><button onClick={addColumnBefore}><FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '0.5rem' }} /> Add Column Left</button></li>
        <li><button onClick={addColumnAfter}><FontAwesomeIcon icon={faArrowRight} style={{ marginRight: '0.5rem' }} /> Add Column Right</button></li>
    </ul>
}

const TableCellNodeView = ({ updateAttributes, editor, selected, getPos, node }) => {
    
    const [isfocused, setIsfocused] = useState(false);
    const [cell,setCell]            = useState(null);
    const dropdownButtonRef         = useRef(null);
    const dropdownContentRef        = useRef(null);
    const { from, to }              = editor.state.selection;
    const nodeFrom                  = getPos();
    const nodeTo                    = nodeFrom + node.nodeSize;

    useEffect(() => {
        setIsfocused(from >= nodeFrom && to <= nodeTo);
    }, [from, to, nodeFrom, nodeTo]);

    

    

    

    useEffect(() => {
        if (dropdownButtonRef.current && isfocused) {
            const renderer = new ReactRenderer(DropdownContent, {props: {editor}, editor});

            const tippyInstance = tippy(dropdownButtonRef.current, {
                appendTo: () => document.body,
                content: renderer.element,
                allowHTML: true,
                trigger: 'click',
                interactive: true,
                placement: 'bottom',
                // onShow(instance) {
                //     console.log("onshow");
                //     console.log(dropdownContentRef);
                //     console.log(dropdownContentRef.current);
                //     console.log(dropdownContentRef.current.style);
                //     console.log(dropdownContentRef.current.style.display);
                    // dropdownContentRef.current.style.display = 'block';
                // },
            });

            return () => {
                tippyInstance.destroy();
            };
        }
    }, [isfocused]);

    return (
        <NodeViewWrapper
            className="react-component-with-content"
            onClick={(e) => {
                setIsfocused(true);
            }}
            onMouseEnter={(event) => {
                if (event.target.tagName === 'DIV') {
                    setCell(event.target);
                }
            }}
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
                    ref={dropdownButtonRef}
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
                    <FontAwesomeIcon icon={ isfocused? faCaretSquareDown: faCaretSquareRight} />
                </button>
            )}
        </NodeViewWrapper>
    );
};

export default TableCellNodeView;
