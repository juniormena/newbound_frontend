import React from "react";
import "./errorBoundary.scss";
import sonrisa from "../../assets/images/sonrisa.png";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: "",
      errorMessage: "",
    };
  }

  componentDidCatch(error, errorInfo) {
    // También puedes registrar el error en un servicio de reporte de errores
    //logErrorToMyService(error, errorInfo);
    this.setState({
      hasError: true,
      error: error,
      errorMessage: errorInfo,
    });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    
    if (hasError) {
      // Puedes renderizar cualquier interfaz de repuesto
      return (
        <div id="notfound">
          <div className="notfound">
            <div className="notfound-404">
              <h1>Oops!</h1>
            </div>
            <img src={sonrisa} alt="Newbound logo" className="w-50" />
            <h2>NEWBOUND dejo de funcionar</h2>
            <p>
              La pagina que estas viendo es porque ha pasado un error muy grave
              en los servicios del sistema y ha dejado de funcionar.
            </p>
            <a className="btn btn-primary" href="/">
              Ir al inicio
            </a>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
