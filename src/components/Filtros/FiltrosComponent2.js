import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { FaFilter } from "react-icons/fa";
import "./FiltrosComponent.css";

function FiltrosComponent2({ children,heigth }) {
  const [acordionState2, setAcordionState2] = useState(false);
  const handleToggleAccordionState2 = () => {
    setAcordionState2(!acordionState2);
  };

  function closeFiltrosComponent2(){
    try {
      handleToggleAccordionState2();
      document.getElementById("accordion-collapse2").classList.remove("show");
    }catch(err){}
  }

  function openFiltrosComponent2(){
    try{
      handleToggleAccordionState2();
      document.getElementById("accordion-collapse2").classList.toggle("show");
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
          <Accordion.Collapse eventKey="0" id={"accordion-collapse2"}>
            <Card.Body className="filterBody " style={{height:heigth}}>{children(closeFiltrosComponent2)}</Card.Body>
          </Accordion.Collapse>

          <Card.Footer
            variant="link"
            onClick={openFiltrosComponent2}
            className="make-a-pointer "
          >
            <center className="mx-auto">
                <i className={`fa ${acordionState2 ? 'fa-minus' : 'fa-plus'} text-info collapse-icon`}/>
            </center>
          </Card.Footer>
        </Card>
      </Accordion>
    </div>
  );
}

export default FiltrosComponent2;
