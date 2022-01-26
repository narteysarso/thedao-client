import Wobble1 from '../svg/wobble1.svg';
import Wobble2 from '../svg/wobble2.svg';
import Wobble3 from '../svg/wobble3.svg';
import Wobble4 from '../svg/wobble4.svg';

export default function BackgroundPattern(props){
    return (
        <div style={{...props.style}}>
        <img width={200} src={Wobble1} style={{opacity: .2, position: 'absolute', top: '0',}} />
        <img width={300} src={Wobble2} style={{opacity: .2, position: 'absolute', top: '50%', left: '40%'}} />
        <img width={300} src={Wobble3} style={{opacity: .2, position: 'absolute', bottom: '-20%', left: '0%'}} />
        <img width={300} src={Wobble4} style={{opacity: .2, position: 'absolute', bottom: '-20%', left: '0%'}} />
        <img width={30} src={Wobble4} style={{opacity: .2, position: 'absolute', top: '10%', right: '10%'}} />
    </div>
    )
}