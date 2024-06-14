import {faCaretSquareDown}                                 from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon }                                 from '@fortawesome/react-fontawesome';
import                                                          'tippy.js/dist/tippy.css';
import DropdownContent                                     from './DropdownContent';
import { NodeViewWrapper, NodeViewContent, ReactRenderer } from '@tiptap/react';
import tippy                                               from 'tippy.js';
import React, { useEffect, useState, useRef }              from 'react';

const TableCellNodeView = ({editor, getPos, node }) => {
    
    const [isfocused, setIsfocused] = useState(false);
    const [cell,setCell]            = useState();
    const dropdownButtonRef         = useRef(null);
    const { from, to }              = editor.state.selection;
    const nodeFrom                  = getPos();
    const nodeTo                    = nodeFrom + node.nodeSize;

    useEffect(() => {
        setIsfocused(from >= nodeFrom && to <= nodeTo);
    }, [from, to, nodeFrom, nodeTo]);

    // Tippy instance is created
    useEffect(() => {
        if (dropdownButtonRef.current && isfocused) {
            const renderer = new ReactRenderer(DropdownContent, { 
                props: { 
                    editor, 
                    getPos, 
                    node, 
                    cell,
                    closeDropdown: () => {
                        if (tippyInstance) {
                            tippyInstance.hide();
                        }
                    }
                }, 
                editor 
            });

            const tippyInstance = tippy(dropdownButtonRef.current, {
                appendTo: () => document.body,
                content: renderer.element,
                allowHTML: true,
                trigger: 'click',
                interactive: true,
                placement: 'right',
            });

            return () => {
                tippyInstance.destroy();
            };
        }
    }, [isfocused,editor,getPos,node,cell]);


    return (
        <NodeViewWrapper
            className="react-component-with-content"
            onClick={() => {
                setIsfocused(true);
            }}
            onMouseEnter={(event) => {
                if (event.target.tagName === 'DIV') {
                    setCell(event.target);
                }
            }}
            // onMouseLeave={() => { setIsfocused(false)}}
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
                    <FontAwesomeIcon icon={faCaretSquareDown} />
                </button>
            )}
        </NodeViewWrapper>
    );
};

export default TableCellNodeView;
