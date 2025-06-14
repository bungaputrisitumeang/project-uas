import { Routes, Route } from "react-router-dom";

import "antd/dist/reset.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import "./assets/styles/adaptive.css";

import LoginPage from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Albums from "./pages/Albums";
import Blank from "./pages/Blank";
import CreatePlaylist from "./pages/CreatePlaylist";
import Explore from "./pages/Explore";
import Favorite from "./pages/Favorite";
import Playlists from "./pages/Playlists";
// import Gallery from "./pages/Gallery";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        {/* <Route exact path="/gallery" element={<Gallery />} /> */}
        <Route exact path="/albums" element={<PrivateRoute component={<Albums />} />} />
        <Route exact path="/create-playlist" element={<PrivateRoute component={<CreatePlaylist />} />} />
        <Route exact path="/explore" element={<PrivateRoute component={<Explore />} />} />
        <Route exact path="/favorite" element={<PrivateRoute component={<Favorite />} />} />
        <Route exact path="/playlists" element={<PrivateRoute component={<Playlists />} />} />
      </Routes>
    </div>
  );
}

export default App;
