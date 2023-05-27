import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

const Verse = ({ verse, index }) => (
  <p key={index} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(verse) }} />
);

Verse.propTypes = {
  verse: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

const PassageComponent = ({ passageData }) => {
  const { he, text } = passageData;

  return (
    <div>
      <section className="text">
        <h2>Hebrew:</h2>
        {he.map((verse, index) => <Verse verse={verse} index={index} />)}
      </section>
      <section className="text">
        <h2>English:</h2>
        {text.map((verse, index) => <Verse verse={verse} index={index} />)}
      </section>
    </div>
  );
};

PassageComponent.propTypes = {
  passageData: PropTypes.shape({
    he: PropTypes.arrayOf(PropTypes.string).isRequired,
    text: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default PassageComponent;
