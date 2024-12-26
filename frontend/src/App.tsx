import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import UserAuth from "./pages/UserAuth";
import GuestOnly from "./pages/GuestOnly";
import PublishBlog from "./pages/PublishBlog";
import PublishedPage from "./pages/PublishedPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />} />
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
          {/* <Route path={"/blogs"} element={<Blogs />} /> */}
          <Route
            path={"/blog/:id"}
            element={
              <UserAuth>
                <PublishedPage />
              </UserAuth>
            }
          />
          <Route
            path={"/blog/create"}
            element={
              <UserAuth>
                <PublishBlog />
              </UserAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
