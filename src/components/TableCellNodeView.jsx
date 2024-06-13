import { NodeViewWrapper, NodeViewContent, ReactRenderer } from '@tiptap/react';
import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import {
    faCaretSquareDown,
    faCaretSquareRight,
} from '@fortawesome/free-solid-svg-icons';

import DropdownContent from './DropdownContent';

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

    useEffect(() => {
        if (dropdownButtonRef.current && isfocused) {
            const renderer = new ReactRenderer(DropdownContent, {props: {editor,getPos,node}, editor});

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
