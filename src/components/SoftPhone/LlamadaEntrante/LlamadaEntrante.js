import icoEntrante from '../img/icoEntrante.svg';
import {connect} from "react-redux";


function LlamadaEntrante({ currentUser}){

    return (
            <div className="llamada-entrante">
                <img className="ico" src={icoEntrante} alt="Icon entrante"/>
                <h3>{currentUser.userLogin.data[0].u_nombre_completo}</h3>
                    <div className="info">
                        <h3 className="invisible">{currentUser.userLogin.data[0].u_nombre_completo}</h3>
                    </div>
                    <div className="number invisible">829.545.5445 - DNID: 1108</div>
                    <div className="buttons">
                        <div className="number">
                            Tu Extensión : {currentUser.isDynamicMember.data[0]?.interface?.split('/')[1]}
                        </div>

                        {/*currentUser?.campanas_supervision?.success
                        &&
                        <div className="number ml-2">--- Campaña(s): {currentUser?.campanas_supervision?.data?.map(cam=>cam?.nombre).join(", ")}</div>*/}
                    </div>
            </div>
    )
}

const mapStateToProps = state=>{
    return{
        currentUser:state.user.currentUser
    }
}

export default connect(mapStateToProps, null)(LlamadaEntrante);