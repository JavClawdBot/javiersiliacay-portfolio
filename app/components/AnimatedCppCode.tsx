"use client";

import { useState, useEffect } from "react";

interface Token {
  type: string;
  value: string;
}

interface AnimatedCppCodeProps {
  speed?: number;
}

export default function AnimatedCppCode({ speed = 50 }: AnimatedCppCodeProps) {
  const [visibleTokenCount, setVisibleTokenCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Manually tokenized code snippet for perfect highlighting
  const tokens: Token[] = [
    { type: "preprocessor", value: "#include <life.h>" },
    { type: "whitespace", value: "\n" },
    { type: "whitespace", value: "\n" },
    { type: "keyword", value: "void" },
    { type: "whitespace", value: " " },
    { type: "identifier", value: "Javier" },
    { type: "punctuation", value: "::" },
    { type: "identifier", value: "introduction" },
    { type: "punctuation", value: "(" },
    { type: "punctuation", value: ")" },
    { type: "whitespace", value: " " },
    { type: "punctuation", value: "{" },
    { type: "whitespace", value: "\n    " },
    { type: "keyword", value: "char" },
    { type: "whitespace", value: " " },
    { type: "identifier", value: "location" },
    { type: "punctuation", value: "[" },
    { type: "punctuation", value: "]" },
    { type: "whitespace", value: " " },
    { type: "punctuation", value: "=" },
    { type: "whitespace", value: " " },
    { type: "string", value: '"Philippines"' },
    { type: "punctuation", value: ";" },
    { type: "whitespace", value: "\n    " },
    { type: "keyword", value: "char" },
    { type: "whitespace", value: " " },
    { type: "identifier", value: "university" },
    { type: "punctuation", value: "[" },
    { type: "punctuation", value: "]" },
    { type: "whitespace", value: " " },
    { type: "punctuation", value: "=" },
    { type: "whitespace", value: " " },
    { type: "string", value: '"USTP"' },
    { type: "punctuation", value: ";" },
    { type: "whitespace", value: "\n    " },
    { type: "keyword", value: "char" },
    { type: "whitespace", value: " " },
    { type: "identifier", value: "course_program" },
    { type: "punctuation", value: "[" },
    { type: "punctuation", value: "]" },
    { type: "whitespace", value: " " },
    { type: "punctuation", value: "=" },
    { type: "whitespace", value: " " },
    { type: "string", value: '"Bachelor of Science in Autotronics"' },
    { type: "punctuation", value: ";" },
    { type: "whitespace", value: "\n    " },
    { type: "keyword", value: "const" },
    { type: "whitespace", value: " " },
    { type: "keyword", value: "char" },
    { type: "punctuation", value: "*" },
    { type: "identifier", value: "specializations" },
    { type: "punctuation", value: "[" },
    { type: "punctuation", value: "]" },
    { type: "whitespace", value: " " },
    { type: "punctuation", value: "=" },
    { type: "whitespace", value: " " },
    { type: "punctuation", value: "{" },
    { type: "string", value: '"Embedded Systems"' },
    { type: "punctuation", value: ", " },
    { type: "string", value: '"IoT"' },
    { type: "punctuation", value: ", " },
    { type: "string", value: '"Circuit Diagrams"' },
    { type: "punctuation", value: ", " },
    { type: "string", value: '"Electronics Ethical Hacking"' },
    { type: "punctuation", value: "}" },
    { type: "punctuation", value: ";" },
    { type: "whitespace", value: "\n    " },
    { type: "keyword", value: "bool" },
    { type: "whitespace", value: " " },
    { type: "identifier", value: "coffee_powered" },
    { type: "whitespace", value: " " },
    { type: "punctuation", value: "=" },
    { type: "whitespace", value: " " },
    { type: "keyword", value: "true" },
    { type: "punctuation", value: ";" },
    { type: "whitespace", value: "\n\n    " },
    { type: "keyword", value: "while" },
    { type: "whitespace", value: " " },
    { type: "punctuation", value: "(" },
    { type: "identifier", value: "coffee_powered" },
    { type: "punctuation", value: ")" },
    { type: "whitespace", value: " " },
    { type: "punctuation", value: "{" },
    { type: "whitespace", value: "\n        " },
    { type: "identifier", value: "buildCoolProjects" },
    { type: "punctuation", value: "(" },
    { type: "punctuation", value: ")" },
    { type: "punctuation", value: ";" },
    { type: "whitespace", value: "\n        " },
    { type: "identifier", value: "learnNewTechnologies" },
    { type: "punctuation", value: "(" },
    { type: "punctuation", value: ")" },
    { type: "punctuation", value: ";" },
    { type: "whitespace", value: "\n        " },
    { type: "identifier", value: "solveInterestingProblems" },
    { type: "punctuation", value: "(" },
    { type: "punctuation", value: ")" },
    { type: "punctuation", value: ";" },
    { type: "whitespace", value: "\n    " },
    { type: "punctuation", value: "}" },
    { type: "whitespace", value: "\n" },
    { type: "punctuation", value: "}" },
  ];

  useEffect(() => {
    if (visibleTokenCount < tokens.length) {
      const timer = setTimeout(() => {
        setVisibleTokenCount((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      // After full code is shown, pause then restart
      const restartTimer = setTimeout(() => {
        setVisibleTokenCount(0);
      }, 3000); // 3 second pause before restart
      return () => clearTimeout(restartTimer);
    }
  }, [visibleTokenCount, speed, tokens.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const allTokens = tokens.slice(0, visibleTokenCount);
  const remaining = tokens.slice(visibleTokenCount);
  const currentToken = remaining[0];

  return (
    <code className="font-mono text-sm leading-relaxed">
      {allTokens.map((token, idx) => (
        <span key={idx} className={`token-${token.type}`}>
          {token.value}
        </span>
      ))}
      {currentToken && (
        <span className={`token-${currentToken.type}`}>
          {currentToken.value.slice(0, 1)}
          <span className={`inline-block w-2 h-5 ml-0.5 align-middle bg-primary-400 transition-opacity ${showCursor ? "opacity-100" : "opacity-0"}`} />
        </span>
      )}
      {visibleTokenCount >= tokens.length && (
        <span className={`inline-block w-2 h-5 ml-0.5 align-middle bg-primary-400 transition-opacity ${showCursor ? "opacity-100" : "opacity-0"}`} />
      )}
    </code>
  );
}
