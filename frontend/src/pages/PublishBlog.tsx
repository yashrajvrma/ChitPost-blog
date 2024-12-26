import EditorComponent from "../components/EditorComponent";
import NavBar from "../components/Navbar";

function PublishBlog() {
  return (
    <div className="flex flex-col justify-center sm:max-w-4xl max-w-2xl mx-auto">
      <div>
        <NavBar />
      </div>
      <div className="flex justify-center items-center h-screen md:mt-10 font-sans">
        <div className="max-w-xl md:max-w-4xl w-full h-full">
          <EditorComponent />
        </div>
      </div>
    </div>
  );
}

export default PublishBlog;
