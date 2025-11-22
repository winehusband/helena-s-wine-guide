HelenaSips Wine Flow Widget – Project Brief

1. Overview

Build a small, embeddable web widget that lets a user walk through the Guardian-style wine decision flow and ends with a wine recommendation.

MVP:
	•	Fully client-side
	•	Uses a JSON decision tree for logic
	•	Styled in HelenaSips branding (or easily swappable once Lovable gives us a layout)
	•	Future-ready to swap the static wine names for real wines pulled from Supabase

The widget will later be embedded on helenasips.com inside an existing page (likely via iframe or script tag).

2. Goals
	1.	Recreate the decision-tree experience from the magazine:
	•	One question at a time
	•	Simple multiple-choice answers
	•	Ends in a wine suggestion
	2.	Make it fun and on-brand:
	•	Friendly copy, playful microcopy
	•	Works nicely on mobile
	3.	Separate data from logic:
	•	Decision tree stored in a JSON file
	•	UI logic reads from JSON, no hard-coded branches in components
	4.	Make it easy to upgrade later:
	•	Each terminal “wine” node should have a stable wineKey that can be used to fetch a record from Supabase later.

Non-goals for MVP:
	•	No real Supabase calls yet
	•	No login, accounts or analytics
	•	No CMS editing of the tree

3. Tech stack
	•	Frontend: React + TypeScript (Vite or Next, but keep it simple, assume Vite SPA)
	•	Styling:
	•	Plain CSS or Tailwind. Code should not depend on any server-side features.
	•	Layout can be replaced later with JSX from Lovable.
	•	Data: Local JSON file in src/data/wineFlow.json

No backend needed for MVP.

4. Data model

Create src/data/wineFlow.json with this shape:

// conceptual types
type NodeType = 'question' | 'message' | 'wine';

interface BaseNode {
  id: string;
  type: NodeType;
}

interface QuestionNode extends BaseNode {
  type: 'question';
  text: string;
  options: {
    label: string;
    next: Node; // reference by id in actual JSON
  }[];
}

interface MessageNode extends BaseNode {
  type: 'message';
  text: string;
  next: Node;
}

interface WineNode extends BaseNode {
  type: 'wine';
  wine: string;      // display name
  wineKey: string;   // stable key for Supabase lookup later, e.g. 'chinon', 'champagne'
  blurb?: string;    // optional fun text now
}

Implementation detail for JSON: use ids and a separate lookup map rather than nesting full objects everywhere, to keep it simple to change. Codex can choose either nested or map-based, as long as it is consistent and easy to traverse.

For now, wineKey can just be a kebab-case version of the wine name.

5. User flow
	1.	Widget loads and shows:
	•	Title: “Go with the flow”
	•	Intro text: short line like “Answer a few questions and Helena will point you at your next bottle”
	2.	Show one node at a time:
	•	If node is question: render text and buttons for each option.label
	•	If node is message: show text and a single “Next” button
	•	If node is wine: show final recommendation panel
	3.	Navigation:
	•	User taps an option → widget moves to corresponding next node
	•	Provide a Back button (except on root) using simple history stack
	•	Provide a Start again button on result screen
	4.	Result screen (wine node):
	•	Show wine name
	•	Optional blurb
	•	For future: add a placeholder “Coming soon: real bottles from Helena’s cellar” and display the wineKey for debugging

6. UI behaviour and layout

MVP behaviour:
	•	Card-style layout with:
	•	Question text at top
	•	Options as big clickable buttons
	•	Progress hint like “Step 3 of 7” (approximate based on history length vs max path length or just omit for now)
	•	Smooth but simple transitions (eg fade or slide) when moving between nodes
	•	Responsive design:
	•	Works well on phones first

Branding hooks:
	•	Use a simple theming system so colours and fonts can be swapped:
	•	Define a theme.ts exporting colours, font stack, spacing
	•	Use these values in components rather than magic numbers
	•	For now just use placeholder colours close to HelenaSips palette and system fonts

Later, we can paste in JSX/CSS from Lovable to replace the core layout while keeping the logic and data structures intact.

7. File and folder structure

Proposal:

/src
  /components
    FlowWidget.tsx      // main component, orchestrates everything
    QuestionView.tsx
    MessageView.tsx
    ResultView.tsx
    ProgressBar.tsx     // optional
  /data
    wineFlow.json       // decision tree
  /lib
    flowEngine.ts       // helper functions: getNodeById, goToNextNode, etc
    types.ts            // Node types and interfaces
  theme.ts              // colours, spacing, fonts
  main.tsx
  App.tsx

App.tsx just renders <FlowWidget />.

8. Future Supabase integration (design now, implement later)

Design the data model so that later we can:
	•	Map each wineKey to a row in a Supabase table, for example:

table: wines
columns: id, wine_key, name, description, image_url, buy_url, etc


	•	At result time, we will:
	•	Call Supabase client with wineKey
	•	Display the returned data instead of just the static name

For MVP:
	•	Do not import Supabase
	•	Just show wine name and wineKey somewhere in small text so we can verify it matches.

9. Requirements for Codex

Codex, you are a senior React and TypeScript engineer. Please:
	1.	Initial setup
	•	Create a new Vite + React + TypeScript project in this folder
	•	Configure a minimal theme.ts with a few colours and spacing values
	•	Add Tailwind or simple CSS modules (keep it light)
	2.	Implement the data model
	•	Define the TypeScript types in src/lib/types.ts
	•	Create src/data/wineFlow.json and populate it with the full decision tree (you can use the structure I have provided separately)
	3.	Build the flow engine
	•	Implement src/lib/flowEngine.ts with helpers:
	•	loadFlow() – loads JSON
	•	getNodeById(id) – returns corresponding node
	•	Store current node id and history in React state inside FlowWidget
	4.	Build the UI
	•	FlowWidget decides which view to show based on node type
	•	QuestionView, MessageView, ResultView are dumb presentational components
	•	Include Back and Start again buttons where appropriate
	5.	Make it easy to embed
	•	Ensure the widget can be rendered within any container <div> with 100% width
	•	Export FlowWidget as default so it can be imported into other projects later
	6.	Keep code clean
	•	No giant monolithic components
	•	Typesafe props
	•	Clear comments where future Supabase calls will go
