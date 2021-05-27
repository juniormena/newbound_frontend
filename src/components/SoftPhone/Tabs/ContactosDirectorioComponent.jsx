import React from 'react';
import icoGreenButton from "../img/icoGreenButton.svg";

function ContactosDirectorioComponent({contactos, sip, handleDirectorio}) {

    return (
        <ul className='tab-contentUl' style={{fontSize:'12px'}}>
        {contactos.map((contactoInfo,index) => (
            <li className='tab-contentli ' key={index}>
              <i className="fa fa-user"/>
              <div className="info">
                <span className="name">{contactoInfo.contactname} -  <span className="number">{contactoInfo.contacttelefono}</span> </span>
               
                <span className="departamento mr-5">{contactoInfo.contactcargo}</span>
              </div>
              <a className="btnCall" onClick={()=>{
                  sip.sip.wannaMakeADirectTransfer ? sip.makeBlindTransfer(`91${contactoInfo?.contacttelefono}`) : sip.makeCall(`91${contactoInfo?.contacttelefono}`);
                  handleDirectorio();}}>
                  <img src={icoGreenButton} alt="ico green" />
              </a>
            </li>
          ))}
      </ul>
    )
}

export default React.memo(ContactosDirectorioComponent, (prevProps, newProps)=>
    prevProps.contactos === newProps.contactos);
