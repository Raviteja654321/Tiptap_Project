import React, { useEffect, useRef } from 'react';
import tippy from 'tippy.js';
import { BubbleMenu, ReactRenderer } from '@tiptap/react';
import TableDropdownContent from './TableDropdownContent';
import 'tippy.js/dist/tippy.css';

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
