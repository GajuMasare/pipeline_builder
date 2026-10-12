// toolbar.js

import { DraggableNode } from '../DraggableNode/DraggableNode';
import styles from './Toolbar.module.css';

const SECTIONS = [
  {
    title: 'CORE NODES',
    items: [
      { type: 'customInput', label: 'Input' },
      { type: 'customOutput', label: 'Output' },
      { type: 'text', label: 'Text' },
      { type: 'llm', label: 'LLM' },
    ],
  },
  {
    title: 'PROCESSING NODES',
    items: [
      { type: 'calculator', label: 'Calculator' },
      { type: 'conditional', label: 'Conditional' },
      { type: 'loop', label: 'Loop' },
    ],
  },
  {
    title: 'INTEGRATION NODES',
    items: [
      { type: 'api', label: 'API' },
      { type: 'database', label: 'Database' },
    ],
  },
];

export const PipelineToolbar = () => {
  return (
    <aside className={styles.toolbar} aria-label="Pipeline toolbar">
      {SECTIONS.map((section) => (
        <section key={section.title} className={styles.section}>
          <div className={styles.sectionTitle}>{section.title}</div>
          <ul className={styles.nodeList}>
            {section.items.map((item) => (
              <li key={item.type} className={styles.nodeListItem}>
                <DraggableNode type={item.type} label={item.label} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </aside>
  );
};
