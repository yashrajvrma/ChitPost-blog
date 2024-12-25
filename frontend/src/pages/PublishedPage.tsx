import NavBar from "../components/Navbar";
import DetailedBlog from "./DetailedBlog";

function PublishedPage() {
  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="flex justify-center items-center">
        <div className=" md:max-w-5xl">
          <DetailedBlog />
        </div>
      </div>
    </div>
  );
}

export default PublishedPage;
