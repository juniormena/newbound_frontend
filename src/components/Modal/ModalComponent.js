import Modal from 'react-bootstrap/Modal';

function ModalComponent({children, handleClose, show, title, size}) {
    return (
        <>
        <Modal size={size || "lg"} show={show} onHide={handleClose} backdrop="static" keyboard={false} scrollable={true}>
          <Modal.Header closeButton className="base-background-gradient text-white">
            <Modal.Title className="text-uppercase">{title}</Modal.Title>
          </Modal.Header>
            <Modal.Body >{children}</Modal.Body >
        </Modal>
      </>
    )
}

export default ModalComponent;


