// databaseNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { createNodeComponent } from './BaseNode';
import styles from './BaseNode.module.css';

const DatabaseNodeComponent = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'query');

  return (
    <div className={styles.body}>
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          <span className={styles.fieldLabelTextXL}>Operation:</span>
          <select value={operation} onChange={(e) => setOperation(e.target.value)} className={styles.fieldControl}>
            <option value="query">Query</option>
            <option value="insert">Insert</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export const DatabaseNode = createNodeComponent({
  title: 'Database',
  renderContent: DatabaseNodeComponent,
  handles: [
    { type: 'target', position: Position.Left, id: 'table' },
    { type: 'target', position: Position.Left, id: 'params', style: { top: '66%' } },
    { type: 'source', position: Position.Right, id: 'result' }
  ],
  variant: 'database'
});
