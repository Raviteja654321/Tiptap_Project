import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import Table from '@tiptap/extension-table';
import Popover from './Popover';
import {undo,redo, history } from '@tiptap/pm/history'
import { ReactNodeViewRenderer } from '@tiptap/react';
import { keymap } from '@tiptap/pm/keymap';


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

const CustomTableCell = TableCell.extend({
    
    addOptions() {
        return {
            HTMLAttributes: {
                style: `
                        position: relative;
                        height: 20px;
                        border: 2px solid #ced4da
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

    addProseMirrorPlugins() {
        return [
          history(),
          keymap({"Mod-z": undo, "Mod-y": redo})
          
          // …
        ]
      },
    
    addNodeView() {
        return ReactNodeViewRenderer(Popover,{as:'td'});
    }  
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

export { CustomTable, CustomTableHeader, CustomTableCell };
