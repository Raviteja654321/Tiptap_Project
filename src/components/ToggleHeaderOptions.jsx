import React from 'react';

const measurePerformance = async (operationName, operation) => {
    const start = performance.now();
    await operation();
    const end = performance.now();
    console.log(`${operationName} took ${end - start}ms`);
};

const ToggleHeaderOptions = ({ editor, onOptionSelect }) => {
    const toggleHeaderRow = async () => {
        await measurePerformance('toggleHeaderRow', async () => {
            editor.chain().focus().toggleHeaderRow().run();
        });
        onOptionSelect();
    };

    const toggleHeaderColumn = async () => {
        await measurePerformance('toggleHeaderColumn', async () => {
            editor.chain().focus().toggleHeaderColumn().run();
        });
        onOptionSelect();
    };

    return (
        <div className="toggle-header-options" style={{ position: 'absolute',width: '152px', left: 0, top: '32px', backgroundColor: '#333', padding: '5px', borderRadius: '3px' }}>
            <button 
                onClick={toggleHeaderColumn} 
                title="Toggle Header Column" 
                style={{ cursor: 'pointer', border: 'none', background: 'none', color: 'white', display: 'block', textAlign: 'centre', padding: '5px', borderBottom: `1px solid grey` }}
            >
                 Toggle Header Column
            </button>
            <button 
                onClick={toggleHeaderRow} 
                title="Toggle Header Row" 
                style={{ cursor: 'pointer', border: 'none', background: 'none', color: 'white', display: 'block', textAlign: 'centre', padding: '5px' }}
            >
                 Toggle Header Row
            </button>
        </div>
    );
};

export default ToggleHeaderOptions;
