import React, { useEffect, useState, useRef } from 'react';
import tippy from 'tippy.js';
import { NodeViewWrapper, NodeViewContent, ReactRenderer } from '@tiptap/react';
import DropdownContent from './DropdownContent';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

// Helper function to find the parent node
const findParentClosestToPos = ($pos, predicate) => {
    const depth = $pos.depth;

    for (let i = depth; i > 0; i -= 1) {
        const node = $pos.node(i);
        if (predicate(node)) {
            return { pos: $pos.before(i), node };
        }
    }

    return undefined;
};

const TableCellNodeView = ({ editor, getPos, node }) => {
    const [isFocused, setIsFocused] = useState(false);
    const dropdownButtonRef = useRef(null);
    const [parentTable, setParentTable] = useState(null);

    const { from, to } = editor.state.selection;
    const nodeFrom = getPos();
    const nodeTo = nodeFrom + node.nodeSize;

    useEffect(() => {
        const isNodeFocused = (from >= nodeFrom && to <= nodeTo);
        setIsFocused(isNodeFocused);

        if (isNodeFocused) {
            const resolvedPos = editor.state.doc?.resolve(nodeFrom);
            const tableNode = (resolvedPos) ? findParentClosestToPos(resolvedPos, node => node.type.name === 'table'): null ;
            if (tableNode) {
                setParentTable(tableNode);
            }
        }
    }, [editor, from, to, nodeFrom, nodeTo]);

    // Tippy instance for cell dropdown
    useEffect(() => {
        let tippyInstance;
        if (dropdownButtonRef.current && isFocused) {
            const renderer = new ReactRenderer(DropdownContent, {
                props: {
                    editor,
                    getPos,
                    node,
                    parentTable,
                    closeDropdown: () => {
                        if (tippyInstance) {
                            tippyInstance.hide();
                        }
                    }
                },
                editor
            });

            tippyInstance = tippy(dropdownButtonRef.current, {
                appendTo: () => document.body,
                content: renderer.element,
                allowHTML: true,
                trigger: 'click',
                interactive: true,
                placement: 'bottom',
            });

            return () => {
                if (renderer) {
                    renderer.destroy();
                }
                if (tippyInstance) {
                    tippyInstance.destroy();
                }
            };
        }
    }, [isFocused, editor, getPos, node, parentTable]);

    return (
        <NodeViewWrapper
            className="react-component-with-content"
            onClick={() => {
                setIsFocused(true);
            }}
            onMouseEnter={(event) => {
                setIsFocused(from >= nodeFrom && to <= nodeTo);
            }}
            onMouseLeave={() => {
                setIsFocused(from >= nodeFrom && to <= nodeTo);
            }}
            style={{
                display: "flex",
                width: '100%',
                position: 'relative',
                height: 'auto',
                backgroundColor: node.attrs.backgroundColor || 'transparent',
            }}>
            <NodeViewContent className="content" style={{ width: '100%', margin: '0', padding: '0' }} />
            {isFocused && (
                <>
                    <button
                        className="label"
                        title='cell options'
                        ref={dropdownButtonRef}
                        style={{
                            background: '#F3F7EC',
                            border: 'none',
                            borderRadius: '3px',
                            padding: '0px',
                            margin: '0px',
                            cursor: 'pointer',
                            color: '#000000',
                            position: 'absolute',
                            right: '5px',
                            top: '5px',
                        }}
                    >
                        <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                </>
            )}
        </NodeViewWrapper>
    );
};

export default TableCellNodeView;
