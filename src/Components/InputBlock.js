export default function InputBlock(props) {
    return (
        <div className={"block input-block " + (props.selectedBlock ? "selected-block" : "")} onClick={() => props.handleInputClick(props.columnIndex)}></div>
    );
}