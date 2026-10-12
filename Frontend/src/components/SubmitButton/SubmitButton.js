import { useState } from 'react';
import { useStore } from '../../state/store';
import { parsePipeline } from '../../api/pipelineApi';
import styles from './SubmitButton.module.css';

export const SubmitButton = () => {
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const data = await parsePipeline(nodes, edges);

      const message = [
        'Pipeline Analysis Results:',
        `Number of Nodes: ${data.num_nodes}`,
        `Number of Edges: ${data.num_edges}`,
        `Is Directed Acyclic Graph (DAG): ${data.is_dag ? 'Yes' : 'No'}`,
        data.is_dag
          ? 'Pipeline is valid for execution!'
          : 'Pipeline contains cycles and may not execute properly.',
      ].join('\n');

      alert(message);
    } catch (err) {
      alert(`Error submitting pipeline: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const disabled = loading || nodes.length === 0;

  return (
    <div className={styles.container}>
      {nodes.length === 0 && (
        <span className={styles.hint}>
          (Add nodes to enable submission)
        </span>
      )}
      <button
        onClick={handleSubmit}
        disabled={disabled}
        className={styles.button}
      >
        {loading ? 'Submitting...' : 'Submit Pipeline'}
      </button>
    </div>
  );
};