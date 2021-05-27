import "./pageNotFound.scss";
import sonrisa from "../../assets/images/sonrisa.png";

function PageNotFound() {
    return (
        <div id="notfound-page">
            <div className="notfound-page">
                <div className="notfound-page-404">
                    <h1>NEWBOUND</h1>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <h1>Autenticando...</h1>
                </div>

                <img src={sonrisa} alt="Newbound logo" className="w-50"/>


                <h2>Redirigiendo a {window.location.origin}</h2>

                <p>
                    Lo sentimos, la pagina que has solicitado no la hemos podido encontrar.
                    Por favor, contactanos a tecnologia@hunter.do
                </p>
                <a className="btn btn-primary d-none" href="/">
                    Ir al inicio
                </a>

            </div>
        </div>
    )
}

export default PageNotFound;
