import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { test } from "vitest";
import { App } from "../App";
import { store } from "@crypto-stream/store";

test("renders App", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
