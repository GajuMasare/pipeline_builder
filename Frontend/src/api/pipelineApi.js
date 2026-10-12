export async function parsePipeline(nodes, edges) {
    const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json(); // { num_nodes, num_edges, is_dag }
}