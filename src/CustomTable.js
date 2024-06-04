import Table from "@tiptap/extension-table";
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';

const CustomTable = Table.extend({
    addAttributes() {
        return {
            color: {
                renderHTML: (attributes) => {
                    return {
                        style: 'border-collapse: collapse; width: 100%;'
                    };
                },
            },
        };
    },
});

const CustomTableRow = TableRow.extend({
    addAttributes() {
        return {
            color: {
                renderHTML: (attributes) => {
                    return {
                        style: 'height: auto;'
                    };
                },
            },
        };
    },
});

const CustomTableCell = TableCell.extend({
    addAttributes() {
        return {
            width: {
                default: '100px',
                renderHTML: (attributes) => {
                    return {
                        style: `
                            border: 1px solid #ced4da;
                            padding: 8px;
                            min-width: ${attributes.width};
                            width: ${attributes.width};
                            position: relative;
                            vertical-align: top;
                            height: 50px; /* Initial height for cells */
                        `
                    };
                },
                parseHTML: (element) => element.style.width.replace('px', '')
            },
            height: {
                default: '50px',
                renderHTML: (attributes) => {
                    return {
                        style: `height: ${attributes.height}`
                    }
                },
                parseHTML: (element) => element.style.width.replace('px', '')
            }
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
                            background-color: #262626;
                            color: #ffffff;
                            font-weight: bold;
                            text-align: center;
                            border: 1px solid #ced4da;
                            padding: 8px;
                            min-width: ${attributes.width};
                            width: ${attributes.width};
                            position: relative;
                            vertical-align: top;
                            height: 50px; /* Initial height for header cells */
                        `
                    };
                },
                parseHTML: (element) => element.style.width.replace('px', '')
            },
        };
    },
});

export { CustomTable, CustomTableRow, CustomTableHeader, CustomTableCell };
