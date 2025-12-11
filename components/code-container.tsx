import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeContainer = ({ children }: { children: string }) => {
  return (
    <SyntaxHighlighter
      className="rounded-lg"
      style={github}
      language="typescript"
    >
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeContainer;
