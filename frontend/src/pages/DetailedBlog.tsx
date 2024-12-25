import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

type JsonNode = {
  type: string;
  name?: string;
  attribs?: Record<string, string>;
  children?: JsonNode[];
  data?: string;
};

export default function RendererComponent() {
  const accessToken = localStorage.getItem("accessToken");
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<JsonNode | null>(null);
  const [loading, setLoading] = useState(true);

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
            <p className="mb-4 text-lg font-garamond_[allfont.ru] leading-relaxed">
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
              className="rounded-lg border border-stone-200 my-4 max-w-full h-auto"
            />
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
