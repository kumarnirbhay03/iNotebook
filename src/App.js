import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import NoteState from './context/notes/NoteState';
import Login from './component/Login';
import Signup from './component/Signup';
import AuthState from './context/auth/AuthState';
import Alert from './component/Alert';
import AlertState from './context/alert/AlertState';

function App() {

  return (
    <>
      <AuthState>
        <NoteState>
          <Router>
            <AlertState>
              <Navbar />
              <Alert />
              <div className="container">
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={
                      <Home />
                    }
                  ></Route>
                  <Route
                    exact
                    path="/about"
                    element={
                      <About />
                    }
                  ></Route>
                  <Route
                    exact
                    path="/login"
                    element={
                      <Login />
                    }
                  ></Route>
                  <Route
                    exact
                    path="/signup"
                    element={
                      <Signup />
                    }
                  ></Route>
                </Routes>
              </div>
            </AlertState>
          </Router>
        </NoteState>
      </AuthState>
    </>
  );
}

export default App;
