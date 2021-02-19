import "../styles/vars.scss";
import "../styles/global.scss";
import type { AppProps /*, AppContext */ } from "next/app";
import { Provider } from "next-auth/client";

import { useReducer } from "react";
import { appStateContext, dispatcherContext } from "../lib/reducer/context";
import reducer from "../lib/reducer/reducer";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, {
    selectedDocument: {},
    triggerSave: false,
  });

  return (
    <Provider session={pageProps.session}>
      <appStateContext.Provider value={state}>
        <dispatcherContext.Provider value={dispatch}>
          <Component {...pageProps} />
        </dispatcherContext.Provider>
      </appStateContext.Provider>
    </Provider>
  );
}
