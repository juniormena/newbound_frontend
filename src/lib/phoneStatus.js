import TooltipComponent from "../components/Toolttip/TooltipComponent";
import {FaPhoneAlt} from "react-icons/fa";

export function sipPhoneStatus({ sip }){
    let colorClass =  sip.success ? 'text-success' : 'text-danger';
    return (
        <TooltipComponent text={sip.sipErrorMessage} placement="bottom">
            <FaPhoneAlt className={`navbar-link__icon ${colorClass}`} />
        </TooltipComponent>
    )
}