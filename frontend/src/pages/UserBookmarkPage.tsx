import NavBar from "../components/Navbar";
import UsersPost from "./UsersPost";

function UserBookmarkPage() {
  return (
    <div className="flex flex-col w-full sm:max-w-4xl mx-auto">
      <NavBar />
      <UsersPost />
    </div>
  );
}

export default UserBookmarkPage;
