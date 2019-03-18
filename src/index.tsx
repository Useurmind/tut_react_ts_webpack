import * as React from "react";
import * as ReactDOM from "react-dom";

import { MyFirstComponent } from "./components/MyFirstComponent";

ReactDOM.render(
  <MyFirstComponent greeting="Hello team!"/>,
  document.getElementById('root')
);