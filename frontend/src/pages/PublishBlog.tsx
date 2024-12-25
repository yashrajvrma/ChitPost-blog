import NavBarPublish from "../components/NavbarPublish";
import EditorComponent from "../components/EditorComponent";

function PublishBlog() {
  return (
    <div>
      <div>
        <NavBarPublish />
      </div>
      <div className="flex justify-center items-center h-screen mt-10 font-sans">
        <div className="max-w-xl md:max-w-4xl w-full h-full">
          <EditorComponent />
        </div>
        
      </div>
    </div>
  );
}

export default PublishBlog;
