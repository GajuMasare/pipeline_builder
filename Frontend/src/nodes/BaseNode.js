// BaseNode.js - Reusable base component for creating nodes
import { Handle } from 'reactflow';
import styles from './BaseNode.module.css';

const variantClassMap = {
  api: styles.variantApi,
  calculator: styles.variantCalculator,
  conditional: styles.variantConditional,
  database: styles.variantDatabase,
  input: styles.variantInput,
  llm: styles.variantLlm,
  loop: styles.variantLoop,
  output: styles.variantOutput,
  text: styles.variantText,
};

export const createNodeComponent = (config) => {
  const {
    title,
    handles = [],
    renderContent,
    variant = 'default',
    className = '',
  } = config;

  return ({ id, data, selected }) => {
    const shellClasses = [
      styles.nodeShell,
      variantClassMap[variant],
      selected && styles.selected,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={shellClasses}>
        {title && <div className={styles.title}>{title}</div>}

        {renderContent && (
          <div className={styles.content}>{renderContent({ id, data })}</div>
        )}

        {handles.map((handle, index) => (
          <Handle
            key={`${id}-${handle.id || index}`}
            type={handle.type}
            position={handle.position}
            id={handle.id}
            className={[
              styles.handle,
              handle.type === 'target' ? styles.handleTarget : styles.handleSource,
            ]
              .filter(Boolean)
              .join(' ')}
            style={handle.style || {}}
          />
        ))}
      </div>
    );
  };
};