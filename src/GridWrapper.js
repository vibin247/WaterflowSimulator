import Container from "./Components/Container";
import Obstructions from "./Components/Obstructions";

export default function GridWrapper(props) {

    const gridProps = props.gridProps;
    const placedObstructionsCount = props.placedObstructionsCount;
    const selectedBlock = props.selectedBlock;
    const obstructionsBlocksArray = props.obstructionsBlocksArray;
    const waterflowPath = props.waterflowPath;
    const handleObstructionDrop = props.handleObstructionDrop;
    const SetSelectedBlock = props.SetSelectedBlock;    

    return (
        <div className="grid-wrapper">
            <div className="container-wrapper">
                <Container gridProps={gridProps} selectedBlock={selectedBlock} waterflowPath={waterflowPath}
                            placedObstructionsCount={placedObstructionsCount} obstructionsBlocksArray={obstructionsBlocksArray}
                            handleObstructionDrop={handleObstructionDrop}
                            SetSelectedBlock={SetSelectedBlock}/>
            </div>
            <div className="obstructions-wrapper">
                <Obstructions gridProps={gridProps} placedObstructionsCount={placedObstructionsCount}/>
            </div>
        </div>
    );
}