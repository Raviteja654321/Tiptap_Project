import React, { useEffect, useRef } from 'react';
import tippy from 'tippy.js';
import { BubbleMenu, ReactRenderer } from '@tiptap/react';
import TableDropdownContent from './TableDropdownContent';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { TableMap } from 'prosemirror-tables'; // Import TableMap
import 'tippy.js/dist/tippy.css';

// Ensure findParentClosestToPos is imported or defined here
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

const createAddButtons = (editor, getPos) => {
    const decorations = [];
    const tableNode = findParentClosestToPos(editor.state.doc.resolve(getPos()), node => node.type.name === 'table');

    if (tableNode) {
        const table = tableNode.node;
        const map = TableMap.get(table);

        // Add buttons between rows
        for (let row = 0; row < map.height; row++) {
            const pos = map.positionAt(row, 0, table);
            decorations.push(Decoration.widget(pos - 1, () => {
                const button = document.createElement('button');
                button.className = 'add-row-button';
                button.innerHTML = '<i class="fas fa-plus"></i>';
                button.addEventListener('click', () => {
                    editor.chain().focus().addRowAfter().run();
                });
                return button;
            }));
        }

        // Add buttons between columns
        for (let col = 0; col < map.width; col++) {
            const pos = map.positionAt(0, col, table);
            decorations.push(Decoration.widget(pos - 1, () => {
                const button = document.createElement('button');
                button.className = 'add-column-button';
                button.innerHTML = '<i class="fas fa-plus"></i>';
                button.addEventListener('click', () => {
                    editor.chain().focus().addColumnAfter().run();
                });
                return button;
            }));
        }
    }

    return DecorationSet.create(editor.state.doc, decorations);
};

const TableOptionsBubbleMenu = ({ editor, parentTable, isVisible, getPos }) => { // Added getPos here
    const bubbleMenuRef = useRef(null);

    useEffect(() => {
        let tippyInstance;

        if (bubbleMenuRef.current && isVisible && parentTable) {
            const renderer = new ReactRenderer(TableDropdownContent, {
                props: {
                    editor,
                    parentTable,
                    closeDropdown: () => {
                        if (tippyInstance) {
                            tippyInstance.hide();
                        }
                    }
                },
                editor
            });

            tippyInstance = tippy(bubbleMenuRef.current, {
                appendTo: () => document.body,
                content: renderer.element,
                allowHTML: true,
                trigger: 'manual',
                interactive: true,
                placement: 'bottom',
                getReferenceClientRect: () => {
                    const dom = editor.view.domAtPos(parentTable.pos + 1).node;
                    if (dom) {
                        const rect = dom.getBoundingClientRect();
                        return {
                            top: rect.bottom,
                            left: rect.left,
                            width: rect.width,
                            height: 0,
                        };
                    }
                    return null;
                },
                offset: [0, 10],
            });

            if (isVisible) {
                tippyInstance.show();
            }

            return () => {
                if (renderer) {
                    renderer.destroy();
                }
                if (tippyInstance) {
                    tippyInstance.destroy();
                }
            };
        }
    }, [editor, parentTable, isVisible]);

    useEffect(() => {
        if (isVisible) {
            const decorations = createAddButtons(editor, getPos);
            editor.view.dispatch(editor.state.tr.setMeta('add-buttons', decorations));
        }
    }, [isVisible, editor, getPos]);

    if (!isVisible) {
        return null;
    }

    return (
        <BubbleMenu editor={editor}>
            <div ref={bubbleMenuRef}></div>
        </BubbleMenu>
    );
};

export default TableOptionsBubbleMenu;
