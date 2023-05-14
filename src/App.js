import { Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import FavoriteLocationItem from "./components/FavoriteLocationItem";
import "./App.css";

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/:city" component={FavoriteLocationItem} />
  </Switch>
);

export default App;
