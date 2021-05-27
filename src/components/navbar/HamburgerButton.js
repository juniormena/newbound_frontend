function HamburgerButton() {


    function ToogleSideNav(){
        document.getElementById("sidenav").classList.toggle("sidenav__display");
        document.getElementsByClassName("app-main__inner")[0].classList.toggle("main__move");
        document.getElementsByClassName("footer")[0].classList.toggle("footer__move");
    }

    return (
        <>
            <button className="navbar__toggler navbar__toggler-ml" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation" onClick={ToogleSideNav}>
                <span className="navbar-toggler-icon"/>
            </button>
        </>
    )
}

export default HamburgerButton;
