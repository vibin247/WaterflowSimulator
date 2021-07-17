export default function Obstructions(props) {
    const gridProps = props.gridProps;

    const obstructionsArray = [];
    for (let i = 0; i < gridProps.obstructions; i++) {
        if(i < props.placedObstructionsCount){
            obstructionsArray.push(<div className="placed-obstructions background-placed-obstructions block" key={i}></div>)
        }
        else{
            obstructionsArray.push(<div className="obstructions background-obstructions block" draggable={true} key={i}></div>)
        }
    }
    
    return ( obstructionsArray );
    
}