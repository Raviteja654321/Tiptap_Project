import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import Table from '@tiptap/extension-table';
import './styles.css'
import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFill, faEraser, faTrashAlt, faArrowUp, faArrowDown, faArrowLeft, faArrowRight, faCaretSquareDown, faCaretSquareRight } from '@fortawesome/free-solid-svg-icons';


const CustomTable = Table.extend({

    addOptions() {
        return {
            resizable: true,
            HTMLAttributes: {
                style: `
                    border-collapse: collapse;
                `,
            },
            allowTableNodeSelection: true,
        }
    }
})

const CustomTableRow = TableRow.extend({

    addOptions() {
        return {
            HTMLAttributes: {
                style: `
                    border-collapse: collapse;
                `,
            }
        }
    }
})

const CustomTableCell = TableCell.extend({

    addOptions() {
        return {
            HTMLAttributes: {
                style: `
                        position: relative;
                        height: 20px;
                        border: 1px solid #ced4da
                    `,
                class: 'table-cell',
            }
        }
    },

    addAttributes() {
        return {
            width: {
                default: '150px',
                renderHTML: (attributes) => ({
                    style: `
                        width: ${attributes.width};
                    `,
                }),
                parseHTML: (element) => element.style.width.replace('px', ''),
            },
            colwidth: {
                default: null,
                parseHTML: (element) => {
                    const colwidth = element.getAttribute("colwidth");
                    const value = colwidth ? [parseInt(colwidth, 10)] : null;

                    return value;
                },
                renderHTML: attributes => {
                    return {
                        colwidth: attributes.colwidth,
                        style: attributes.style ? `width: ${attributes.colwidth}px` : null
                    }
                }
            },
        };
    },

    addNodeView() {
        // return (props) =>
        //     ReactNodeViewRenderer(Popover, {
        //         as: 'td',
        //         attrs: props.node.attrs,
        //     })(props);

        return () => {
            const container = document.createElement('td')
            container.style.border = '1px solid #ced4da';
            container.addEventListener('click', event => {
                console.log("cell is cliced!");
            })

            const content = document.createElement('p');
            const showDropdown=false;
            const dropdownbutton = document.createElement('button');
            dropdownbutton.innerHTML = ">"
            dropdownbutton.className = "dropdown-button";
            dropdownbutton.onclick(()=>{
                showDropdown=!showDropdown;
            })

            // Create the dropdown menu
            const dropdownMenu = document.createElement('div');
            dropdownMenu.className = 'dropdown-menu';

            const menuList = document.createElement('ul');
            const options = ['Background Color', 'Clear Cell', 'Delete Row','Delete Column','Add Row Above', 'Add Row Below','Add Column Left','Add Column Right'];

            options.forEach(option => {
                const listItem = document.createElement('li');
                listItem.textContent = option;
                listItem.onclick = () => {
                    console.log(`${option} clicked`); // Handle option click
                    dropdownMenu.classList.remove('show'); // Hide dropdown after selection
                };
                menuList.appendChild(listItem);
            });

            dropdownMenu.appendChild(menuList);
            container.appendChild(dropdownbutton);
            container.appendChild(dropdownMenu);

            // Toggle dropdown menu visibility
            dropdownbutton.onclick = () => {
                dropdownMenu.classList.toggle('show');
            };
            container.append(content)

            return {
                dom: container,
                contentDOM: content,
            }
        };
    }
});

const CustomTableHeader = TableHeader.extend({
    addOptions() {
        return {
            HTMLAttributes: {
                style: `
                    background-color: #2D323B;
                    color: #ffffff;
                    font-weight: bold;
                    text-align: center;
                    border: 1px solid #ced4da;
                    position: relative;
                    height:20px;
                `
            }
        }
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
                parseHTML: (element) => element.style.width.replace('px', '')
            },
        };
    },

});

export { CustomTable, CustomTableRow, CustomTableHeader, CustomTableCell };
