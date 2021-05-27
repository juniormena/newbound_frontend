import { OverlayTrigger, Tooltip } from 'react-bootstrap'

function TooltipComponent({ children,text,placement='top'}) {
    return (
        <OverlayTrigger
        key={1}
        placement={placement}
        overlay={<Tooltip id={`tooltip-top`} className="mytooltip" >{text}</Tooltip>}
      >
      {children}
      </OverlayTrigger>
    )
}

export default TooltipComponent;
