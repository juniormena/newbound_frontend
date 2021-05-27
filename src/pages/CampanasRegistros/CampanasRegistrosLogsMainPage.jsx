

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TableComponentSInHeader from "../../components/Table/TableComponentSInHeader";
import CampanasRegistrosLogsLista from "../../components/Campanas_registros/CampanaRegistroLogs/CampanasRegistrosLogsMain";
import { Link } from "react-router-dom";
import TableComponentSinBotones from "../../components/Table/TableComponentSinBotones";
import ModalComponent from "../../components/Modal/ModalComponent";
import CampanasRegistroDetalles from "../../components/Campanas_registros/CampanasRegistroDetalles";
import useModal from "../../hooks/useModal";
import CampanasLogsPorLlamada from "./CampanasLogsPorLlamada";
import CampanasRegistrosLogsMain from "../../components/Campanas_registros/CampanaRegistroLogs/CampanasRegistrosLogsMain";


export default function CampanasRegistrosLogsMainPage({campanaRegistro}) {
  const { currentUser } = useSelector(state => state.user)
  return (
    <>
     <CampanasRegistrosLogsMain campanaInfo={campanaRegistro} />
    </>
  )
}
