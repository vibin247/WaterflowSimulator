export default function Slider(props) {
    return (
        <div>
            <input type="range" {...props.sliderProps}/>
            <span>{props.sliderProps.value}</span>
        </div>
    );
}