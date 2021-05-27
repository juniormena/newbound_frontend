import ProgressBar from "react-bootstrap/ProgressBar";
import Card from "react-bootstrap/Card";

const WidgetsCharts = (props) => {
    let { title, percent, color, phoneColor, cardBottom } = props?.progress;

    return (
            <Card  className={`card-btm-border card-shadow-primary ${cardBottom}`} key={title}>
                <Card.Body className="text-center">
                    <div className="text-center h6">
                        <h6 className="text-center text-uppercase">{title}</h6>
                        <span className={`opacity-10 text-success pr-2`}>
                            <i className={`fa fa-phone ${phoneColor}`}/>
                        </span>
                        {percent}
                        {/*<small className={`opacity-5 pl-1 ${phoneColor}`} aria-hidden="true">%</small>*/}
                    </div>
                    <ProgressBar variant={color} animated now={percent} className="p-1" label={`${percent}%`} srOnly/>
                </Card.Body>
            </Card>
    )
}

export default WidgetsCharts;

