import React, { useEffect, useRef } from 'react';
import tippy from 'tippy.js';
import { BubbleMenu, ReactRenderer } from '@tiptap/react';
import TableDropdownContent from './TableDropdownContent';

const TableOptionsBubbleMenu = ({ editor, parentTable, tableRect, isVisible }) => {
    const bubbleMenuRef = useRef(null);

    useEffect(() => {
        if (bubbleMenuRef.current && isVisible && tableRect) {
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

            const tippyInstance = tippy(bubbleMenuRef.current, {
                appendTo: () => document.body,
                content: renderer.element,
                allowHTML: true,
                trigger: 'manual',
                interactive: true,
                placement: 'bottom',
                getReferenceClientRect: () => ({
                    top: tableRect.bottom,
                    left: tableRect.left,
                    width: tableRect.width,
                    height: 0,
                }),
                offset: [0, 10],
            });

            if (isVisible) {
                tippyInstance.show();
            }

            return () => {
                tippyInstance.destroy();
            };
        }
    }, [editor, parentTable, tableRect, isVisible]);

    if (!isVisible) {
        return null;
    }

    return (
        <BubbleMenu>
            <div ref={bubbleMenuRef}></div>
        </BubbleMenu>
    );
};

export default TableOptionsBubbleMenu;
