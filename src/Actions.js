export default function Actions(props) {
    const resetGrid = () => {
        props.SetObstructionsBlocksArray([]);
        props.SetWaterflowPath([]);
        props.SetPlacedObstructionsCount(0);
        props.SetSelectedBlock(-1);
    }

    const goBack = () => {
        resetGrid();
        props.SetGridCreated(false);
    }

    const checkIfEntryBlocked = () => props.obstructionsBlocksArray.some(element=> element[0]===0 && element[1]===props.selectedBlock); 

    const startSimulation = () => {
        if(props.placedObstructionsCount < props.obstructions)
            alert("Use all the obstruction(s) or go back and reduce the number of obstruction(s)");
        else if(props.selectedBlock >= 0 && props.selectedBlock < props.cols && !checkIfEntryBlocked())
            props.startSimulation();
        else if(checkIfEntryBlocked())
            alert("This entry point is obstructed. Try a different point");
        else
            alert("Choose an entry point for water to flow.");
    };

    return (
        <div className="buttons">
            <button onClick={goBack}> Back </button>
            <button onClick={resetGrid}> Reset </button>
            <button onClick={startSimulation}> Run Simulation </button>
        </div>
    );
}