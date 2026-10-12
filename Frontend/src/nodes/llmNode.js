// llmNode.js

import { Position } from 'reactflow';
import { createNodeComponent } from './BaseNode';
import styles from './BaseNode.module.css';

const LLMNodeComponent = ({ id, data }) => {
  return (
    <div className={styles.fieldDescription}>
      This node sends text to a large language model and returns the response.
    </div>
  );
};

export const LLMNode = createNodeComponent({
  title: 'LLM',
  renderContent: LLMNodeComponent,
  handles: [
    { type: 'target', position: Position.Left, id: 'system', style: { top: '33%' } },
    { type: 'target', position: Position.Left, id: 'prompt', style: { top: '66%' } },
    { type: 'source', position: Position.Right, id: 'response' }
  ],
  variant: 'llm'
});
