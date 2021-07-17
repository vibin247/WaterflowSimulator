import { useState } from "react";
import Slider from "./Components/Slider";

export default function GridCreation(props) {

    const [rows, SetRows] = useState(1);
    const [cols, SetCols] = useState(1);
    const [obstructions, SetObstructions] = useState(1);
    const defaultProps = {
        min: 2, max: 10
    }
    const rowProps = {
        id:"rows",
        onChange: (e) => {
            SetRows(e.target.value);
        },
        value:rows,
        ...defaultProps
    };
    const colProps = {
        id:"cols",
        onChange: (e) => {
            SetCols(e.target.value);
        },
        value:cols,
        ...defaultProps
    };
    const obstructionsProps = {
        id:"obstructions",
        onChange: (e) => {
            SetObstructions(e.target.value);
        },
        value:obstructions,
        ...defaultProps
    };

    const onSubmitAction = (e) => {
        e.preventDefault();
        if(parseInt(rows) <= 1 || parseInt(cols) <= 1){
            alert("You must have minimum 2 rows or 2 columns");
            return;
        }
        if(parseInt(obstructions) === parseInt(rows)*parseInt(cols)){
            alert("You will block the entire grid");
            return;
        }
        if(parseInt(obstructions) === 0){
            alert("The water will flow easily without any obstructions");
            return;
        }
        props.createGrid({
            rows: parseInt(rows),
            cols: parseInt(cols),
            obstructions: parseInt(obstructions)
        });
    }

    return (
        <div className="grid-creation">
            <h3>Grid Creation</h3>
            <form onSubmit={onSubmitAction}>
                <div>Number of rows</div>
                <Slider sliderProps={rowProps}/>
                <div>Number of columns</div>
                <Slider sliderProps={colProps}/>
                <div>Number of obstructions</div>
                <Slider sliderProps={obstructionsProps}/>
                <input type="submit" value="Next"/>
            </form>
            
        </div>
    );
}