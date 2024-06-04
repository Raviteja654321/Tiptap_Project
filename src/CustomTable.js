import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import React from 'react'

const CustomTableNodeView = (props) => {
  const thStyle = {
    backgroundColor: '#f1f3f5',
    fontWeight: 'bold',
    textAlign: 'left',
    border: '2px solid #ced4da',
  }

  const tdStyle = {
    border: '2px solid #ced4da',
    width: '25%',
  }

  return (
    <NodeViewWrapper className="tableWrapper">
      <table style={{ backgroundColor: 'pink' }}>
        <tbody>
          <tr>
            <th style={thStyle}>Name</th>
            <th colSpan="3" style={thStyle}>Description</th>
          </tr>
          <tr>
            <td style={tdStyle}>Cyndi Lauperrrr</td>
            <td style={tdStyle}>singer</td>
            <td style={tdStyle}>songwriter</td>
            <td style={tdStyle}>actress</td>
          </tr>
        </tbody>
      </table>
    </NodeViewWrapper>
  )
}

const CustomTable = Node.create({
  name: 'customTable',

  group: 'block',

  content: 'block*',

  parseHTML() {
    return [{ tag: 'div.tableWrapper' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { class: 'tableWrapper' }), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(CustomTableNodeView)
  },
})

export default CustomTable
