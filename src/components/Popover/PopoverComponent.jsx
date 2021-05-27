import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import Popover from 'react-bootstrap/Popover'


function PopoverComponent({ children, text, placement = 'top' }) {
  return (
    <OverlayTrigger
      key={1}
      placement={placement}
      overlay={
        <Tooltip id="Description__tooltip" className="mypop">
        <div dangerouslySetInnerHTML={{ __html: text}} />
      </Tooltip>
      }
    >
      {children}
    </OverlayTrigger>
  )
}

export default PopoverComponent;

let texto=`<strong>Hola Mundo</strong>`

/* const tooltip = (

); */