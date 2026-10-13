from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from collections import defaultdict, deque

app = FastAPI()

# Allow CORS for all origins (for assignment purposes)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, Any]
    data: Dict[str, Any]

class Edge(BaseModel):
    source: str
    target: str
    id: str
    type: Optional[str] = None

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the pipeline forms a directed acyclic graph (DAG).
    Uses topological sort with cycle detection.
    """
    # Build adjacency list and in-degree map
    node_ids = {node.id for node in nodes}
    adj_list = defaultdict(list)
    in_degree = defaultdict(int)
    
    # Initialize all nodes with in-degree 0
    for node in nodes:
        if node.id not in in_degree:
            in_degree[node.id] = 0
    
    # Build graph
    for edge in edges:
        if edge.source in node_ids and edge.target in node_ids:
            adj_list[edge.source].append(edge.target)
            in_degree[edge.target] += 1
    
    # Kahn's algorithm for topological sort
    queue = deque([node_id for node_id in in_degree if in_degree[node_id] == 0])
    sorted_count = 0
    
    while queue:
        node = queue.popleft()
        sorted_count += 1
        
        for neighbor in adj_list[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we sorted all nodes, it's a DAG
    return sorted_count == len(nodes)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    """
    Parse a pipeline and return:
    - num_nodes: Number of nodes in the pipeline
    - num_edges: Number of edges in the pipeline  
    - is_dag: Whether the pipeline forms a directed acyclic graph
    """
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag_result = is_dag(pipeline.nodes, pipeline.edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag_result
    }
