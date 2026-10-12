// apiNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { createNodeComponent } from './BaseNode';
import styles from './BaseNode.module.css';

const APINodeComponent = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <div className={styles.body}>
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          <span className={styles.fieldLabelTextMedium}>Method:</span>
          <select value={method} onChange={(e) => setMethod(e.target.value)} className={styles.fieldControl}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export const APINode = createNodeComponent({
  title: 'API Call',
  renderContent: APINodeComponent,
  handles: [
    { type: 'target', position: Position.Left, id: 'url' },
    { type: 'target', position: Position.Left, id: 'data', style: { top: '66%' } },
    { type: 'source', position: Position.Right, id: 'response' }
  ],
  variant: 'api'
});
