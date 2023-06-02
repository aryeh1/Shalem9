import React, { useState, useEffect } from 'react';

const History = ({ history }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);

  useEffect(() => {
    const search = () => {
      setIsLoading(true);

      if (searchTerm.trim() === '') {
        setSearchResults([]);
        setIsLoading(false);
        return;
      }

      const results = history.filter((item) =>
        item.text.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setSearchResults(results);
      setIsLoading(false);
    };

    const delayedSearch = setTimeout(() => {
      search();
    }, 500);

    return () => {
      clearTimeout(delayedSearch);
    };
  }, [searchTerm, history]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleExpansion = (itemId) => {
    setExpandedItems((prevExpandedItems) => {
      if (prevExpandedItems.includes(itemId)) {
        return prevExpandedItems.filter((id) => id !== itemId);
      } else {
        return [...prevExpandedItems, itemId];
      }
    });
  };

  const renderHistoryItem = (item) => {
    const { id, book, chapter, verse, text, hebrewText } = item;
    const isExpanded = expandedItems.includes(id);

    const textString = String(text);
    const hebrewTextString = String(hebrewText);

    return (
      <div key={id}>
        <p>
          {book} {chapter}:{verse}
        </p>
        <p>
          {isExpanded ? textString : (typeof textString === 'string' ? textString.substring(0, 50) : '')}
          {textString.length > 50 && (
            <button onClick={() => toggleExpansion(id)}>
              {isExpanded ? 'Read less' : 'Read more'}
            </button>
          )}
        </p>
        <p>
          {isExpanded ? hebrewTextString : (typeof hebrewTextString === 'string' ? hebrewTextString.substring(0, 50) : '')}
          {hebrewTextString.length > 50 && (
            <button onClick={() => toggleExpansion(id)}>
              {isExpanded ? 'Read less' : 'Read more'}
            </button>
          )}
        </p>
      </div>
    );
  };

  const renderSearchResults = () => {
    if (searchTerm.trim() !== '') {
      if (searchResults.length > 0) {
        return searchResults.map((item) => renderHistoryItem(item));
      } else {
        if (isLoading) {
          return <p>Loading...</p>;
        } else {
          return <p>No results found.</p>;
        }
      }
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setIsLoading(false);
  };

  return (
    <div>
      <h2>History</h2>
      {history.map((item) => renderHistoryItem(item))}

      <h2>Search</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search in history"
      />
      <button onClick={clearSearch}>Clear Search</button>

      <h2>Search Results</h2>
      {renderSearchResults()}

      <h2>User Manual</h2>
      <p>
        Enter a search term in the input box to search for specific items in the history. As you type, the search will be performed automatically and the results will be displayed below. Click "Read more" to expand and view the full text for each item.
        To clear the search, click the "Clear Search" button.
      </p>
    </div>
  );
};

export default History;
