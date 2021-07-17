export default function Block(props) {
    const handleDrop = () => {
        props.onObstructionDrop(props.position);
    }
    
    const handleOnDragOver = (event) => {
        if(props.position[2]) return;
        event.preventDefault();
    }
    
    return (
        <div className={"block " + (props.position[2] ? "background-obstructions" : "") + (props.position[3] ? "background-water-flow" : "")} onDrop={handleDrop} onDragOver={handleOnDragOver}></div>
    );
}