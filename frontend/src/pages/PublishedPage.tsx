import NavBar from "../components/Navbar";
import DetailedBlog from "./DetailedBlog";

function PublishedPage() {
  return (
    <div>
      <NavBar />
      <div>
        <div className="flex justify-center px-4">
          <div className="max-w-4xl w-full md:mt-12">
            <DetailedBlog />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublishedPage;
