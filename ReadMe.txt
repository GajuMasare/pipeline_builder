PIPELINE BUILDER - SETUP INSTRUCTIONS

PROJECT STRUCTURE
------------------
/frontend   -> React app (pipeline builder UI)
/backend    -> FastAPI server (pipeline parsing + DAG validation)


BACKEND SETUP
-------------
1. Navigate to the backend folder.

2. Install required packages:
   pip install fastapi uvicorn

3. Run the backend server:
   uvicorn main:app --reload

(Keep the backend running while testing the frontend)


FRONTEND SETUP
---------------
1. Navigate to the frontend folder.

2. Install required packages:
   npm install

3. Run the frontend:
   npm start

4. Frontend will open automatically in a browser.


IMPLEMENTATION NOTES
---------------------
Part 1 - Node Abstraction:
All node types (Input, Output, Text, LLM, Calculator, Conditional, Loop,
API, Database) are built on a single shared BaseNode component
(src/nodes/BaseNode.js). Each node type is defined via a config object
(title, fields, handles) passed into a createNodeComponent factory
function. Adding a new node type only requires a new config, not a
copy-pasted component.

Part 2 - Styling:
Styling uses CSS Modules throughout, with a centralized design token
system in src/styles/globals.css (colors, spacing, radius, shadows as
CSS variables). Since all nodes route through BaseNode, styling is
applied once and stays consistent across every node type.

Part 3 - Text Node Logic:
The Text node (src/nodes/textNode.js) automatically grows in height
as text is typed, using a scrollHeight-based resize
calculation. It also detects {{variableName}} patterns in the text
and dynamically creates a target Handle on the left side of the node
for each unique variable found.

Part 4 - Backend Integration:
src/api/pipelineApi.js sends the current nodes/edges to the backend's
/pipelines/parse endpoint on Submit. The backend (backend/main.py)
calculates node/edge counts and checks whether the pipeline forms a
valid DAG using Kahn's algorithm (topological sort with cycle
detection). The result is shown to the user via an alert with a
user-friendly message.