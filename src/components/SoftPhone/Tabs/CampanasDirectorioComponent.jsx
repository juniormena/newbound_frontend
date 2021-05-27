import React from 'react'
import icoGreenButton from "../img/icoGreenButton.svg";

function CampanasDirectorioComponent({ Campanas, sip, handleDirectorio }) {

    return (
      <ul className='tab-contentUl' style={{fontSize:'12px'}}>
      {Campanas.map((CampanaInfo,index) => (
          <li className='tab-contentli ' key={index+1}>
              <i className="fa fa-user"/>
            <div className="info">
              <span className="name">{CampanaInfo.contacto} <span className="number"> - {CampanaInfo.telefono} </span> 
              <span className="name"> - {CampanaInfo.extension} </span>
              </span>
             
              <span className="departamento ">{CampanaInfo.cliente} - <span className="name">{CampanaInfo.campana}</span></span>
            </div>
              <a className="btnCall" onClick={()=>{
                  sip.sip.wannaMakeADirectTransfer ? sip.makeBlindTransfer(CampanaInfo?.telefono) :sip.makeCall(`91${CampanaInfo?.telefono}`);
                  handleDirectorio();}}>
                  <img src={icoGreenButton} alt="ico green" />
              </a>
          </li>
        ))}
    </ul>
    )
}

export default React.memo(CampanasDirectorioComponent, (prevProps, newProps)=>
    prevProps.Campanas === newProps.Campanas);