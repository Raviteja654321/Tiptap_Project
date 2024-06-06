import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import { ReactNodeViewRenderer } from '@tiptap/react';

const CustomTableCell = TableCell.extend({
    addAttributes() {
        return {
            width: {
                default: '100px',
                renderHTML: (attributes) => {
                    return {
                        style: `
                            border: 1px solid #ced4da;
                            position: relative;
                            height: auto;
                        `,
                        class: `table-cell`
                    };
                },
                parseHTML: (element) => element.style.width.replace('px', ''),
            },
        };
    },
});

const CustomTableHeader = TableHeader.extend({
    addAttributes() {
        return {
            width: {
                default: '100px',
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

export { CustomTableHeader, CustomTableCell };