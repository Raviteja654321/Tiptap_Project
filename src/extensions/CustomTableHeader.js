import TableHeader from '@tiptap/extension-table-header';

const CustomTableHeader = TableHeader.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            HTMLAttributes: {
                style: `
                    background-color: #2D323B;
                    color: #ffffff;
                    font-weight: bold;
                    text-align: center;
                    border: 2px solid #CFD5DA;
                    position: relative;
                    height: 50px;
                    width: 150px;
                `
            }
        };
    },

    addAttributes() {
        return {
            width: {
                default: '150px',
                renderHTML: (attributes) => {
                    return {
                        style: `
                            width: ${attributes.width};
                        `
                    };
                },
            },
        };
    },
});

export default CustomTableHeader;
