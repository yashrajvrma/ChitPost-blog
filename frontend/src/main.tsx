import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./app/store";
import store from "./app/store.ts";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      {/* <Analytics /> */}
    </PersistGate>
    <Analytics />
  </Provider>
);
