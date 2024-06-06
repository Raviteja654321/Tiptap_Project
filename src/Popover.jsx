import React, { useState } from 'react';
// const Popover = ({ editor, cellView }) => {
const Popover = ({ editor }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    // useEffect(() => {
    //     const updatePopoverPosition = () => {
    //         if (!popoverRef.current || !cellView) return;
    //         const rect = cellView.dom.getBoundingClientRect();
    //         console.log('Cell rect:', rect); 
    //         popoverRef.current.style.left = `${rect.left + window.pageXOffset}px`;
    //         popoverRef.current.style.top = `${rect.top + window.pageYOffset}px`;
    //     };

    //     updatePopoverPosition();

    //     window.addEventListener('scroll', updatePopoverPosition);
    //     window.addEventListener('resize', updatePopoverPosition);

    //     return () => {
    //         window.removeEventListener('scroll', updatePopoverPosition);
    //         window.removeEventListener('resize', updatePopoverPosition);
    //     };
    // }, [cellView]);

    const handleBackgroundColorChange = (color) => {
        editor.chain().focus().setCellAttribute('backgroundColor', color).run();
    };

    const clearCell = () => {
        editor.chain().focus().deleteSelection().run();
    };

    const deleteRow = () => {
        editor.chain().focus().deleteRow().run();
    };

    const deleteColumn = () => {
        editor.chain().focus().deleteColumn().run();
    };

    const addRowBefore = () => {
        editor.chain().focus().addRowBefore().run();
    };

    const addRowAfter = () => {
        editor.chain().focus().addRowAfter().run();
    };

    const addColumnBefore = () => {
        editor.chain().focus().addColumnBefore().run();
    };

    const addColumnAfter = () => {
        editor.chain().focus().addColumnAfter().run();
    };

    return (
        <div className="dropdown" style={{display: "flex"}}>
            <button style={{}} onClick={()=>setShowDropdown(!showDropdown)}>v</button>
            { showDropdown &&
                <ul style={{backgroundColor: "#282E33", width: "fit-content", margin: "0 1.5rem", padding: "0.75rem 1.25rem",  listStyle: 'none', position: "absolute", borderRadius: "0.25rem"}}>
                    <li style={{borderBottom: "1px solid grey", textAlign: 'center'}}><button style={{ background: "transparent", border: "none", color: "#B7C3CF"}} onClick={() => handleBackgroundColorChange('#ffffff')}>White</button></li>
                    <li style={{borderBottom: "1px solid grey", textAlign: 'center'}}><button style={{ background: "transparent", border: "none", color: "#B7C3CF"}} onClick={() => handleBackgroundColorChange('#f0f0f0')}>Light Gray</button></li>
                    <li style={{borderBottom: "1px solid grey", textAlign: 'center'}}><button style={{ background: "transparent", border: "none", color: "#B7C3CF"}} onClick={() => handleBackgroundColorChange('#e0e0e0')}>Gray</button></li>
                    <li style={{borderBottom: "1px solid grey", textAlign: 'center'}}><button style={{ background: "transparent", border: "none", color: "#B7C3CF"}} onClick={clearCell}>Clear Cell</button></li>
                    <li style={{borderBottom: "1px solid grey", textAlign: 'center'}}><button style={{ background: "transparent", border: "none", color: "#B7C3CF"}} onClick={deleteRow}>Delete Row</button></li>
                    <li style={{borderBottom: "1px solid grey", textAlign: 'center'}}><button style={{ background: "transparent", border: "none", color: "#B7C3CF"}} onClick={deleteColumn}>Delete Column</button></li>
                    <li style={{borderBottom: "1px solid grey", textAlign: 'center'}}><button style={{ background: "transparent", border: "none", color: "#B7C3CF"}} onClick={addRowBefore}>Add Row Above</button></li>
                    <li style={{borderBottom: "1px solid grey", textAlign: 'center'}}><button style={{ background: "transparent", border: "none", color: "#B7C3CF"}} onClick={addRowAfter}>Add Row Below</button></li>
                    <li style={{borderBottom: "1px solid grey", textAlign: 'center'}}><button style={{ background: "transparent", border: "none", color: "#B7C3CF"}} onClick={addColumnBefore}>Add Column Left</button></li>
                    <li style={{                                textAlign: 'center'}}><button style={{ background: "transparent", border: "none", color: "#B7C3CF"}} onClick={addColumnAfter}>Add Column Right</button></li>
                </ul>
            }
        </div>

    );
};

export default Popover;
