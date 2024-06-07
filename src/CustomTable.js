import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import Table from '@tiptap/extension-table';
import Popover from './Popover';
import { ReactNodeViewRenderer } from '@tiptap/react';

// class NodeSelection extends Selection

const CustomTable = Table.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            border_collapse: {
                default: 'collapse',
                renderHTML: (attributes) => {
                    return {
                        style: `
                            margin: 2rem;
                            border-collapse: ${attributes.border_collapse};
                        `,
                    };
                },
            }
        };
    },
    addOptions() {
        return {
            resizable: true
        }
    }
})

const CustomTableCell = TableCell.extend({
    addAttributes() {
        return {
            width: {
                default: '100px',
                renderHTML: () => ({
                    style: `
                        border: 1px solid #ced4da;
                        position: relative;
                        height: auto;
                    `,
                    class: 'table-cell content',
                }),
                parseHTML: (element) => element.style.width.replace('px', ''),
            },
        };
    },
    
    addNodeView() {
        return ReactNodeViewRenderer(Popover,{as:'td'});
    }  
});

const CustomTableHeader = TableHeader.extend({
    addAttributes() {
        return {
            width: {
                default: '150px',
                renderHTML: (attributes) => {
                    return {
                        style: `
                            background-color: #2D323B;
                            color: #ffffff;
                            font-weight: bold;
                            text-align: center;
                            border: 1px solid #ced4da;
                            position: relative;
                            width: ${attributes.width};
                        `
                    };
                },
                parseHTML: (element) => element.style.width.replace('px', '')
            },
        };
    },
});

export { CustomTable, CustomTableHeader, CustomTableCell };
