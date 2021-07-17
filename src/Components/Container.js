import Block from "./Block";
import InputBlock from "./InputBlock";

export default function Container(props) {
    const row = props.gridProps.rows;
    const col = props.gridProps.cols;
    const grid = [];

    const findIfInPath = (i,j) => props.waterflowPath.some(element=> element[0]===i && element[1]===j);
    const findIfBlocked = (i,j) => props.obstructionsBlocksArray.some(element=> element[0]===i && element[1]===j);

    for(var i = 0; i<row; i++){
        const newRow = [];
        for(var j = 0; j<col; j++){
            const blocked = findIfBlocked(i, j);
            const waterflow = findIfInPath(i, j);
            if(blocked){
                newRow.push([i, j, true, false]);
            }
            else if(waterflow){
                newRow.push([i, j, false, true]);
            }
            else{
                newRow.push([i, j, false, false]);
            }
        }
        grid.push(newRow);
    }

    const handleObstructionDrop = (position) => {
        if(!position[2]){
            props.handleObstructionDrop(position);
        }
    }
    const handleInputClick = (columnIndex) => {
        props.SetSelectedBlock(columnIndex);
    }

    const inputRow = [];
    for (let j = 0; j < col; j++) {
        inputRow.push(<InputBlock key={j} columnIndex={j} selectedBlock={props.selectedBlock === j} handleInputClick={handleInputClick}/>)
    }
    return (
        <div className="container">
            <div className={"grid-row input-row " + (props.placedObstructionsCount === props.gridProps.obstructions ? "active-input-row" : "inactive-input-row")}>{inputRow}</div>
            {
                grid.map((currentRow,rowIndex) => {
                    return(
                        <div key={rowIndex} className={"grid-row"}>
                            {
                                currentRow.map((element,columnIndex) => {
                                    return <Block key={columnIndex} position={element} onObstructionDrop={handleObstructionDrop}
                                            obstructionsBlocksArray={props.obstructionsBlocksArray} obstruction={props.obstructionsBlocksArray.includes(element)}/>
                                })                                
                            }
                        </div>
                    )
                })
            }
        </div>
    );
}