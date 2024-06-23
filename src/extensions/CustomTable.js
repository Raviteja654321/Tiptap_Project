import Table from '@tiptap/extension-table';
import { Plugin, PluginKey } from "@tiptap/pm/state"
import { Decoration, DecorationSet } from "@tiptap/pm/view"

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
                        const decorations = []

                        const addColumnLeft = () => {
                            this.editor.chain().focus().addColumnBefore().run();
                        }

                        const addRowAbove = () => {
                            this.editor.chain().focus().addRowAfter().run() ;
                        }

                        doc.descendants((node, pos) => {
                            if (node.type.name === "table") {
                                // display button to the left of each column on hovering between two columns
                                node.firstChild.content.forEach((cell, index) => {
                                    const decoration = Decoration.widget(
                                        pos + 1,
                                        () => {
                                            const button = document.createElement("button")
                                            button.className = 'add-column-button'
                                            button.innerHTML = '+'
                                            button.addEventListener("click", event => {
                                                event.preventDefault()
                                                event.stopPropagation()
                                                addColumnLeft()
                                            })
                                            return button
                                        },
                                        { side: -1 }
                                    )
                                    decorations.push(decoration)
                                })

                                // display button to the top of each row on hovering between two rows
                                node.content.forEach((row, rowIndex) => {
                                    row.content.forEach((cell, cellIndex) => {
                                        if (1) {
                                            const decoration = Decoration.widget(
                                                pos + row.pos + 1,
                                                () => {
                                                    const button = document.createElement("button")
                                                    button.className = 'add-row-button'
                                                    button.innerHTML = '+'
                                                    button.onclick = addRowAbove;
                                                    return button
                                                },
                                                { side: -1 }
                                            )
                                            decorations.push(decoration)
                                        }
                                    })
                                })
                            }
                        })

                        return DecorationSet.create(doc, decorations)
                    }
                }
            })
        ]
    }
});

export default CustomTable;
