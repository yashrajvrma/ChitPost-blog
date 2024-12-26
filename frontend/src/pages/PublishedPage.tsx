import NavBar from "../components/Navbar";
import DetailedBlog from "./DetailedBlog";

function PublishedPage() {
  return (
    <div className="flex flex-col w-full sm:max-w-4xl mx-auto">
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
