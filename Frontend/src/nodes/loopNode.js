// loopNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { createNodeComponent } from './BaseNode';
import styles from './BaseNode.module.css';

const LoopNodeComponent = ({ id, data }) => {
  const [loopType, setLoopType] = useState(data?.loopType || 'forEach');

  return (
    <div className={styles.body}>
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          <span className={styles.fieldLabelTextWide}>Loop Type:</span>
          <select value={loopType} onChange={(e) => setLoopType(e.target.value)} className={styles.fieldControl}>
            <option value="forEach">For Each</option>
            <option value="while">While</option>
            <option value="for">For (indexed)</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export const LoopNode = createNodeComponent({
  title: 'Loop',
  renderContent: LoopNodeComponent,
  handles: [
    { type: 'target', position: Position.Left, id: 'input', style: { top: '50%' } },
    { type: 'source', position: Position.Right, id: 'item' },
    { type: 'source', position: Position.Right, id: 'results', style: { top: '66%' } }
  ],
  variant: 'loop'
});
