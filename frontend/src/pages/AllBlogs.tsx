import NavBar from "../components/Navbar";
import Blogs from "./Blogs";

function AllBlogs() {
  return (
    <div className="flex flex-col w-full sm:max-w-4xl mx-auto">
      <NavBar />
      <div className="flex flex-col justify-start sm:text-lg text-base text-slate-900 font-medium mt-10 px-4">
        Published Posts
      </div>
      <Blogs take={""} skeletonNum={2} />
    </div>
  );
}

export default AllBlogs;
