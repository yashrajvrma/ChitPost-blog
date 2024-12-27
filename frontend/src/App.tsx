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
import DetailedBlogSkeleton from "./components/DetailedBlogSkeleton";

// import Blogs from "./pages/Blogs";

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
          <Route
            path={"/blogs/all"}
            element={
              <UserAuth>
                <UserAllBlogs />
              </UserAuth>
            }
          />
          <Route path={"/blogs"} element={<AllBlogs />} />
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
          <Route path={"/blog/ske"} element={<DetailedBlogSkeleton />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
