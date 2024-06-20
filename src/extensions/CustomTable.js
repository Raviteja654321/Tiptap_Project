import Table from '@tiptap/extension-table';
import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

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
            // Plugin to remove nested tables
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
            new Plugin({
                props: {
                    decorations(state) {
                        const { doc, selection } = state;
                        const { from, to } = selection;
                        const decorations = [];

                        // Check if the selection is within a table
                        let isTableSelected = false;
                        let tablePos = null;
                        doc.nodesBetween(from, to, (node, pos) => {
                            if (node.type.name === 'table') {
                                isTableSelected = true;
                                tablePos = pos;
                                return false;
                            }
                        });

                        if (isTableSelected && tablePos !== null) {
                            const tableNode = doc.nodeAt(tablePos);
                            if (tableNode) {
                                // Create a button decoration below the table
                                const button = document.createElement('button');
                                button.className = 'table-action-button';
                                button.innerText = 'Table Action';
                                button.addEventListener('click', () => {
                                    alert('Table Action Clicked!');
                                });

                                const decoration = Decoration.widget(tablePos + tableNode.nodeSize, button, { side: 3 });
                                decorations.push(decoration);
                            }
                        }

                        return DecorationSet.create(doc, decorations);
                    },
                },
            }),
        ];
    },
});

export default CustomTable;
