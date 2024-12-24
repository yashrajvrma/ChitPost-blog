import { Editor } from "novel-lightweight";
import { JSONContent } from "@tiptap/core";
import { useEffect, useState } from "react";
import axios from "axios";

interface outputData {
  data: JSONContent;
}

export default function App() {
  const [data, setData] = useState<outputData | undefined>(undefined); // console.log(data);

  useEffect(() => {
    console.log("data is" + JSON.stringify(data, null, 2));
  }, [data]);

  return (
    <Editor
      className="bg-transparent font-sans text-base"
      defaultValue={""}
      disableLocalStorage={true}
      onUpdate={(editor) => {
        const jsonData = editor?.getJSON();
        if (jsonData) {
          setData({ data: jsonData }); // Update state with the correct structure
        }
      }}
      // onUpdate={(editor) => {
      //   setData(editor?.storage.markdown.getMarkdown());
      // }}
      handleImageUpload={async (file) => {
        if (!file) {
          return "No file selected";
        }
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "MediumBlog-Images");
        data.append("cloud_name", "dspu4ehu3");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dspu4ehu3/image/upload",
          data
        );
        const imageUrl = response.data.url;

        if (imageUrl) {
          return imageUrl;
        }
        return "www.example.com/failed-upload.png";
      }}
    />
  );
}
