import { Editor } from "novel-lightweight";
import { useState, useEffect } from "react";
import axios from "axios";
import { parseDocument } from "htmlparser2";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Type for the JSON structure
type HtmlNode = {
  type: string;
  name?: string;
  attribs?: { [key: string]: string };
  data?: string;
  children?: HtmlNode[];
};

export default function EditorComponent() {
  const accessToken = localStorage.getItem("accessToken");
  const [editorData, setEditorData] = useState<string | undefined>(undefined);
  const [isPublishable, setIsPublishable] = useState<boolean>(false);
  const navigate = useNavigate();

  // Function to convert HTML node to JSON structure
  const convertNodeToJson = (node: any): HtmlNode => {
    const jsonNode: HtmlNode = {
      type: node.type,
    };

    if (node.name) {
      jsonNode.name = node.name;
    }

    if (node.attribs && Object.keys(node.attribs).length > 0) {
      jsonNode.attribs = node.attribs;
    }

    if (node.type === "text") {
      jsonNode.data = node.data;
    }

    if (node.children && node.children.length > 0) {
      jsonNode.children = node.children.map((child: any) =>
        convertNodeToJson(child)
      );
    }

    return jsonNode;
  };

  // Function to convert HTML to JSON
  const htmlToJson = (html: string) => {
    const dom = parseDocument(html, {
      lowerCaseTags: true,
      lowerCaseAttributeNames: true,
    });

    const jsonStructure = {
      type: "root",
      children: dom.children.map((node) => convertNodeToJson(node)),
    };

    return jsonStructure;
  };

  // Function to check if the editor content is empty or placeholder
  const isEditorEmpty = (html: string): boolean => {
    const jsonContent = htmlToJson(html);
    // Check if the editor contains only an empty paragraph or no meaningful content
    return (
      !jsonContent.children ||
      jsonContent.children.length === 0 ||
      (jsonContent.children.length === 1 &&
        jsonContent.children[0].name === "p" &&
        (!jsonContent.children[0].children ||
          jsonContent.children[0].children.length === 0))
    );
  };

  // Handle publishing the editor data
  const handlePublish = async () => {
    if (!isPublishable) {
      toast.error("Editor content is empty!");
      return;
    }

    try {
      // Convert HTML to JSON structure
      const jsonContent = htmlToJson(editorData || "");

      await toast.promise(
        axios.post(
          `${import.meta.env.VITE_BASE_URL}/post/publish`,
          {
            content: JSON.stringify(jsonContent), // Convert to string for transmission
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        ),
        {
          loading: "Waiting for the response...",
          success: "Post Published successfully!",
          error: "Something went wrong, Please try again.",
        },
        {
          style: {
            minWidth: "250px",
          },
          success: {
            duration: 2000,
            icon: "✅",
          },
          error: {
            duration: 1000,
            icon: "❌",
          },
        }
      );

      // Optionally handle the response
      console.log("Successfully published");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error publishing content:", error);
      toast.error("Failed to publish the post. Please try again.");
    }
  };

  // Image upload handler
  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      if (!file) {
        throw new Error("No file selected");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "MediumBlog-Images");
      formData.append("cloud_name", "dspu4ehu3");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dspu4ehu3/image/upload",
        formData
      );

      if (response.data.url) {
        return response.data.url;
      }
      throw new Error("Image upload failed");
    } catch (error) {
      console.error("Error uploading image:", error);
      return "Error uploading image";
    }
  };

  useEffect(() => {
    // Update the `isPublishable` state whenever `editorData` changes
    setIsPublishable(editorData ? !isEditorEmpty(editorData) : false);
  }, [editorData]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Editor Container */}
      <div className="flex-grow">
        <Editor
          className="bg-transparent font-sans text-base h-full"
          defaultValue=""
          disableLocalStorage={true}
          onUpdate={(editor) => {
            setEditorData(editor?.getHTML() || "");
          }}
          handleImageUpload={handleImageUpload}
        />
      </div>

      {/* Publish Button */}
      <div className="fixed md:bottom-8 md:right-10 bottom-5 right-5">
        <button
          onClick={handlePublish}
          className={`flex items-center md:text-lg justify-center md:px-7 md:py-3 px-5 py-2 text-base font-semibold rounded-md transition-colors duration-200 ${
            isPublishable
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-green-500 text-gray-300 hover:cursor-not-allowed"
          }`}
          disabled={!isPublishable}
        >
          Publish
        </button>
        <Toaster containerClassName="text-lg font-sans" />
      </div>
    </div>
  );
}
