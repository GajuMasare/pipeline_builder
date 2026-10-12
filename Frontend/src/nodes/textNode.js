// textNode.js

import { Handle, Position } from 'reactflow';
import styles from './BaseNode.module.css';
import { useState, useMemo, useRef, useEffect } from 'react';

const extractVariables = (text) => {
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const variables = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (!variables.includes(match[1])) {
      variables.push(match[1]);
    }
  }
  return variables;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const variables = useMemo(() => extractVariables(currText), [currText]);
  const textareaRef = useRef(null);

  const adjustHeight = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    // reset to allow shrinking then grow to fit content
    ta.style.height = 'auto';
    ta.style.height = `${ta.scrollHeight}px`;
  };

  useEffect(() => {
    adjustHeight();
  }, []);

  useEffect(() => {
    // after state update, adjust height to fit wrapped lines as well
    adjustHeight();
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    // adjustment will run in effect after state update; optional immediate adjust:
    // adjustHeight();
  };

  const width = 280; // fixed width in px for consistent layout

  return (
    <div className={`${styles.nodeShell} ${styles.variantText}`} style={{ width: `${width}px` }}>
      <div className={styles.title}>Text</div>

      <div className={styles.body}>
        <div className={styles.fieldGroup}>
          <div>
            <textarea
              ref={textareaRef}
              value={currText}
              onChange={handleTextChange}
              placeholder="Enter text..."
              className={`${styles.fieldControl} ${styles.fieldTextarea}`}
            />
          </div>
        </div>

        {variables.length > 0 && (
          <div className={styles.fieldHelper}>Variables: {variables.join(', ')}</div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className={[styles.handle, styles.handleSource].join(' ')}
      />

      {variables.map((variable, index) => {
        // Position variable handles relative to the textarea top; base offset approximates title + padding
        const handleTopBase = 52; // px offset from top for first variable handle
        const top = handleTopBase + index * 22; // stack handles vertically with ~22px spacing
        return (
          <Handle
            key={`${id}-${variable}`}
            type="target"
            position={Position.Left}
            id={`${id}-${variable}`}
            className={[styles.handle, styles.handleTarget].join(' ')}
            style={{ top: `${top}px` }}
            title={variable}
          />
        );
      })}
    </div>
  );
}
