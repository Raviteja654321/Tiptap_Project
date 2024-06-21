// src/plugins/tablePlugins.js

import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { findParentNode } from 'prosemirror-utils';

const tableDecorationsPluginKey = new PluginKey('tableDecorations');

const tableDecorationsPlugin = new Plugin({
  key: tableDecorationsPluginKey,
  state: {
    init(_, { doc }) {
      return DecorationSet.empty;
    },
    apply(tr, old) {
      return old.map(tr.mapping, tr.doc);
    }
  },
  props: {
    decorations(state) {
      return this.getState(state);
    }
  }
});

const tableHoverPluginKey = new PluginKey('tableHoverPlugin');

const tableHoverPlugin = new Plugin({
  key: tableHoverPluginKey,
  state: {
    init(_, { doc }) {
      return {
        hoverRow: null,
        hoverColumn: null
      };
    },
    apply(tr, old, state) {
      const meta = tr.getMeta(this);
      if (meta) {
        return {
          ...old,
          ...meta
        };
      }
      return old;
    }
  },
  props: {
    handleDOMEvents: {
      mousemove(view, event) {
        const { state, dispatch } = view;
        const { schema, doc } = state;
        const table = findParentNode(node => node.type === schema.nodes.table)(state.selection);

        if (!table) {
          return false;
        }

        const { pos, node: tableNode } = table;
        const rect = view.domAtPos(pos);
        const tableElement = rect.node.closest('table');

        if (!tableElement) {
          return false;
        }

        const cell = event.target.closest('td, th');

        if (!cell) {
          return false;
        }

        const cellRect = cell.getBoundingClientRect();

        let hoverRow = null;
        let hoverColumn = null;

        if (event.clientY < cellRect.top + 5) {
          hoverRow = { pos, index: cell.parentNode.rowIndex - 1 };
        } else if (event.clientY > cellRect.bottom - 5) {
          hoverRow = { pos, index: cell.parentNode.rowIndex };
        }

        if (event.clientX < cellRect.left + 5) {
          hoverColumn = { pos, index: cell.cellIndex - 1 };
        } else if (event.clientX > cellRect.right - 5) {
          hoverColumn = { pos, index: cell.cellIndex };
        }

        if (hoverRow || hoverColumn) {
          const decorations = [];

          if (hoverRow) {
            decorations.push(Decoration.widget(
              cellRect.top + (hoverRow.index + 1) * (cellRect.height / 2),
              createRowButton(view, hoverRow.index),
              { side: -1, key: 'hover-row' }
            ));
          }

          if (hoverColumn) {
            decorations.push(Decoration.widget(
              cellRect.left + (hoverColumn.index + 1) * (cellRect.width / 2),
              createColumnButton(view, hoverColumn.index),
              { side: -1, key: 'hover-column' }
            ));
          }

          dispatch(state.tr.setMeta(tableHoverPluginKey, { hoverRow, hoverColumn }));
          view.dispatch(state.tr.setMeta(tableDecorationsPluginKey, DecorationSet.create(doc, decorations)));

          return true;
        }

        return false;
      },
      mouseleave(view) {
        const { state, dispatch } = view;
        dispatch(state.tr.setMeta(tableHoverPluginKey, { hoverRow: null, hoverColumn: null }));
        dispatch(state.tr.setMeta(tableDecorationsPluginKey, DecorationSet.empty));
        return true;
      }
    }
  }
});

function createRowButton(view, index) {
  const button = document.createElement('button');
  button.textContent = '+';
  button.style.position = 'absolute';
  button.style.left = '0';
  button.style.top = `${index * 24 }px`; 
  button.addEventListener('click', () => addRow(view, index));
  return button;
}

function createColumnButton(view, index) {
  const button = document.createElement('button');
  button.textContent = '+';
  button.style.position = 'absolute';
  button.style.top = '0';
  button.style.left = `${index * 50}px`;
  button.addEventListener('click', () => addColumn(view, index));
  return button;
}

function addRow(view, index) {
  const { state, dispatch } = view;
  const table = findParentNode(node => node.type === state.schema.nodes.table)(state.selection);

  if (!table) {
    return;
  }

  const { tr } = state;
  const { pos, node: tableNode } = table;
  const rowIndex = Math.max(index + 1, 0);
  const row = tableNode.child(rowIndex);

  if (!row) {
    return;
  }

  const cells = [];
  row.forEach(cell => {
    cells.push(state.schema.nodes.table_cell.createAndFill());
  });

  const rowNode = state.schema.nodes.table_row.createAndFill({}, cells);
  tr.insert(pos + rowIndex, rowNode);
  dispatch(tr);
}

function addColumn(view, index) {
  const { state, dispatch } = view;
  const table = findParentNode(node => node.type === state.schema.nodes.table)(state.selection);

  if (!table) {
    return;
  }

  const { tr } = state;
  const { pos, node: tableNode } = table;
  const colIndex = Math.max(index + 1, 0);

  tableNode.forEach((row, offset) => {
    const cell = state.schema.nodes.table_cell.createAndFill();
    tr.insert(pos + offset + colIndex, cell);
  });

  dispatch(tr);
}

export { tableDecorationsPlugin, tableHoverPlugin };
