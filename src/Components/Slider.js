export default function Slider(props) {
    return (
        <div className="slider">
            <div>Number of {props.sliderProps.id}</div>
            <input type="range" {...props.sliderProps}/>
            <span>{props.sliderProps.value}</span>
        </div>
    );
}