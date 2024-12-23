// import NavBarPublish from "../components/NavbarPublish";
import { createReactEditorJS } from "react-editor-js";
import CheckList from "@editorjs/checklist";

const ReactEditorJS = createReactEditorJS();

function PublishBlog() {
  return (
    <div>
      {/* <ReactEditorJS defaultValue={blocks} tools={{ checkList: CheckList }} />{" "} */}
      <div id="editorjs"></div>
    </div>
  );
}

export default PublishBlog;
