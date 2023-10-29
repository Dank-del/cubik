'use client';

import React, { CSSProperties } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import { githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Fira_Code } from 'next/font/google';

const firacode = Fira_Code({
  subsets: ['latin', 'cyrillic-ext'],
  weight: '300',
});

const CodeComponent = ({codeString}: {codeString: string}) => {
  // const codeString = `import { React } from 'react';`;

  const customStyle: CSSProperties = {
    fontSize: '16px',
    padding: '16px',
    lineHeight: '1.5',
    ...firacode.style
  };

  return (
    <SyntaxHighlighter
      language={jsx}
      style={{
        ...githubGist,
        ...dark
      }}
      customStyle={customStyle}
    >
      {codeString.trim()}
    </SyntaxHighlighter>
  );
};

export default CodeComponent;
