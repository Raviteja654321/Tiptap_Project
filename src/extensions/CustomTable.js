import Table from '@tiptap/extension-table';
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import '@fortawesome/fontawesome-free/css/all.css';

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
            new Plugin({
                key: new PluginKey("addRowColumnButton"),
                props: {
                    decorations: ({ doc, selection }) => {
                        const decorations = [];
                
                        const addColumnLeft = (pos) => {
                            this.editor.chain().focus(pos).addColumnBefore().run();
                        };
                
                        const addRowAbove = (pos) => {
                            this.editor.chain().focus(pos).addRowBefore().run();
                        };
                
                        doc.descendants((node, pos) => {
                            if (node.type.name === "table") {
                                // Iterate through table rows and columns
                                node.content.forEach((row, rowIndex) => {
                                    row.content.forEach((cell, cellIndex) => {
                                        // Add column button
                                        if (cellIndex === 0) {
                                            const columnButtonDecoration = Decoration.widget(
                                                pos + rowIndex + 1,
                                                () => {
                                                    const button = document.createElement("button");
                                                    button.className = 'add-column-button';
                                                    button.innerHTML = '<i class="fas fa-plus"></i>';
                                                    button.addEventListener("click", event => {
                                                        // event.preventDefault();
                                                        // event.stopPropagation();
                                                        addColumnLeft(pos + rowIndex);
                                                    });
                
                                                    tippy(button, {
                                                        content: 'Add column',
                                                        placement: 'left',
                                                    });
                
                                                    return button;
                                                },
                                                { side: -1 }
                                            );
                                            decorations.push(columnButtonDecoration);
                                        }
                
                                        // Add row button
                                        if (rowIndex === 0) {
                                            const rowButtonDecoration = Decoration.widget(
                                                pos + cellIndex + 1,
                                                () => {
                                                    const button = document.createElement("button");
                                                    button.className = 'add-row-button';
                                                    button.innerHTML = '<i class="fas fa-plus"></i>';
                                                    button.addEventListener("click", event => {
                                                        // event.preventDefault();
                                                        // event.stopPropagation();
                                                        addRowAbove(pos + cellIndex);
                                                    });
                
                                                    tippy(button, {
                                                        content: 'Add row',
                                                        placement: 'top',
                                                    });
                
                                                    return button;
                                                },
                                                { side: -1 }
                                            );
                                            decorations.push(rowButtonDecoration);
                                        }
                                    });
                                });
                            }
                        });
                
                        return DecorationSet.create(doc, decorations);
                    }
                }
            })
        ];
    }
});

export default CustomTable;
