import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/home";
import Tips from "../pages/tips";
import Inventory from "../pages/inventory";
import SearchPage from "../pages/search";
import ErrorPage from "../pages/errorPage";
import List from "../pages/list";
import RecipesPage from "../pages/recipes";

function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/tips/:name/:id">
          <Tips />
        </Route>
        <Route path="/inventory" exact>
          <Inventory />
        </Route>
        <Route path="/search" exact>
          <SearchPage />
        </Route>
        <Route path="/list" exact>
          <List />
        </Route>
        <Route path="/recipes" exact>
          <RecipesPage />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </div>
  );
}

export default Routes;
