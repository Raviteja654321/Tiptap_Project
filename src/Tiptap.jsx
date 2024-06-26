import './styles.css';
import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Gapcursor from '@tiptap/extension-gapcursor';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { TableMenu } from './extensions/TableMenu/TableMenu';
import CustomTable from './extensions/CustomTable';
import CustomTableHeader from './extensions/CustomTableHeader';
import CustomTableCell from './extensions/CustomTableCell';
import TableMenuExtension from './extensions/TableMenu/TableMenuExtension';
import { TableOptions, findParentClosestToPos } from './components/TableOptions';

const tableWrapperStyles = {
    border: '2px solid #ced4da',
    padding: '0px',
    overflowX: 'auto',
    fontFamily: 'bogle',
};

const Tiptap = () => {
    const [htmlContent, setHtmlContent] = useState('');

    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            Gapcursor,
            CustomTable,
            TableRow,
            TableHeader,
            CustomTableHeader,
            TableCell,
            CustomTableCell,
            TableMenuExtension,
        ],
        content: `
            <p>Hey There!! ...</p>
            <p></p>       

            <table>
                <tr>
                    <th>Name</th>
                    <th>Place</th>
                    <th>Animal</th>
                    <th>Thing</th>
                </tr>
                <tr>
                    <td>John Doe</td>
                    <td>New York</td>
                    <td>Cat</td>
                    <td>Toy</td> 
                </tr>
                <tr>
                    <td>Jane Smith</td>
                    <td>Los Angeles</td>
                    <td>Dog</td>
                    <td>Ball</td>
                </tr>
                <tr>
                    <td>Michael Johnson</td>
                    <td>Chicago</td>
                    <td>Bird</td>
                    <td>Book</td>
                </tr>
            </table>

            <p></p>     
        `,
        onCreate: ({ editor }) => {
            setHtmlContent(editor.getHTML());
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setHtmlContent(html);
        }
    });

    if (!editor) {
        return null;
    }

    const resolvedPos = editor.state.doc?.resolve(editor.state.selection.from);
    const parentTable = resolvedPos ? findParentClosestToPos(resolvedPos, node => node.type.name === 'table') : null;

    return (
        <div>
            <h1 style={{marginLeft:'40px', marginLeft: '40%'}}>Tiptap Interactive Table! </h1>
            <button
                onClick={() => editor.chain().focus().insertTable({ rows: 4, cols: 3, withHeaderRow: true }).run()}
                style={{
                    padding: '10px 15px',
                    fontSize: '15px',
                    backgroundColor: '#373A40',
                    marginTop: '20px',
                    color: 'white',
                    border: 'none',
                    alignContent: 'center',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginBottom: '20px',
                    marginLeft: '40px',
                    transition: 'background-color 1s ease',  // Add transition for smooth effect
                }}
                onMouseOver={(e) => { e.target.style.backgroundColor = '#000000'; }}  // Brighter color on hover
                onMouseOut={(e) => { e.target.style.backgroundColor = '#373A40'; }}   // Restore original color
            >
                Add a New Table
            </button>

                <div style={{padding: '1px'}}>

                </div>
            <h2 style={{marginLeft:'40px'}}>Text Editor</h2>
            
            <EditorContent style={tableWrapperStyles} editor={editor} />
            
            {editor && (
                <TableMenu editor={editor}>
                    <TableOptions editor={editor} parentTable={parentTable} />
                </TableMenu>
            )}

            <div style={{ display: 'flex', marginTop: '20px',  }}>
                <div style={{ width: '50%' }}>
                    <h3>Editor Content (HTML):</h3>
                    <pre>{htmlContent}</pre>
                </div>
                <div style={{ width: '50%', marginLeft: '20px' }} dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
        </div>
    );
};

export default Tiptap;
