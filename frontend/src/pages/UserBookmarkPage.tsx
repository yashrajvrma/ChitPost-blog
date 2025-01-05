import NavBar from "../components/Navbar";
import UserBookmarkedPost from "../components/UserBookmarkedPost";

function UserBookmarkPage() {
  return (
    <div className="flex flex-col w-full sm:max-w-4xl mx-auto">
      <NavBar />
      <UserBookmarkedPost />
    </div>
  );
}

export default UserBookmarkPage;
