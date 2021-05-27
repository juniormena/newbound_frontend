import React, {useEffect, useState} from "react";
import $ from "jquery";
import "metismenu";
import {connect} from "react-redux";
import {currentUser} from "../../redux/actions/usuarioActions";
import {getMenusPadres, toggleTheMenu} from "../../lib/helpers";

const Link = require("react-router-dom").Link;

function SideBar(props) {
    const {getcurrentUser, currentUser} = props;
    const [menuPadre, setMenuPadre] = useState([]);

    useEffect(() => {
        $(".vertical-nav-menu").metisMenu();
    }, []);

    useEffect(() => {
        getcurrentUser();
    }, [getcurrentUser]);

    //console.log('menu en side bar = ',currentUser.menuPerfilUsuario.data);

    useEffect(() => {
        getMenusPadres(currentUser.menuPerfilUsuario.data, setMenuPadre);

        //console.log('menu padre =', menuPadre)
    }, [currentUser.menuPerfilUsuario.data]);

    // console.log('afuera',menuPadre)
    return (
        <div
            id="sidenav"
            className="app-sidebar sidebar-shadow  bg-secondary sidebar-text-light"
        >
            <div className="scrollbar-sidebar scrollbar-sidebar--overflow">
                <div className="app-sidebar__inner">
                    <ul className="vertical-nav-menu">
                        {menuPadre.map((menuPadre, index) => (
                            <React.Fragment key={index + 1}>
                                {menuPadre.m_cod_padre === 0 ? (
                                    <li className="app-sidebar__heading">{menuPadre.m_nombre}</li>
                                ) : (
                                    <></>
                                )}
                                {menuPadre.m_cod_padre === 0 && menuPadre.m_bit_padre === 1 ? (
                                    <></>
                                ) : (
                                    <li>
                                        <a href="#" onClick={(e) => toggleTheMenu(e, "a")}>
                                            <i
                                                className={`metismenu-icon fa ${menuPadre.m_icon} sidebar__icon-color`}
                                            />
                                            {menuPadre.m_nombre}
                                            <i className="metismenu-state-icon pe-7s-angle-down caret-left"
                                               onClick={(e) => toggleTheMenu(e, "i")}/>
                                        </a>
                                        <ul className="mm-collapse">
                                            {currentUser.menuPerfilUsuario.data.map(
                                                (men) =>
                                                    menuPadre.mp_id_menu === men.m_cod_padre && (
                                                        <li key={men.mp_id_menu}>
                                                            <Link to={`${men.m_url}`}>
                                                                <i className="metismenu-icon"/>
                                                                {men.m_nombre}
                                                            </Link>
                                                        </li>
                                                    )
                                            )}
                                        </ul>
                                    </li>
                                )}
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getcurrentUser: () => {
            dispatch({type: currentUser()});
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SideBar,(prevProps, newProps) =>
    prevProps.currentUser.menuPerfilUsuario.data.length ===
    newProps.currentUser.menuPerfilUsuario.data.length));
