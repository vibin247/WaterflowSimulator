import { useState } from "react";
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
            var tempArray = obstructionsBlocksArray;
            tempArray.push(position);
            SetObstructionsBlocksArray(tempArray);
            var updatedPlacedObstructionsCount = placedObstructionsCount + 1;
            SetPlacedObstructionsCount(updatedPlacedObstructionsCount);
        }
    }

    const resetGrid = () => {
        SetObstructionsBlocksArray([]);
        SetWaterflowPath([]);
        SetPlacedObstructionsCount(0);
        SetSelectedBlock(-1);
    }

    const goBack = () => {
        resetGrid();
        props.SetGridCreated(false);
    }

    const findIfBlocked = (i,j) => obstructionsBlocksArray.some(element=> element[0]===i && element[1]===j);

    const startSimulation = () => {
        if(selectedBlock >= 0 && selectedBlock < gridProps.cols && !findIfBlocked(0,selectedBlock))
            searchFlowPath(gridProps.rows, gridProps.cols, obstructionsBlocksArray, [0, selectedBlock], SetWaterflowPath);
        else if(findIfBlocked(0,selectedBlock))
            alert("This entry point is obstructed. Try a different point");
        else
            alert("Choose an entry point for water to flow.");
    };

    return (
        <div className="waterflow-simulator">
            <div>Drag the obstructions and place it inside the grid</div>
            <GridWrapper gridProps={gridProps} selectedBlock={selectedBlock}
                waterflowPath={waterflowPath}
                placedObstructionsCount={placedObstructionsCount}
                obstructionsBlocksArray={obstructionsBlocksArray}
                handleObstructionDrop={handleObstructionDrop}
                SetSelectedBlock={SetSelectedBlock}
            />
            <div className="buttons">
                <button onClick={goBack}> Back </button>
                <button onClick={resetGrid}> Reset </button>
                <button onClick={startSimulation}> Start Simulation </button>
            </div>
        </div>
    );
}