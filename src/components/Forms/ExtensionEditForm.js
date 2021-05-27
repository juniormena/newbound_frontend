import React,{ useEffect, useState, useRef } from "react";
import Stepper from "bs-stepper";
import StepperHeader from '../Stepper/StepperHeader';
import Step from "../Stepper/Step";
import TipoExtension from "../Extensiones/TipoExtension";
import DatosExtension from "../Extensiones/DatosExtension";


function ExtensionEditForm({ selectedExtension, update }) {
    const [extension, setExtension] = useState({id:'',tipo_extension:'',transport:'0',id_empresa:'0',usuario_id:'0', callerid:'',grabar:true})
    const [completed, setCompleted] = useState(false);
    const stepper = useRef(null);
    const steps = [
        {name:'TIPO EXTENSION', target:'#tipo-extension', completed},
        {name:'DATOS EXTENSION', target:'#datos-extension'}
    ]
    
    useEffect(() => {
        stepper.current = new Stepper(document.querySelector("#stepper"), {
          linear: true,
          animation: true,
        });
    },[]);

    useEffect(()=>{
        setExtension({id:selectedExtension[0].id,tipo_extension:selectedExtension[0].tipo_extension,
            transport:selectedExtension[0].transport,id_empresa:selectedExtension[0].e_id,usuario_id:selectedExtension[0].u_id, 
            callerid:selectedExtension[0].callerid})

        document.getElementById("tipo-extension").childNodes[0].children[0].children[1].setAttribute("disabled",true);
        document.getElementById("tipo-extension").childNodes[0].children[1].children[1].setAttribute("disabled",true);
    },[selectedExtension])
    
  return (
    <div id="stepper" className="bs-stepper">

    <StepperHeader>
          {steps.map((step,index, array)=><Step key={index+1} step={step} index={index} 
          steps={array}/>)}
    </StepperHeader>
    
    <div className="bs-stepper-content">
      <form onSubmit={(e) => e.preventDefault()}>

        <div id="tipo-extension" className="content">
            <TipoExtension extension={extension} setExtension={setExtension} stepper={stepper} 
            completed={completed} setCompleted={setCompleted}/>
        </div>

        <div id="datos-extension" className="content">
            <DatosExtension extension={extension} setExtension={setExtension} stepper={stepper} 
            completed={completed} setCompleted={setCompleted} update={update}/>
        </div>
      </form>
    </div>
  </div>
  );
}

export default ExtensionEditForm;
