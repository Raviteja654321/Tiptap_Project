import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import Table from '@tiptap/extension-table';
import Popover from './Popover';
import { ReactNodeViewRenderer } from '@tiptap/react';

// class NodeSelection extends Selection

const CustomTable = Table.extend({

    addOptions() {
        return {
            resizable: true,
            HTMLAttributes: {
                style: `
                    border-collapse: collapse;
                `,
            },
            allowTableNodeSelection: true,
        }
    }
})

const CustomTableRow = TableRow.extend({

    addOptions() {
        return {
            HTMLAttributes: {
                style: `
                    border-collapse: collapse;
                `,
            }
        }
    }
})

const CustomTableCell = TableCell.extend({

    addOptions() {
        return {
            HTMLAttributes: {
                style: `
                        position: relative;
                        height: 20px;
                        border: 1px solid #ced4da
                    `,
                class: 'table-cell',
            }
        }
    },

    addAttributes() {
        return {
            width: {
                default: '150px',
                renderHTML: (attributes) => ({
                    style: `
                        width: ${attributes.width};
                    `,
                }),
                parseHTML: (element) => element.style.width.replace('px', ''),
            },
            colwidth: {
                default: null,
                parseHTML: (element) => {
                    const colwidth = element.getAttribute("colwidth");
                    const value = colwidth ? [parseInt(colwidth, 10)] : null;

                    return value;
                },
                renderHTML: attributes => {
                    return {
                        colwidth: attributes.colwidth,
                        style: attributes.style ? `width: ${attributes.colwidth}px` : null
                    }
                }
            },
        };
    },

    addNodeView() {
        // return (props) =>
        //     ReactNodeViewRenderer(Popover, {
        //         as: 'td',
        //         attrs: props.node.attrs,
        //     })(props);
        return () => {
            const container = document.createElement('td')
            container.style.border = '1px solid #ced4da';
            container.addEventListener('click', event => {
                console.log("cell is cliced!");
            })

            const content = document.createElement('p')
            container.append(content)

            return {
                dom: container,
                contentDOM: content,
            }
        }
    },

});

const CustomTableHeader = TableHeader.extend({
    addOptions() {
        return {
            HTMLAttributes: {
                style: `
                    background-color: #2D323B;
                    color: #ffffff;
                    font-weight: bold;
                    text-align: center;
                    border: 1px solid #ced4da;
                    position: relative;
                    height:20px;
                `
            }
        }
    },
    addAttributes() {
        return {
            width: {
                default: '150px',
                renderHTML: (attributes) => {
                    return {
                        style: `
                            width: ${attributes.width};
                        `
                    };
                },
                parseHTML: (element) => element.style.width.replace('px', '')
            },
        };
    },

});

export { CustomTable, CustomTableRow, CustomTableHeader, CustomTableCell };
