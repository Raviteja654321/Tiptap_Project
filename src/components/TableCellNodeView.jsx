import React, { useEffect, useState, useRef } from 'react';
import tippy from 'tippy.js';
import { NodeViewWrapper, NodeViewContent, ReactRenderer } from '@tiptap/react';
import DropdownContent from './DropdownContent';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';

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
    const [cell, setCell] = useState(null);
    const dropdownButtonRef = useRef(null);
    const [parentTable, setParentTable] = useState(null);

    const { from, to } = editor.state.selection;
    const nodeFrom = getPos();
    const nodeTo = nodeFrom + node.nodeSize;

    useEffect(() => {
        const isNodeFocused = from >= nodeFrom && to <= nodeTo;
        setIsFocused(isNodeFocused);

        if (isNodeFocused) {
            const resolvedPos = editor.state.doc.resolve(nodeFrom);
            const tableNode = findParentClosestToPos(resolvedPos, node => node.type.name === 'table');
            if (tableNode) {
                setParentTable(tableNode.node);
                console.log("Table is => ",parentTable);
            }
        }
    }, [editor, from, to, nodeFrom, nodeTo]);

    // Tippy instance is created
    useEffect(() => {
        if (dropdownButtonRef.current && isFocused) {
            const renderer = new ReactRenderer(DropdownContent, {
                props: {
                    editor,
                    getPos,
                    node,
                    cell,
                    parentTable,
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
    }, [isFocused, editor, getPos, node, cell, parentTable]);

    return (
        <NodeViewWrapper
            className="react-component-with-content"
            onClick={() => {
                setIsFocused(true);
            }}
            onMouseEnter={(event) => {
                if (event.target.tagName === 'DIV') {
                    setCell(event.target);
                }
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
            }}>
            <NodeViewContent className="content" style={{ width: '100%', margin: '0', padding: '0' }} />
            {isFocused && (
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
