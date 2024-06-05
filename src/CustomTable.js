import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';

const CustomTableCell = TableCell.extend({
    addAttributes() {
        return {
            width: {
                default: '100px',
                renderHTML: (attributes) => {
                    return {
                        style: `
                            border: 1px solid #ced4da;
                            min-width: ${attributes.width};
                            position: relative;
                            vertical-align: top;
                            height: auto;
                        `
                    };
                },
                parseHTML: (element) => element.style.width.replace('px', '')
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
                            margin: 100px;
                            background-color: Black;
                            color: #ffffff;
                            font-weight: bold;
                            text-align: center;
                            border: 1px solid #ced4da;
                            min-width: ${attributes.width};
                            position: relative;
                            vertical-align: top;
                        `
                    };
                },
                parseHTML: (element) => element.style.width.replace('px', '')
            },
        };
    },
});

export { CustomTableHeader, CustomTableCell };