
import React from 'react';
import DOMPurify from 'dompurify';

const PassageComponent = ({ passageData }) => {
  const { he, text } = passageData;

  return (
    <div>
      <div className="text">
        <h2>Hebrew:</h2>
        {he.map((verse, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(verse) }} />
        ))}
      </div>
      <div className="text">
        <h2>English:</h2>
        {text.map((verse, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(verse) }} />
        ))}
      </div>
    </div>
  );
};

export default PassageComponent;
