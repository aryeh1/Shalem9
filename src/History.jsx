import React, { useState } from 'react';

const History = ({ history }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const search = () => {
    setIsLoading(true);
    const results = history.filter((item) =>
      item.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setIsLoading(false);
  };

  const toggleExpansion = (itemId) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter((id) => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  const renderHistoryItem = (item) => {
    const { id, book, chapter, verse, text, hebrewText } = item;

    const isExpanded = expandedItems.includes(id);

    // Convert text and hebrewText to strings if they are not already strings
    const textString = typeof text === 'string' ? text : String(text);
    const hebrewTextString = typeof hebrewText === 'string' ? hebrewText : String(hebrewText);

    return (
      <div key={id}>
        <p>
          {book} {chapter}:{verse}
        </p>
        <p>
          {isExpanded ? textString : textString.substring(0, 50)}
          {textString.length > 50 && !isExpanded && (
            <button onClick={() => toggleExpansion(id)}>Read more</button>
          )}
        </p>
        <p>
          {isExpanded ? hebrewTextString : hebrewTextString.substring(0, 50)}
          {hebrewTextString.length > 50 && !isExpanded && (
            <button onClick={() => toggleExpansion(id)}>Read more</button>
          )}
        </p>
      </div>
    );
  };

  const renderSearchResults = () => {
    if (searchResults.length > 0) {
      return searchResults.map((item) => renderHistoryItem(item));
    } else {
      return isLoading ? <p>Loading...</p> : <p>No results found.</p>;
    }
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
      <button onClick={search} disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>

      <h2>Search Results</h2>
      {renderSearchResults()}
    </div>
  );
};

export default History;
