import { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { logoutUser} from '../../redux/actions/usuarioActions';
import NavBar from '../navbar/NavBar';
import SideBar from '../sidebar/SideBar';
import Footer from "../Footer/Footer";
import {SipContext} from "../SoftPhone/SipProvider/SipProvider";


function MainLayout(props) {

    const { currentUser, logoutUser } = props;
    const sip = useContext(SipContext);


    useEffect(()=>{
       sip.setJsSipConfig(prevState => ({...prevState,user:currentUser?.userExtensions[0]?.username,
           password:currentUser?.userExtensions[0]?.password,host:'app.newbound.com.do', port:'8089',
           pathname:'/asterisk/ws', debug:false, secure:true}))
    },[currentUser])

    return (
        <>
        <header>
                <NavBar currentUser={currentUser} logoutUser={logoutUser} sip={sip}/>
        </header>
        <div className="app-main">
        <SideBar/>
        <div className="main app-main__outer">
            <div className="app-main__inner main__move">
                    {props.children}
            </div>
        </div>
            <footer>
                <Footer/>
            </footer>
        </div>

        </>
    )
}

const mapStateToProps = state=>{
    return{
        currentUser:state.user.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => {
            dispatch({type: logoutUser()})
        },
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
