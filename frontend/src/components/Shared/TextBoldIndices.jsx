import React from 'react';

function TextBoldIndices({ word, indices }) {
  const components = [];
  let startIdx = 0;
  for (const [start, end] of indices) {
    if (startIdx !== start) {
      components.push({ bold: false, text: word.substring(startIdx, start) });
    }
    components.push({ bold: true, text: word.substring(start, end + 1) });
    startIdx = end + 1;
  }
  if (startIdx !== word.length) {
    components.push({ bold: false, text: word.substring(startIdx, word.length) });
  }
  return (
    <>
      {components.map(({ bold, text }, i) => {
        return bold ? <span key={i}>{text}</span> : <span key={i} style={{color : "#888"}}>{text}</span>;
      })}
    </>
  );
}

export default TextBoldIndices;