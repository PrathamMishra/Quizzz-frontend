import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { store, persistedStore } from "./redux/store";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);
