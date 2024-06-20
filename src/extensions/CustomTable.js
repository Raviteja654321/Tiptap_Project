import Table from '@tiptap/extension-table';
import { Plugin } from 'prosemirror-state';

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
        };
    },
    addProseMirrorPlugins() {
        return [
            ...this.parent(),

            /**** Creates a new ProseMirror plugin to handle nested tables. 
            The plugin iterates through the document, deletes nested tables, 
              and returns a transaction if modifications are made *******/

            new Plugin({
                appendTransaction: (transactions, oldState, newState) => {
                    const tr = newState.tr;
                    let modified = false;
                    newState.doc.descendants((node, pos) => {
                        if (node.type.name === 'table') {
                            node.descendants((child, childPos) => {
                                if (child.type.name === 'table') {
                                    tr.delete(childPos + pos, childPos + pos + child.nodeSize);
                                    modified = true;
                                }
                            });
                        }
                    });

                    return modified ? tr : undefined;
                },
            }),
        ];
    },
});

export default CustomTable;