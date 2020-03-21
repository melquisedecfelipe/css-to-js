import React, { useState, useEffect, useRef } from 'react';
import { FaGithub } from 'react-icons/fa';

import './styles.scss';

const Home = () => {
  const textAreaRef = useRef(null);

  const [button, setButton] = useState('Copy to clipboard');
  const [cssInJs, setCssInJs] = useState([]);
  const [css, setCss] = useState(`width: 100%;
height: 100vh;
border: 0;
resize: none;
padding: 20px;
font-size: 18px;
background: #111;
color: #f5f5f5;
font-family: 'Roboto Mono', monospace;`);

  const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

  useEffect(() => {
    const checkCss = css
      .replace(/\n/g, '')
      .replace('"', "'")
      .split(';');

    const newCss = checkCss.map(tag => {
      if (tag.includes('-')) {
        const newTag = tag.split('-');

        newTag.forEach((newTagElement, i) => {
          if (i !== 0) {
            newTag[i] = capitalize(newTagElement);
          }

          return newTag;
        });

        return newTag.join('');
      }

      return tag;
    });

    const quotesCss = newCss.map(newCssElement => {
      if (newCssElement.includes(':')) {
        const quotes = newCssElement.split(':');

        quotes.forEach((quotesElement, j) => {
          if (j === 1) {
            quotes[j] = `"${quotesElement.trim()}"`;
          }

          return quotes;
        });

        return quotes.join(': ');
      }

      return newCssElement;
    });

    const finalCss = quotesCss.map(addSpace => `  ${addSpace}`);

    setCssInJs(finalCss.slice(0, quotesCss.length - 1).join(',\n'));
  }, [css]);

  const copyToClipboard = e => {
    textAreaRef.current.select();
    document.execCommand('copy');

    e.target.focus();
    setButton('Copied to clipboard');

    setTimeout(() => {
      setButton('Copy to clipboard');
    }, 500);
  };

  return (
    <main>
      <span>
        <p>Give me star</p>
        <a
          href='http://github.com/melquisedecfelipe/css-to-js'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaGithub />
        </a>
      </span>
      <div>
        <h2>CSS</h2>
        <textarea
          onChange={e => setCss(e.target.value)}
          value={css}
          placeholder='Your CSS code'
        />
      </div>
      <div className='result'>
        <h2>CSS in JS</h2>
        <textarea
          ref={textAreaRef}
          readOnly
          value={`{
${cssInJs}
}`}
        />
      </div>
      <button onClick={copyToClipboard} type='button'>
        {button}
      </button>
    </main>
  );
};

export default Home;
