import icoGreenButton from "../img/icoGreenButton.svg";
import {generateCampanaCall} from "../../../services/llamadasPrevService";

function LlamadaPrevContacsRow({ contactoCSS, contacto, dispatch, llamadaPrevData, currentUser }){
    return(
        <div className={contactoCSS.contactos__div}>
            <i className="fa fa-user mr-2"/>
            <span className={contactoCSS.contactos__name}>{contacto?.nombre} - </span>
            <span className={contactoCSS.contactos_number}>{contacto?.telefono}</span>
            <a href="#/" className="btnCallContacto ml-2"
               onClick={()=>generateCampanaCall(currentUser?.userExtensions[0]?.username, llamadaPrevData?.campanaRegistroData, dispatch, contacto?.telefono, contacto?.nombre)}>
                <img className="btnCallContactoImage" src={icoGreenButton} alt="ico green" style={{width:"35px"}}/>
            </a>
        </div>
    )
}

export default LlamadaPrevContacsRow;

