// conditionalNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { createNodeComponent } from './BaseNode';
import styles from './BaseNode.module.css';

const ConditionalNodeComponent = ({ id, data }) => {
  const [operator, setOperator] = useState(data?.operator || 'equals');

  return (
    <div className={styles.body}>
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          <span className={styles.fieldLabelTextMedium}>Operator:</span>
          <select value={operator} onChange={(e) => setOperator(e.target.value)} className={styles.fieldControl}>
            <option value="equals">Equals (==)</option>
            <option value="greater">Greater (&gt;)</option>
            <option value="less">Less (&lt;)</option>
            <option value="contains">Contains</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export const ConditionalNode = createNodeComponent({
  title: 'Conditional',
  renderContent: ConditionalNodeComponent,
  handles: [
    { type: 'target', position: Position.Left, id: 'a', style: { top: '25%' } },
    { type: 'target', position: Position.Left, id: 'b', style: { top: '50%' } },
    { type: 'source', position: Position.Right, id: 'true', style: { top: '33%' } },
    { type: 'source', position: Position.Right, id: 'false', style: { top: '66%' } }
  ],
  variant: 'conditional'
});
