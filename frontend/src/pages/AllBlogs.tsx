import NavBar from "../components/Navbar";
import UsersPost from "./UsersPost";

function AllBlogs() {
  return (
    <div className="flex flex-col w-full sm:max-w-4xl mx-auto">
      <NavBar />
      <div>
        <UsersPost />
      </div>
    </div>
  );
}

export default AllBlogs;
