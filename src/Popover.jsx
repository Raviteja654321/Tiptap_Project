import React, { useEffect, useRef } from 'react';

const Popover = ({ editor, cellView }) => {
  const popoverRef = useRef(null);

  useEffect(() => {
    const updatePopoverPosition = () => {
      if (!popoverRef.current || !cellView) return;
      const rect = cellView.dom.getBoundingClientRect();
      console.log('Cell rect:', rect); // Debug log
      popoverRef.current.style.left = `${rect.left + window.pageXOffset}px`;
      popoverRef.current.style.top = `${rect.top + window.pageYOffset}px`;
    };

    updatePopoverPosition();

    window.addEventListener('scroll', updatePopoverPosition);
    window.addEventListener('resize', updatePopoverPosition);

    return () => {
      window.removeEventListener('scroll', updatePopoverPosition);
      window.removeEventListener('resize', updatePopoverPosition);
    };
  }, [cellView]);

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
    <div ref={popoverRef} className="cell-popover">
      <div className="color-picker">
        <button onClick={() => handleBackgroundColorChange('#ffffff')}>White</button>
        <button onClick={() => handleBackgroundColorChange('#f0f0f0')}>Light Gray</button>
        <button onClick={() => handleBackgroundColorChange('#e0e0e0')}>Gray</button>
      </div>
      <button onClick={clearCell}>Clear Cell</button>
      <button onClick={deleteRow}>Delete Row</button>
      <button onClick={deleteColumn}>Delete Column</button>
      <div>
        <button onClick={addRowBefore}>Add Row Above</button>
        <button onClick={addRowAfter}>Add Row Below</button>
      </div>
      <div>
        <button onClick={addColumnBefore}>Add Column Left</button>
        <button onClick={addColumnAfter}>Add Column Right</button>
      </div>
    </div>
  );
};

export default Popover;
