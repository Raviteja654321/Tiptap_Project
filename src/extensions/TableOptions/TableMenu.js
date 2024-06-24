import { TableMenuPlugin } from "./table-menu-plugin"
import React, { useEffect, useState } from "react"

import { useCurrentEditor } from "@tiptap/react"

export const TableMenu = props => {
    const [element, setElement] = useState(null)
    const { editor: currentEditor } = useCurrentEditor()

    useEffect(() => {
        if (!element) {
            return
        }

        if (props.editor?.isDestroyed || currentEditor?.isDestroyed) {
            return
        }

        const {
            pluginKey = "TableMenu",
            editor,
            tippyOptions = {},
            updateDelay,
            shouldShow = null
        } = props

        const menuEditor = editor || currentEditor

        if (!menuEditor) {
            console.warn(
                "TableMenu component is not rendered inside of an editor component or does not have editor prop."
            )
            return
        }

        const plugin = TableMenuPlugin({
            updateDelay,
            editor: menuEditor,
            element,
            pluginKey,
            shouldShow,
            tippyOptions
        })

        menuEditor.registerPlugin(plugin)
        return () => menuEditor.unregisterPlugin(pluginKey)
    }, [props, props.editor, currentEditor, element])

    return (
        <div
            ref={setElement}
            className={props.className}
            style={{ visibility: "hidden" }}
        >
            {props.children}
        </div>
    )
}
