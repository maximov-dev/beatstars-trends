import DataService from "../services/data-service";
import Header from "./header";
import { Route, Switch, Link, Redirect, useLocation } from "wouter";
import BeatStarsPage from "../pages/beatstars";
import AirBitPage from "../pages/airbit";

const BEATSTARS= 'beatstars';
const AIRBIT= 'airbit';

function App() {
  const dataService = new DataService();
  const [route,] = useLocation();
  const filteredRoute = route.replace(/\W/g, '');

  return (
    <div id="app">
      <div class="container container__app">
        <Header />
          <div class="btn-group d-flex platforms" role="group">
            <Link class="w-100" to="/beatstars">
              <button type="button" class="btn btn-lg w-100 beatstars-btn">
                <h2 className={filteredRoute === BEATSTARS ? 'active-route' : ''}>BeatStars Trends</h2>
              </button>
            </Link>
            <Link class="w-100" to="/airbit">
              <button type="button" class="btn btn-lg w-100 airbit-btn">
                <h2 className={filteredRoute === AIRBIT  ? 'active-route' : ''}>AirBit Trends</h2>
              </button>
            </Link>
          </div>
          <Switch>
            <Route
              path="/beatstars"            >
              {() => <BeatStarsPage dataService={dataService} />}
            </Route>
            <Route
              path="/airbit"
            >
               {() => <AirBitPage dataService={dataService} />}
            </Route>
            <Redirect to="/beatstars" />
          </Switch>
      </div>
      <section class="text-dark questions">
        <span>
          if you have any questions or suggestions please contact me: <a href="mailto:ifeelzbeatz@gmail.com">iFeelzBeatz@gmail.com</a>
        </span>
      </section>
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
