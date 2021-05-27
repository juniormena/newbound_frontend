import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { FaFilter } from "react-icons/fa";
import "./FiltrosComponent.css";

function FiltrosComponent({ children,heigth }) {
  const [acordionState, setAcordionState] = useState(false);
  const handleToggleAccordionState = () => {
    setAcordionState(!acordionState);
  };

  function closeFiltrosComponent(){
    try {
      handleToggleAccordionState();
      document.getElementById("accordion-collapse").classList.remove("show");
    }catch(err){}
  }

  function openFiltrosComponent(){
    try{
      handleToggleAccordionState();
      document.getElementById("accordion-collapse").classList.toggle("show");
    }catch (err){}
  }

  return (
    <div>
      <Accordion className="mt-3 pl-2 ">
        <Card >
          <Card.Header>
            <h5>
              {" "}
              <FaFilter /> Filtros{" "}
            </h5>
          </Card.Header>
          <Accordion.Collapse eventKey="0" id={"accordion-collapse"}>
            <Card.Body className="filterBody " style={{height:heigth}}>{children(closeFiltrosComponent)}</Card.Body>
          </Accordion.Collapse>

          <Card.Footer
            variant="link"
            onClick={openFiltrosComponent}
            className="make-a-pointer "
          >
            <center className="mx-auto">
                <i className={`fa ${acordionState ? 'fa-minus' : 'fa-plus'} text-info collapse-icon`}/>
            </center>
          </Card.Footer>
        </Card>
      </Accordion>
    </div>
  );
}

export default FiltrosComponent;
