import { Node } from '@tiptap/core';
import { Plugin } from 'prosemirror-state';

const CustomExtension = Node.create({
  name: 'customExtension',

  // Adding custom options
  addOptions() {
    return {
      customOption: 'default value',
      customFlag: true, // Adding a flag to demonstrate option usage
    };
  },

  // Adding custom attributes
  addAttributes() {
    return {
      customAttribute: {
        default: 'default attribute',
        renderHTML: attributes => {
          return { 'data-custom-attribute': attributes.customAttribute };
        },
      },
      color: {
        default: null,
        parseHTML: element => element.getAttribute('data-color'),
        renderHTML: attributes => {
          if (!attributes.color) {
            return {style: `color: red`};
          }
          return { 'data-color': attributes.color, style: `color: ${attributes.color}` };
        },
      },
    };
  },

  // Adding keyboard shortcuts
  addKeyboardShortcuts() {
    return {
      'Mod-k': () => {
        if (this.options.customFlag) {
          alert(`Keyboard Shortcut Activated with customOption: ${this.options.customOption}`);
        } else {
          alert('Keyboard Shortcut Activated without customOption');
        }
        return true;
      },
      'Mod-Shift-c': () => this.editor.commands.toggleCustomExtension(), // Example shortcut for toggling
    };
  },

  // Adding ProseMirror plugins
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleClick: (view, pos, event) => {
            if (this.options.customFlag) {
              console.log(`ProseMirror Plugin: You clicked in the editor at position ${pos} with customOption: ${this.options.customOption}`);
            } else {
              console.log(`ProseMirror Plugin: You clicked in the editor at position ${pos}`);
            }
            return false;
          },
        },
      }),
    ];
  },

  // Specifying the node type schema
  group: 'block',
  content: 'inline*',
  parseHTML() {
    return [
      {
        tag: 'div[data-type="customExtension"]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-type': 'customExtension', ...HTMLAttributes }, 0];
  },

  // Adding commands for the extension
  addCommands() {
    return {
      setCustomExtension: () => ({ commands }) => {
        return commands.insertContent('<h1 data-type="customExtension">Custom Node</h1>');
      },
      toggleCustomExtension: () => ({ commands }) => {
        return commands.toggleNode('customExtension', 'heading');
      },
    };
  },
});

export default CustomExtension;
