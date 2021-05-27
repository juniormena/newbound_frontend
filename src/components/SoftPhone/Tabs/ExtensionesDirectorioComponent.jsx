import React from 'react'
import icoGreenButton from "../img/icoGreenButton.svg";

function ExtensionesDirectorioComponent({ Extensiones, sip, handleDirectorio }) {

  return (
    <ul className='tab-contentUl'>
      {
        Extensiones.map((extensionInfo, index) => (
          <li className='tab-contentli ' key={index}>
            <i className="fa fa-user"/>
            <div className="info">
              <span className="name">{extensionInfo.username} -  <span className="number">{extensionInfo.extension}</span> </span>
             
              <span className="departamento mr-5">{extensionInfo.departamento}</span>
            </div>
            <a className="btnCall" onClick={()=>{
              sip.sip.wannaMakeADirectTransfer ? sip.makeBlindTransfer(extensionInfo?.extension) : sip.makeCall(extensionInfo?.extension);
              handleDirectorio();}}>
              <img src={icoGreenButton} alt="ico green" />
            </a>
          </li>
        ))
      }
    </ul>

  )
}

export default React.memo(ExtensionesDirectorioComponent, (prevProps, newProps)=>
    prevProps.Extensiones === newProps.Extensiones);