import Homepage from "./components/Homepage";
import Profile from "./components/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditProfile from "./components/EditProfile";
import CreateProject from "./components/CreateProject";
import SingleProject from "./components/SingleProject";
import Explorers from "./components/Explorers";
import Explorer from "./components/Explorer";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Homepage />}></Route>
          <Route path="/dashboard" exact element={<Profile />}></Route>
          <Route path="/create-profile" exact element={<EditProfile />}></Route>
          <Route
            path="/create-project"
            exact
            element={<CreateProject />}
          ></Route>
          <Route path="/project/:id" exact element={<SingleProject />}></Route>
          <Route path="/explorers" exact element={<Explorers />}></Route>
          <Route path="/explorer/:id" exact element={<Explorer />}></Route>
          {/* <Route path="/project" exact component={Homepage} />
          <Route path="/dashboard" exact component={Homepage} />
          <Route path="/create-profile" exact component={Homepage} /> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
