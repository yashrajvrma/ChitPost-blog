import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";
import BlogSkeleton from "../components/BlogSkeleton";

// Adjusting the `Blog` type to better match expectations
interface Blog {
  id: string;
  content: object; // Update from string to object
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

// Extract function remains the same
// const extractContentAndMetadata = (jsonContent: string): ParsedContent => {
//   try {
//     const parsed = JSON.parse(jsonContent); // Parse JSON
//     let title = "";
//     let imageUrl = "";
//     let contentNodes: any[] = [];

//     const isHeadingNode = (node: any): boolean => {
//       return node.type === "tag" && ["h1", "h2", "h3"].includes(node.name);
//     };

//     const getNodeText = (node: any): string => {
//       if (node.children) {
//         return node.children
//           .map((child: any) => {
//             if (child.type === "text") {
//               return child.data;
//             } else if (child.type === "tag") {
//               return getNodeText(child);
//             }
//             return "";
//           })
//           .join("");
//       }
//       return "";
//     };

//     const findFirstHeading = (
//       node: any,
//       headingType: string
//     ): string | null => {
//       if (node.type === "tag" && node.name === headingType) {
//         return getNodeText(node);
//       }
//       if (node.children) {
//         for (const child of node.children) {
//           const foundTitle = findFirstHeading(child, headingType);
//           if (foundTitle) {
//             return foundTitle;
//           }
//         }
//       }
//       return null;
//     };

//     const headingTypes = ["h1", "h2", "h3"];
//     for (const headingType of headingTypes) {
//       const foundTitle = findFirstHeading(parsed, headingType);
//       if (foundTitle) {
//         title = foundTitle;
//         break;
//       }
//     }

//     const processNode = (node: any): void => {
//       if (
//         node.type === "tag" &&
//         node.name === "img" &&
//         node.attribs?.src &&
//         !imageUrl
//       ) {
//         imageUrl = node.attribs.src;
//       }

//       if (!isHeadingNode(node) || node.name !== headingTypes[0]) {
//         contentNodes.push(node);
//       }

//       if (node.children) {
//         node.children.forEach(processNode);
//       }
//     };

//     processNode(parsed);

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

//     return {
//       title: title || "Untitled",
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

const extractContentAndMetadata = (
  jsonContent: string | object
): ParsedContent => {
  try {
    // Ensure jsonContent is an object before processing
    const parsed =
      typeof jsonContent === "string" ? JSON.parse(jsonContent) : jsonContent;

    let title = "";
    let imageUrl = "";
    let contentNodes: any[] = [];

    const isHeadingNode = (node: any): boolean => {
      return node.type === "tag" && ["h1", "h2", "h3"].includes(node.name);
    };

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

    const headingTypes = ["h1", "h2", "h3"];
    for (const headingType of headingTypes) {
      const foundTitle = findFirstHeading(parsed, headingType);
      if (foundTitle) {
        title = foundTitle;
        break;
      }
    }

    const processNode = (node: any): void => {
      if (
        node.type === "tag" &&
        node.name === "img" &&
        node.attribs?.src &&
        !imageUrl
      ) {
        imageUrl = node.attribs.src;
      }

      if (!isHeadingNode(node) || node.name !== headingTypes[0]) {
        contentNodes.push(node);
      }

      if (node.children) {
        node.children.forEach(processNode);
      }
    };

    processNode(parsed);

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
      title: title || "Untitled",
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

// Updated UserPost component
function UserPost() {
  const accessToken = localStorage.getItem("accessToken");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchAllBlogs = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8787/api/v1/post/all/saved",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.data.data) {
          setBlogs(response.data.data);
        }
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllBlogs();
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center items-center sm:mt-5 mt-5">
        <div className="w-full max-w-5xl px-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <BlogSkeleton key={index} />
            ))
          ) : blogs.length === 0 ? (
            <div className="flex flex-col justify-center items-center w-full max-w-5xl px-4 mt-10">
              <div className="flex flex-col tracking-tighter text-center font-semibold text-slate-700 sm:text-lg text-sm mb-14 sb:mb-16">
                No Post created, Create some...
              </div>
              <div className="font-semibold text-slate-800 text-center sm:text-4xl text-2xl font-geist tracking-tighter sm:px-32 sm:pb-8 pb-5">
                "Don't get it right, just get it written." -{" "}
                <span className="text-neutral-500">James Thurber</span>
              </div>
              <div>
                <img
                  className="rounded-md sm:max-w-2xl max-w-xs"
                  src="https://res.cloudinary.com/dspu4ehu3/image/upload/v1735335729/EE3CD340-DF8E-4873-B650-5482FC174F65_m7s8yh.jpg"
                  alt="journaling-nature"
                />
              </div>
            </div>
          ) : (
            <div className="w-full max-w-5xl px-4">
              <div className="flex flex-col justify-start text-4xl text-slate-900 font-semibold mt-10">
                Your Saved Post
              </div>
              <div>
                {blogs.map((blogWrapper) => {
                  const { id, author, createdAt } = blogWrapper;

                  // Use the new extraction function
                  const {
                    title,
                    content: parsedContent,
                    imageUrl,
                  } = extractContentAndMetadata(blogWrapper.content);

                  return (
                    <BlogCard
                      key={id}
                      id={id}
                      firstName={author?.firstName || ""}
                      lastName={author?.lastName || ""}
                      title={title || "Untitled Blog"}
                      content={parsedContent || "No content available."}
                      profileColor={author?.profileColor || ""}
                      createdAt={createdAt}
                      imageUrl={imageUrl || ""}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserPost;
