import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Copy } from "lucide-react";

import toast, { Toaster } from "react-hot-toast";
const notify = () => toast("Copied to Clipboard");

type JsonNode = {
  type: string;
  name?: string;
  attribs?: Record<string, string>;
  children?: JsonNode[];
  data?: string;
};

export default function DetailedBlog() {
  const accessToken = localStorage.getItem("accessToken");
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<JsonNode | null>(null);
  const [loading, setLoading] = useState(true);

  // const handleClipboard = () => {
  //   navigator.clipboard.writeText(codeText);
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/post/${id}/view`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const parsedContent = JSON.parse(response.data.blog.content);
        setContent(parsedContent);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, accessToken]);

  // const renderNode = (node: JsonNode): React.ReactNode => {
  //   if (node.type === "text") {
  //     return node.data;
  //   }

  //   if (node.type === "tag") {
  //     const children = node.children?.map((child, index) => (
  //       <React.Fragment key={index}>{renderNode(child)}</React.Fragment>
  //     ));
  //     // console.log(children);
  //     switch (node.name) {
  //       case "h1":
  //         return <h1 className="text-5xl font-bold mb-4">{children}</h1>;
  //       case "h2":
  //         return <h2 className="text-3xl font-semibold mb-3">{children}</h2>;
  //       case "h3":
  //         return <h3 className="text-2xl font-semibold mb-2">{children}</h3>;
  //       case "p":
  //         return (
  //           <p className="mb-4 text-xl font-geist leading-relaxed">
  //             {children}
  //           </p>
  //         );
  //       case "a":
  //         return (
  //           <a
  //             href={node.attribs?.href}
  //             target={node.attribs?.target}
  //             rel={node.attribs?.rel}
  //             className="text-stone-600 underline underline-offset-2 hover:text-stone-800 transition-colors"
  //           >
  //             {children}
  //           </a>
  //         );
  //       case "strong":
  //       case "b":
  //         return <strong className="font-bold">{children}</strong>;
  //       case "em":
  //       case "i":
  //         return <em className="italic">{children}</em>;
  //       case "u":
  //         return <u>{children}</u>;
  //       case "span":
  //         return (
  //           <span
  //             style={
  //               node.attribs?.style
  //                 ? { color: node.attribs.style.split(": ")[1] }
  //                 : {}
  //             }
  //           >
  //             {children}
  //           </span>
  //         );
  //       case "img":
  //         return (
  //           <img
  //             src={node.attribs?.src}
  //             alt={node.attribs?.alt || ""}
  //             className="rounded-lg border border-stone-200 my-4 max-w-full h-auto"
  //           />
  //         );
  //       default:
  //         return <div>{children}</div>;
  //     }
  //   }

  //   if (node.type === "root" && node.children) {
  //     return node.children.map((child, index) => (
  //       <React.Fragment key={index}>{renderNode(child)}</React.Fragment>
  //     ));
  //   }

  //   return null;
  // };
  const renderNode = (node: JsonNode): React.ReactNode => {
    if (node.type === "text") {
      return node.data;
    }

    if (node.type === "tag") {
      const children = node.children?.map((child, index) => (
        <React.Fragment key={index}>{renderNode(child)}</React.Fragment>
      ));

      switch (node.name) {
        case "h1":
          return <h1 className="text-5xl font-bold mb-4">{children}</h1>;
        case "h2":
          return <h2 className="text-3xl font-semibold mb-3">{children}</h2>;
        case "h3":
          return <h3 className="text-2xl font-semibold mb-2">{children}</h3>;
        case "p":
          return (
            <p className="mb-4 text-xl font-geist leading-relaxed">
              {children}
            </p>
          );
        case "a":
          return (
            <a
              href={node.attribs?.href}
              target={node.attribs?.target}
              rel={node.attribs?.rel}
              className="text-stone-600 underline underline-offset-2 hover:text-stone-800 transition-colors"
            >
              {children}
            </a>
          );
        case "strong":
        case "b":
          return <strong className="font-bold">{children}</strong>;
        case "em":
        case "i":
          return <em className="italic">{children}</em>;
        case "u":
          return <u>{children}</u>;
        case "span":
          return (
            <span
              style={
                node.attribs?.style
                  ? { color: node.attribs.style.split(": ")[1] }
                  : {}
              }
            >
              {children}
            </span>
          );
        case "img":
          return (
            <img
              src={node.attribs?.src}
              alt={node.attribs?.alt || ""}
              className="rounded-lg max-w-full h-auto"
            />
          );
        case "ul":
          return <ul className="list-disc pl-6 mb-4">{children}</ul>;
        case "ol":
          return <ol className="list-decimal pl-6 mb-4">{children}</ol>;
        case "li":
          return <li className="mb-2">{children}</li>;
        case "code":
          const codeText = node.children?.[0]?.data || "";
          return (
            <div className="relative rounded-lg px-4 pt-0.5 my-4 bg-slate-50">
              <div
                onClick={() => {
                  navigator.clipboard.writeText(codeText);
                  notify();
                }}
                className="absolute top-2 right-4 pt-1 hover:cursor-pointer"
              >
                <Copy size={18} />
              </div>
              <pre className="overflow-auto bg-slate-50 text-slate-900">
                <code className="text-sm font-mono">{codeText}</code>
              </pre>
              <Toaster
                containerClassName="text-lg font-sans"
                position="top-center"
                toastOptions={{
                  icon: "✅",
                  duration: 2500,
                  style: {
                    minWidth: "250px",
                  },
                }}
              />

              {/* <button
                onClick={() => navigator.clipboard.writeText(codeText)}
                className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded shadow hover:bg-blue-600 transition"
              >
                Copy
              </button> */}
            </div>
          );
        default:
          return <div>{children}</div>;
      }
    }

    if (node.type === "root" && node.children) {
      return node.children.map((child, index) => (
        <React.Fragment key={index}>{renderNode(child)}</React.Fragment>
      ));
    }

    return null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-pulse text-gray-600">Loading content...</div>
      </div>
    );
  }

  if (!content) {
    return <div className="text-center text-red-600">No content available</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <article className="prose max-w-none">{renderNode(content)}</article>
    </div>
  );
}
