import { OverlayTrigger, Popover } from "react-bootstrap";

function PopoverComponent({ title, text, placement, children }) {
  return (
    <OverlayTrigger
      rootClose
      trigger={["hover","focus"]}
      key={text}
      placement={placement}
      overlay={
        <Popover id="popover-basic">
          <Popover.Title as="h3">{title}</Popover.Title>
          <Popover.Content>{text}</Popover.Content>
        </Popover>
      }
    >
      {children}
    </OverlayTrigger>
  );
}

export default PopoverComponent;