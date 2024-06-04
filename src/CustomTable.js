import { Node, mergeAttributes } from '@tiptap/core'

const CustomTable = Node.create({
  name: 'table',

  addOptions() {
    return {
      HTMLAttributes: {
        style: "border-collapse: collapse; margin: 0; overflow: hidden; table-layout: fixed; width: 100%;",
      },
    }
  },

  content: 'tableRow+',

  tableRole: 'table',

  isolating: true,

  parseHTML() {
    return [{ tag: 'table' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['table', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },
})

const CustomTableRow = Node.create({
  name: 'tableRow',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  content: 'tableCell+',

  tableRole: 'row',

  parseHTML() {
    return [{ tag: 'tr' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['tr', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },
})

const CustomTableHeader = Node.create({
  name: 'tableHeader',

  addOptions() {
    return {
      HTMLAttributes: {
        style: "background-color: #f1f3f5; font-weight: bold; text-align: left; border: 2px solid #ced4da; box-sizing: border-box; min-width: 1em; padding: 3px 5px; position: relative; vertical-align: top;",
      },
    }
  },

  content: 'inline*',

  tableRole: 'header_cell',

  isolating: true,

  parseHTML() {
    return [{ tag: 'th' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['th', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },
})

const CustomTableCell = Node.create({
  name: 'tableCell',

  addOptions() {
    return {
      HTMLAttributes: {
        style: "border: 2px solid #ced4da; box-sizing: border-box; min-width: 1em; padding: 3px 5px; position: relative; vertical-align: top;",
      },
    }
  },

  content: 'inline*',

  tableRole: 'cell',

  isolating: true,

  parseHTML() {
    return [{ tag: 'td' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['td', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },
})

export { CustomTable, CustomTableRow, CustomTableHeader, CustomTableCell }
