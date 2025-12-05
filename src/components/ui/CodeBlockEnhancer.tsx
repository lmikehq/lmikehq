"use client";

import { useEffect } from "react";

const CodeBlockEnhancer: React.FC = () => {
  useEffect(() => {
    const articleContent = document.querySelector(".article-content");
    if (!articleContent) return;

    const codeBlocks = articleContent.querySelectorAll("pre code");
    if (codeBlocks.length === 0) return;

    codeBlocks.forEach((codeBlock) => {
      const pre = codeBlock.parentElement;
      if (!pre || pre.querySelector(".copy-btn")) return;

      (codeBlock as HTMLElement).contentEditable = "true";
      (codeBlock as HTMLElement).spellcheck = false;

      const badge = document.createElement("span");
      badge.className = "editable-badge";
      badge.textContent = "✏️ editable";
      pre.appendChild(badge);

      const classes = codeBlock.className.split(" ");
      const langClass = classes.find(
        (c) => c.startsWith("language-") || c.startsWith("hljs-")
      );
      let language = langClass
        ? langClass.replace("language-", "").replace("hljs-", "")
        : "code";

      const langMap: Record<string, string> = {
        js: "JavaScript",
        ts: "TypeScript",
        jsx: "JSX",
        tsx: "TSX",
        py: "Python",
        python: "Python",
        javascript: "JavaScript",
        typescript: "TypeScript",
        bash: "Bash",
        sh: "Shell",
        shell: "Shell",
        json: "JSON",
        html: "HTML",
        css: "CSS",
        sql: "SQL",
        yaml: "YAML",
        yml: "YAML",
        md: "Markdown",
        markdown: "Markdown",
        go: "Go",
        rust: "Rust",
        cpp: "C++",
        c: "C",
        java: "Java",
        ruby: "Ruby",
        php: "PHP",
        swift: "Swift",
        kotlin: "Kotlin",
        dockerfile: "Dockerfile",
        plaintext: "Text",
        text: "Text",
      };

      const displayLang =
        langMap[language.toLowerCase()] || language.toUpperCase();

      pre.setAttribute("data-language", displayLang);

      const copyBtn = document.createElement("button");
      copyBtn.className = "copy-btn";
      copyBtn.textContent = "📋";
      copyBtn.title = "Copy code";

      copyBtn.addEventListener("click", async () => {
        const code = codeBlock.textContent || "";
        try {
          await navigator.clipboard.writeText(code);
          copyBtn.textContent = "✅";
          copyBtn.classList.add("copied");

          setTimeout(() => {
            copyBtn.textContent = "📋";
            copyBtn.classList.remove("copied");
          }, 2000);
        } catch (err) {
          console.error("Failed to copy:", err);
        }
      });

      pre.appendChild(copyBtn);
    });
  }, []);

  return null;
};

export default CodeBlockEnhancer;
