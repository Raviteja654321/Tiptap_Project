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
                
                        const addColumnRight = (pos) => {
                            this.editor.chain().focus().addColumnAfter(pos).run();
                        };
                
                        const addRowAbove = (pos) => {
                            this.editor.chain().focus().addRowAfter(pos).run();
                        };
                
                        doc.descendants((node, pos) => {
                            if (node.type.name === "table") {
                                // Iterate through table rows and columns
                                node.content.forEach((row, rowIndex) => {
                                    row.content.forEach((cell, cellIndex) => {
                                        // Add row button
                                        if (cellIndex === 0) {
                                            const rowButtonDecoration = Decoration.widget(
                                                pos + cell.nodeSize + rowIndex + 1,
                                                () => {
                                                    const button = document.createElement("button");
                                                    button.className = 'add-row-button';
                                                    button.innerHTML = '<div class="dot"></div>'; // Initially display a dot
                                                    button.addEventListener("click", event => {
                                                        event.preventDefault();
                                                        event.stopPropagation();
                                                        addRowAbove(pos + rowIndex);
                                                    });
    
                                                    button.addEventListener('mouseenter', () => {
                                                        button.innerHTML = '<i class="fas fa-plus"></i>'; // Change to plus icon on hover
                                                    });
    
                                                    button.addEventListener('mouseleave', () => {
                                                        button.innerHTML = '<div class="dot"></div>'; // Revert back to dot on mouse leave
                                                    });
    
                                                    tippy(button, {
                                                        content: 'Add row',
                                                        placement: 'left',
                                                    });
    
                                                    return button;
                                                },
                                                { side: -1 }
                                            );
                                            decorations.push(rowButtonDecoration);
                                        }
                
                                        // Add column button
                                        if (rowIndex === 0) {
                                            const columnButtonDecoration = Decoration.widget(
                                                pos + cell.nodeSize + cellIndex + 1,
                                                () => {
                                                    const button = document.createElement("button");
                                                    button.className = 'add-column-button';
                                                    button.innerHTML = '<div class="dot"></div>'; // Initially display a dot
                                                    button.addEventListener("click", event => {
                                                        event.preventDefault();
                                                        event.stopPropagation();
                                                        addColumnRight(pos + cellIndex);
                                                    });
    
                                                    button.addEventListener('mouseenter', () => {
                                                        button.innerHTML = '<i class="fas fa-plus"></i>'; // Change to plus icon on hover
                                                    });
    
                                                    button.addEventListener('mouseleave', () => {
                                                        button.innerHTML = '<div class="dot"></div>'; // Revert back to dot on mouse leave
                                                    });
    
                                                    tippy(button, {
                                                        content: 'Add column',
                                                        placement: 'top',
                                                    });
    
                                                    return button;
                                                },
                                                { side: -1 }
                                            );
                                            decorations.push(columnButtonDecoration);
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
