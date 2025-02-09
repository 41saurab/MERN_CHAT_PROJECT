import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import "./index.css";

import RouterConfig from "./config/routerConfig";
import { store } from "./store/store";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterConfig />
    </Provider>
);
