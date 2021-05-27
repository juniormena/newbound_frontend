import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import {store} from './store/store';
import {Provider} from "react-redux";
import serviceWorker from "./serviceWorker";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {SipProvider} from "./components/SoftPhone/SipProvider/SipProvider";
import {LoadingProvider} from "./components/Loading/LoadingProvider";
import {CounterProvider} from "./components/Counter/CounterProvider";


ReactDOM.render(
    <Provider store={store}>
        <SipProvider>
            <LoadingProvider>
                <CounterProvider>
                    <ErrorBoundary>
                        <App/>
                    </ErrorBoundary>
                </CounterProvider>
            </LoadingProvider>
        </SipProvider>
    </Provider>,
    document.getElementById("root")
);

serviceWorker();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
