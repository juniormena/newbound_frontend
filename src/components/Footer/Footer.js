import newboundLogo from "../../assets/images/logo.SVG";
import { appVersion } from "../../config.json";

function Footer({ move=true }) {
    return (
        <div className={`app-wrapper-footer bg-navbar footer ${move ? 'footer__move' : '' }`} style={{zIndex:1000}}>
            <div className="app-footer">
                <div className="app-footer__inner">
                    <div className="app-footer-left">
                        <a href="/"><img src={newboundLogo}  alt="newbound_logo" height="33"
                                         loading="lazy"/></a>
                    </div>

                    <div className="app-footer-right">
                        <span>
                            <strong>
                                Versión:
                            </strong> {appVersion} - powered by
                    <a href="https://hunter.do/" target="_blank" rel="noreferrer external"
                       className="text-decoration-none"> Hunter del caribe</a>
                    </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;