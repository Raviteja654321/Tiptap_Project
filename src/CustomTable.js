import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import Table from '@tiptap/extension-table';
import TableCellNodeView from './TableCellNodeView';
import {undo,redo, history } from '@tiptap/pm/history'
import { ReactNodeViewRenderer } from '@tiptap/react';
import { keymap } from '@tiptap/pm/keymap';


const CustomTable = Table.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            resizable: true,
            HTMLAttributes: {
                style: `
                    border-collapse: collapse;
                    min-width: 100px;
                `,
            },
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
                        border: 2px solid #ced4da;
                        width: 150px;
                    `,
                class: 'table-cell',
            }
        }
    },

    addAttributes() {
        return {
            colwidth: {
                default: null,
                renderHTML: attributes => {
                    return {
                        colwidth: attributes.colwidth,
                        style: attributes.style ? `width: ${attributes.colwidth}px` : null
                    }
                },
                parseHTML: (element) => {
                    const colwidth = element.getAttribute("colwidth");
                    const value = colwidth ? [parseInt(colwidth, 10)] : null;

                    return value;
                },
            },
            backgroundColor: {
                default: null,
                renderHTML: attributes => {
                    return {
                        style: attributes.backgroundColor ? `background-color: ${attributes.backgroundColor}` : null
                    }
                },
                parseHTML: (element) => {
                    const backgroundColor = element.style.backgroundColor;
                    return backgroundColor || null;
                },
            }
        };
    },

    addProseMirrorPlugins() {
        return [
          history(),
          keymap({
            "Mod-z": undo,
            "Mod-y": redo,
          })
        ];
    },
    
    addNodeView() {
        return ReactNodeViewRenderer(TableCellNodeView,{as:'td', style: {
            backgroundColor: 'green',
            
        }});
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
            },
        };
    },
});

export { CustomTable, CustomTableHeader, CustomTableCell };
