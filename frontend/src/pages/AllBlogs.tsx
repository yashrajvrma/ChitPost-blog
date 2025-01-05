import NavBar from "../components/Navbar";
import Blogs from "./Blogs";

function AllBlogs() {
  return (
    <div className="flex flex-col w-full sm:max-w-4xl mx-auto">
      <NavBar />
      <div className="flex flex-col justify-start sm:text-5xl text-3xl text-slate-900 font-semibold sm:mt-15 mt-10 px-4">
        Published Posts
      </div>
      <Blogs take={""} skeletonNum={3} />
    </div>
  );
}

export default AllBlogs;
