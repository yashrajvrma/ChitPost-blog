import NavBar from "../components/Navbar";
import UserPost from "../components/UserPost";

function UserBookmarkPage() {
  return (
    <div className="flex flex-col w-full sm:max-w-4xl mx-auto">
      <NavBar />
      <UserPost />
    </div>
  );
}

export default UserBookmarkPage;
