import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import UserAuth from "./pages/UserAuth";
import GuestOnly from "./pages/GuestOnly";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path={"/"}
            element={
              <UserAuth>
                <Home />
              </UserAuth>
            }
          />
          <Route
            path={"/signup"}
            element={
              <GuestOnly>
                <Signup />
              </GuestOnly>
            }
          />
          <Route
            path={"/signin"}
            element={
              <GuestOnly>
                <Signin />
              </GuestOnly>
            }
          />
          <Route path={"/post/:id"} element={<Blogs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
