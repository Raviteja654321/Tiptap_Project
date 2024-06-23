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

                        const addColumnLeft = () => {
                            this.editor.chain().focus().addColumnBefore().run();
                        };

                        const addRowAbove = () => {
                            this.editor.chain().focus().addRowAfter().run();
                        };

                        doc.descendants((node, pos) => {
                            if (node.type.name === "table") {
                                // Display button to the left of each column on hovering between two columns
                                node.firstChild.content.forEach((cell, index) => {
                                    const decoration = Decoration.widget(
                                        pos + 1,
                                        () => {
                                            const button = document.createElement("button");
                                            button.className = 'add-column--button';
                                            button.innerHTML = '<i class="fas fa-plus"></i>';
                                            button.addEventListener("click", event => {
                                                event.preventDefault();
                                                event.stopPropagation();
                                                addColumnLeft();
                                            });

                                            tippy(button, {
                                                content: 'Add column',
                                                placement: 'left',
                                            });

                                            return button;
                                        },
                                        { side: -1 }
                                    );
                                    decorations.push(decoration);
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
