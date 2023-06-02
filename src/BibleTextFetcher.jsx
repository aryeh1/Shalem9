import React, { useState } from 'react';
import PassageComponent from './PassageComponent';

const BibleTextFetcher = ({ setHistory }) => {
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rawJson, setRawJson] = useState('');
  const [passageData, setPassageData] = useState(null);

  const titles = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy']; // Add more titles as needed

  const fetchBibleText = async () => {
    setLoading(true);
    setError(null);

    if (!book || !chapter) {
      setError('Please fill out all fields');
      setLoading(false);
      return;
    }

    const url = `https://www.sefaria.org/api/texts/${book}.${chapter}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPassageData(data);
      setRawJson(JSON.stringify(data, null, 2));

      setHistory((prevHistory) => [
        ...prevHistory,
        { book, chapter, text: data.text, hebrewText: data.he },
      ]);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchBibleText();
  };

  const generateExample = () => {
    setBook('Genesis');
    setChapter('27');
  };

// ... rest of the code

return (
  <>
    <form className="form" onSubmit={handleSubmit}>
      <select className="select" value={book} onChange={(e) => setBook(e.target.value)}>
        <option value="">Select a book</option>
        {titles.map((title) => (
          <option key={title} value={title}>
            {title}
          </option>
        ))}
      </select>
      <input
        className="input"
        type="number" // change type to number to accept only numbers
        min="1" // add a minimum limit if needed
        placeholder="Chapter"
        value={chapter}
        onChange={(e) => setChapter(e.target.value)}
      />
      <button className="button button-fetch" type="submit">Fetch Text</button>
    </form>
    <button className="button button-example" type="button" onClick={generateExample}>Generate Example</button>
    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>Error: {error}</p>
    ) : passageData ? (
      <div>
        <PassageComponent passageData={passageData} />
        <div className="text">
          <h2>Raw JSON:</h2>
          <textarea value={rawJson} readOnly />
        </div>
      </div>
    ) : null}
  </>
);


}

export default BibleTextFetcher;
