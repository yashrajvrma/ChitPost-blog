import NavBar from "../components/Navbar";
import Blogs from "./Blogs";

function AllBlogs() {
  return (
    <div className="flex flex-col w-full sm:max-w-4xl mx-auto">
      <NavBar />
      <div>
        <Blogs take={""} />
      </div>
    </div>
  );
}

export default AllBlogs;
