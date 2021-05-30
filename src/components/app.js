import DataService from "../services/data-service";
import Header from "./header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import BeatStarsPage from "../pages/beatstars";
import AirBitPage from "../pages/airbit";
import { useState } from "preact/hooks";

const BEATSTARS= 'beatstars';
const AIRBIT= 'airbit';

function App() {
  const dataService = new DataService();
  const [activeRoute, setActiveRoute] = useState('');

  return (
    <div id="app">
      <div class="container container__app">
        <Header />
        <Router>
          <div class="btn-group d-flex platforms" role="group">
            <Link class="w-100" to="/beatstars">
              <button onClick={() => setActiveRoute(BEATSTARS)} type="button" class="btn btn-lg w-100 beatstars-btn">
                <h2 className={activeRoute === BEATSTARS ? 'active-route' : ''}>BeatStars Trends</h2>
              </button>
            </Link>
            <Link class="w-100" to="/airbit">
              <button onClick={() => setActiveRoute(AIRBIT)} type="button" class="btn btn-lg w-100 airbit-btn">
                <h2 className={activeRoute === AIRBIT  ? 'active-route' : ''}>AirBit Trends</h2>
              </button>
            </Link>
          </div>
          <Switch>
            <Route
              path="/beatstars"
              render={() => <BeatStarsPage dataService={dataService} />}
            />
            <Route
              path="/airbit"
              render={() => <AirBitPage dataService={dataService} />}
            />
            <Route
              path="/"
              render={() => <BeatStarsPage dataService={dataService} />}
            />
          </Switch>
        </Router>
      </div>
      <footer class="bg-light text-center text-lg-start">
        <div
          class="text-center p-3"
          style="background-color: rgba(0, 0, 0, 0.2)"
        >
          <a class="text-dark" href={""}>
            © 2021 BeatStars Search Trends
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
