import { useState } from "react";
import GridCreation from "./GridCreation";
import WaterflowSimulator from "./WaterflowSimulator";
import "./index.scss";

export default function App() {

  const [gridCreated, SetGridCreated] = useState(false);
  const [gridProps, SetGridProps] = useState({});
  

  const createGrid = (gridProps) => {
    SetGridProps(gridProps);
    SetGridCreated(true);
  };
  
  return (
    <div className="App">
      <h2>Waterflow Simulator</h2>
      {!gridCreated && <GridCreation createGrid={createGrid}/>}
      {gridCreated && <WaterflowSimulator gridProps={gridProps} SetGridCreated={SetGridCreated}/>}
    </div>
  );
}

