import { useState } from "react";
import Container from "./Components/Container";
import Obstructions from "./Components/Obstructions";
import searchFlowPath from "./Functions/bfs";

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
            <div className="grid-wrapper">
                <div className="container-wrapper">
                    <Container gridProps={gridProps} handleObstructionDrop={handleObstructionDrop} SetSelectedBlock={SetSelectedBlock} selectedBlock={selectedBlock}
                                placedObstructionsCount={placedObstructionsCount} obstructionsBlocksArray={obstructionsBlocksArray} waterflowPath={waterflowPath}/>
                </div>
                <div className="obstructions-wrapper">
                    <Obstructions gridProps={gridProps} placedObstructionsCount={placedObstructionsCount}/>
                </div>
            </div>
            <div className="buttons">
                <button onClick={goBack}> Back </button>
                <button onClick={resetGrid}> Reset </button>
                <button onClick={startSimulation}> Start Simulation </button>
            </div>
        </div>
    );
}