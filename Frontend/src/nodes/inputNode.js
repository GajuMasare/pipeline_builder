// inputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { createNodeComponent } from './BaseNode';
import styles from './BaseNode.module.css';

const InputNodeComponent = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
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
          <select value={inputType} onChange={handleTypeChange} className={styles.fieldControl}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export const InputNode = createNodeComponent({
  title: 'Input',
  renderContent: InputNodeComponent,
  handles: [
    { type: 'source', position: Position.Right, id: 'value' }
  ],
  variant: 'input'
});
