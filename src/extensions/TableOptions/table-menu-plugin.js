import { posToDOMRect } from "@tiptap/core"
import { Plugin, PluginKey } from "@tiptap/pm/state"
import tippy from "tippy.js"

export class TableMenuView {
    preventHide = false

    findParentClosestToPos = ($pos, predicate) => {
        const depth = $pos.depth;

        for (let i = depth; i > 0; i -= 1) {
            const node = $pos.node(i);
            if (predicate(node)) {
                return { pos: $pos.before(i), node };
            }
        }

        return undefined;
    };

    shouldShow = ({ view, state, from, to }) => {
        return this.editor.isActive('table');
    }

    constructor({
        editor,
        element,
        view,
        tippyOptions = {},
        updateDelay = 250,
        shouldShow
    }) {
        this.editor = editor
        this.element = element
        this.view = view
        this.updateDelay = updateDelay

        if (shouldShow) {
            this.shouldShow = shouldShow
        }

        this.element.addEventListener("mousedown", this.mousedownHandler, {
            capture: true
        })
        this.view.dom.addEventListener("dragstart", this.dragstartHandler)
        this.editor.on("focus", this.focusHandler)
        this.editor.on("blur", this.blurHandler)
        this.tippyOptions = tippyOptions
        this.element.style.visibility = "visible"
    }

    mousedownHandler = () => {
        this.preventHide = true
    }

    dragstartHandler = () => {
        this.hide()
    }

    focusHandler = () => {
        // we use `setTimeout` to make sure `selection` is already updated
        setTimeout(() => this.update(this.editor.view))
    }

    blurHandler = ({ event }) => {
        if (this.preventHide) {
            this.preventHide = false

            return
        }

        if (
            event?.relatedTarget &&
            this.element.parentNode?.contains(event.relatedTarget)
        ) {
            return
        }

        this.hide()
    }

    tippyBlurHandler = event => {
        this.blurHandler({ event })
    }

    createTooltip() {
        const { element: editorElement } = this.editor.options
        const editorIsAttached = !!editorElement.parentElement

        if (this.tippy || !editorIsAttached) {
            return
        }

        this.tippy = tippy(editorElement, {
            duration: 0,
            getReferenceClientRect: null,
            content: this.element,
            interactive: true,
            trigger: "manual",
            placement: "bottom",
            hideOnClick: true,
            ...this.tippyOptions
        })

        // maybe we have to hide tippy on its own blur event as well
        if (this.tippy.popper.firstChild) {
            this.tippy.popper.firstChild.addEventListener(
                "blur",
                this.tippyBlurHandler
            )
        }
    }

    update(view, oldState) {
        const hasValidSelection =
            true

        if (this.updateDelay > 0 && hasValidSelection) {
            this.handleDebouncedUpdate(view, oldState)
            return
        }

        const selectionChanged = !oldState?.selection.eq(view.state.selection)
        const docChanged = !oldState?.doc.eq(view.state.doc)

        this.updateHandler(view, selectionChanged, docChanged, oldState)
    }

    handleDebouncedUpdate = (view, oldState) => {
        const selectionChanged = !oldState?.selection.eq(view.state.selection)
        const docChanged = !oldState?.doc.eq(view.state.doc)

        if (!selectionChanged && !docChanged) {
            return
        }

        if (this.updateDebounceTimer) {
            clearTimeout(this.updateDebounceTimer)
        }

        this.updateDebounceTimer = window.setTimeout(() => {
            this.updateHandler(view, selectionChanged, docChanged, oldState)
        }, this.updateDelay)
    }

    updateHandler = (view, selectionChanged, docChanged, oldState) => {
        const { state, composing } = view
        const { selection } = state

        const isSame = !selectionChanged && !docChanged

        if (composing || isSame) {
            return
        }

        this.createTooltip()

        // support for CellSelections
        const { ranges } = selection
        const from = Math.min(...ranges.map(range => range.$from.pos))
        const to = Math.max(...ranges.map(range => range.$to.pos))

        const shouldShow = this.shouldShow?.({
            editor: this.editor,
            view,
            state,
            oldState,
            from,
            to
        })

        if (!shouldShow) {
            this.hide()

            return
        }

        this.tippy?.setProps({
            getReferenceClientRect:
                this.tippyOptions?.getReferenceClientRect ||
                (() => {
                    const resolvedPos = this.editor.state.doc.resolve(from);
                    const tableNode = this.findParentClosestToPos(resolvedPos, node => node.type.name === 'table');
                    return posToDOMRect(view, tableNode.pos+1, tableNode.pos+ tableNode.node.content.size)
                })
        })

        this.show()
    }

    show() {
        this.tippy?.show()
    }

    hide() {
        this.tippy?.hide()
    }

    destroy() {
        if (this.tippy?.popper.firstChild) {
            this.tippy.popper.firstChild.removeEventListener(
                "blur",
                this.tippyBlurHandler
            )
        }
        this.tippy?.destroy()
        this.element.removeEventListener("mousedown", this.mousedownHandler, {
            capture: true
        })
        this.view.dom.removeEventListener("dragstart", this.dragstartHandler)
        this.editor.off("focus", this.focusHandler)
        this.editor.off("blur", this.blurHandler)
    }
}

export const TableMenuPlugin = options => {
    return new Plugin({
        key:
            typeof options.pluginKey === "string"
                ? new PluginKey(options.pluginKey)
                : options.pluginKey,
        view: view => new TableMenuView({ view, ...options })
    })
}