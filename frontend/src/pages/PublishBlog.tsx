import EditorComponent from "../components/EditorComponent";
import NavBar from "../components/Navbar";

function PublishBlog() {
  return (
    <div className="flex flex-col sm:max-w-4xl max-w-2xl mx-auto min-h-screen">
      {/* Navbar */}
      <div className="flex-shrink-0">
        <NavBar />
      </div>

      {/* Main Content */}
      <div className="flex flex-grow justify-center items-center font-sans overflow-hidden">
        <div className="max-w-xl md:max-w-4xl w-full h-full">
          <EditorComponent />
        </div>
      </div>
    </div>
  );
}

export default PublishBlog;
