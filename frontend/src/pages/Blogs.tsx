import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import NavBar from "../components/Navbar";

interface Blog {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
  author: Author;
}
interface Author {
  firstName: string;
  lastName: string;
  profileColor: string;
}

interface ParsedContent {
  title: string;
  content: string;
  imageUrl?: string;
}

// const extractContentAndMetadata = (jsonContent: string): ParsedContent => {
//   try {
//     // Parse the JSON content
//     const parsed = JSON.parse(jsonContent);
//     let title = "";
//     let imageUrl = "";
//     let contentNodes: any[] = [];
//     let foundTitle = false;

//     // Recursive function to process nodes and extract title, content, and image
//     const processNode = (node: any): void => {
//       // Extract title from heading tags
//       if (
//         !foundTitle &&
//         node.type === "tag" &&
//         ["h1", "h2", "h3"].includes(node.name)
//       ) {
//         title = node.children?.[0]?.data || "";
//         foundTitle = true;
//         return; // Skip adding this node to content
//       }

//       // Extract image URL from img tags
//       if (
//         node.type === "tag" &&
//         node.name === "img" &&
//         node.attribs?.src &&
//         !imageUrl
//       ) {
//         imageUrl = node.attribs.src;
//       }

//       // Add non-title nodes to content
//       if (
//         foundTitle ||
//         (node.type === "tag" && !["h1", "h2", "h3"].includes(node.name))
//       ) {
//         // Don't include the image tag in the content if it's the featured image
//         if (
//           !(
//             node.type === "tag" &&
//             node.name === "img" &&
//             node.attribs?.src === imageUrl
//           )
//         ) {
//           contentNodes.push(node);
//         }
//       }

//       // Process children recursively
//       if (node.children) {
//         node.children.forEach(processNode);
//       }
//     };

//     // Start processing from the root node
//     processNode(parsed);

//     // Convert remaining content nodes back to text
//     let contentText = "";
//     const extractText = (nodes: any[]): void => {
//       nodes.forEach((node) => {
//         if (node.type === "text") {
//           contentText += node.data + " ";
//         }
//         if (node.children) {
//           extractText(node.children);
//         }
//       });
//     };

//     extractText(contentNodes);
//     console.log("title is from blog" + title);
//     return {
//       title: title,
//       content: contentText.trim(),
//       imageUrl: imageUrl,
//     };
//   } catch (error) {
//     console.error("Error processing content:", error);
//     return {
//       title: "Untitled",
//       content: "",
//       imageUrl: undefined,
//     };
//   }
// };

// Updated Blogs component using the new extraction function
const extractContentAndMetadata = (jsonContent: string): ParsedContent => {
  try {
    // Parse the JSON content
    const parsed = JSON.parse(jsonContent);
    let title = "";
    let imageUrl = "";
    let contentNodes: any[] = [];
    let foundTitle = false;

    // Helper function to check if a node is a heading
    const isHeadingNode = (node: any): boolean => {
      return node.type === "tag" && ["h1", "h2", "h3"].includes(node.name);
    };

    // Helper function to extract text content from a node
    const getNodeText = (node: any): string => {
      if (node.children) {
        return node.children
          .map((child: any) => {
            if (child.type === "text") {
              return child.data;
            } else if (child.type === "tag") {
              return getNodeText(child);
            }
            return "";
          })
          .join("");
      }
      return "";
    };

    // Function to find the first heading of specified type
    const findFirstHeading = (
      node: any,
      headingType: string
    ): string | null => {
      if (node.type === "tag" && node.name === headingType) {
        return getNodeText(node);
      }
      if (node.children) {
        for (const child of node.children) {
          const foundTitle = findFirstHeading(child, headingType);
          if (foundTitle) {
            return foundTitle;
          }
        }
      }
      return null;
    };

    // Try to find title in order: h1 -> h2 -> h3
    const headingTypes = ["h1", "h2", "h3"];
    for (const headingType of headingTypes) {
      const foundTitle = findFirstHeading(parsed, headingType);
      if (foundTitle) {
        title = foundTitle;
        break;
      }
    }

    // Recursive function to process nodes and extract content and image
    const processNode = (node: any): void => {
      // Extract image URL from img tags
      if (
        node.type === "tag" &&
        node.name === "img" &&
        node.attribs?.src &&
        !imageUrl
      ) {
        imageUrl = node.attribs.src;
      }

      // Add non-title nodes to content
      if (!isHeadingNode(node) || node.name !== headingTypes[0]) {
        contentNodes.push(node);
      }

      // Process children recursively
      if (node.children) {
        node.children.forEach(processNode);
      }
    };

    // Start processing from the root node
    processNode(parsed);

    // Convert remaining content nodes back to text
    let contentText = "";
    const extractText = (nodes: any[]): void => {
      nodes.forEach((node) => {
        if (node.type === "text") {
          contentText += node.data + " ";
        }
        if (node.children) {
          extractText(node.children);
        }
      });
    };

    extractText(contentNodes);

    return {
      title: title || "Untitled", // Fallback to "Untitled" if no heading is found
      content: contentText.trim(),
      imageUrl: imageUrl,
    };
  } catch (error) {
    console.error("Error processing content:", error);
    return {
      title: "Untitled",
      content: "",
      imageUrl: undefined,
    };
  }
};
function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/post/view/bulk`
        );
        if (response.data.blogs) {
          setBlogs(response.data.blogs);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllBlogs();
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center mt-10">
        <div className="w-full max-w-5xl px-4">
          {blogs.map((blog) => {
            // Use the new extraction function to get title, content, and image URL
            const { title, content, imageUrl } = extractContentAndMetadata(
              blog.content
            );
            return (
              <BlogCard
                key={blog.id}
                id={blog.id}
                firstName={blog.author.firstName}
                lastName={blog.author.lastName}
                title={title}
                content={content}
                profileColor={blog.author.profileColor}
                createdAt={blog.createdAt}
                imageUrl={
                  imageUrl || "https://source.unsplash.com/random/400x300"
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Blogs;
