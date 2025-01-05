import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import UserAuth from "./pages/UserAuth";
import GuestOnly from "./pages/GuestOnly";
import PublishBlog from "./pages/PublishBlog";
import PublishedPage from "./pages/PublishedPage";
import AllBlogs from "./pages/AllBlogs";
import UserAllBlogs from "./pages/UserAllBlogs";
import UserBookmarkPage from "./pages/UserBookmarkPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Home route */}
          <Route path={"/"} element={<Home />} />
          {/* Auth route */}
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

          {/* Blogs route */}
          <Route path={"/blogs"} element={<AllBlogs />} />
          <Route
            path={"/blogs/all"}
            element={
              <UserAuth>
                <UserAllBlogs />
              </UserAuth>
            }
          />
          <Route
            path={"/blogs/all/saved"}
            element={
              <UserAuth>
                <UserBookmarkPage />
              </UserAuth>
            }
          />
          <Route path={"/blog/:id"} element={<PublishedPage />} />
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
