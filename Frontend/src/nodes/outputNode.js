// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { createNodeComponent } from './BaseNode';
import styles from './BaseNode.module.css';

const OutputNodeComponent = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <div className={styles.body}>
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          <span className={styles.fieldLabelText}>Name:</span>
          <input type="text" value={currName} onChange={handleNameChange} className={styles.fieldControl} />
        </label>
      </div>
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          <span className={styles.fieldLabelText}>Type:</span>
          <select value={outputType} onChange={handleTypeChange} className={styles.fieldControl}>
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export const OutputNode = createNodeComponent({
  title: 'Output',
  renderContent: OutputNodeComponent,
  handles: [
    { type: 'target', position: Position.Left, id: 'value' }
  ],
  variant: 'output'
});
