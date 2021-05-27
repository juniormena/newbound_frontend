import Modal from 'react-bootstrap/Modal';

function ModalComponent2({children, handleClose, show, title,size="lg"}) {
    return (
        <>
        <Modal size={size} show={show} onHide={handleClose} backdrop="static" keyboard={false} 
        
        >
          <Modal.Header closeButton className="base-background-gradient text-white">
            <Modal.Title className="text-uppercase">{title}</Modal.Title>
          </Modal.Header>
            <Modal.Body >{children}</Modal.Body >
        </Modal>
      </>
    )
}

export default ModalComponent2;


