import { useState } from "react";
import Actions from "./Components/Actions";
import searchFlowPath from "./Functions/bfs";
import GridWrapper from "./GridWrapper";

export default function WaterflowSimulator(props) {
    const gridProps = props.gridProps;

    const [obstructionsBlocksArray, SetObstructionsBlocksArray] = useState([]);
    const [placedObstructionsCount, SetPlacedObstructionsCount] = useState(0);
    const [selectedBlock, SetSelectedBlock] = useState(-1);
    const [waterflowPath, SetWaterflowPath] = useState([]);

    const handleObstructionDrop = (position) =>{
        if(placedObstructionsCount <= gridProps.obstructions){
            obstructionsBlocksArray.push(position);
            SetPlacedObstructionsCount(placedObstructionsCount + 1);
        }
    }

    const startSimulation = () => {
        const result = searchFlowPath(gridProps.rows, gridProps.cols, obstructionsBlocksArray, [0, selectedBlock]);
        SetWaterflowPath(result);
    };

    return (
        <div className="waterflow-simulator">
            <div>Drag the obstructions and place it inside the grid</div>
            <GridWrapper gridProps={gridProps} selectedBlock={selectedBlock} waterflowPath={waterflowPath}                
                placedObstructionsCount={placedObstructionsCount} obstructionsBlocksArray={obstructionsBlocksArray}                
                handleObstructionDrop={handleObstructionDrop} SetSelectedBlock={SetSelectedBlock}                
            />
            <Actions
                SetObstructionsBlocksArray={SetObstructionsBlocksArray} SetGridCreated={props.SetGridCreated}
                SetWaterflowPath={SetWaterflowPath} SetSelectedBlock={SetSelectedBlock}                
                SetPlacedObstructionsCount={SetPlacedObstructionsCount}                
                startSimulation={startSimulation} cols={gridProps.cols}
                selectedBlock={selectedBlock} obstructionsBlocksArray={obstructionsBlocksArray}
            />
        </div>
    );
}