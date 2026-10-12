// calculatorNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { createNodeComponent } from './BaseNode';
import styles from './BaseNode.module.css';

const CalculatorNodeComponent = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  return (
    <div className={styles.body}>
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          <span className={styles.fieldLabelTextXL}>Operation:</span>
          <select value={operation} onChange={(e) => setOperation(e.target.value)} className={styles.fieldControl}>
            <option value="add">Add</option>
            <option value="subtract">Subtract</option>
            <option value="multiply">Multiply</option>
            <option value="divide">Divide</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export const CalculatorNode = createNodeComponent({
  title: 'Calculator',
  renderContent: CalculatorNodeComponent,
  handles: [
    { type: 'target', position: Position.Left, id: 'a', style: { top: '33%' } },
    { type: 'target', position: Position.Left, id: 'b', style: { top: '66%' } },
    { type: 'source', position: Position.Right, id: 'result' }
  ],
  variant: 'calculator'
});
