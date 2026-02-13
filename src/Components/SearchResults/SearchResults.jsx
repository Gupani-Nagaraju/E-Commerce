import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchResults.css";


const normalizeText = (value) =>
  (value || "").toString().trim().toLowerCase();

const SearchResults = ({
  data = [],
  onSubmit,
  onSelectItem,
  onChangeTerm,
  placeholder = "What do you need?",
  maxSuggestions = 8,
}) => {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const normalizedTerm = useMemo(
    () => normalizeText(term),
    [term]
  );

  const suggestions = useMemo(() => {
    if (!normalizedTerm) return [];

    return data
      .filter((item) => {
        const haystackParts = [
          item.brand,
          item.company,
          item.model,
          item.type,
          item.product,
          item.category,
          item.description,
        ];

        if (Array.isArray(item.tags)) {
          haystackParts.push(item.tags.join(" "));
        }

        const haystack = haystackParts
          .map((x) => (x || "").toString().toLowerCase())
          .join(" ");

        return haystack.includes(normalizedTerm);
      })
      .slice(0, maxSuggestions);
  }, [data, normalizedTerm, maxSuggestions]);

  useEffect(() => {
    if (onChangeTerm) {
      onChangeTerm(term, suggestions.length);
    }
  }, [term, suggestions.length, onChangeTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = term.trim();
    if (!trimmed) return;

   
    if (suggestions.length === 0) {
      navigate(`/search/no-results?q=${encodeURIComponent(trimmed)}`);
      return;
    }

    
    onSubmit && onSubmit(trimmed, suggestions);
  };

  const handleSelect = (item) => {
    onSelectItem && onSelectItem(item);
  };

  return (
    <form className="searchbar-wrapper" onSubmit={handleSubmit}>
      <div className="searchbar-input-wrapper">
        <input
          className="searchbar-input"
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder={placeholder}
        />

        {normalizedTerm && suggestions.length > 0 && (
          <ul className="searchbar-suggestions">
            {suggestions.map((item, idx) => (
              <li
                key={`${item._section || item.product}-${item.id || idx}`}
                onClick={() => handleSelect(item)}
              >
                <span className="suggestion-name">
                  {(item.brand || item.company || "") +
                    " " +
                    (item.model || item.product || "")}
                </span>
                {item._section && (
                  <span className="suggestion-section">{item._section}</span>
                )}
              </li>
            ))}
          </ul>
        )}

        {normalizedTerm && suggestions.length === 0 && (
          <div className="searchbar-no-suggestions">
            No matching products found.
          </div>
        )}
      </div>

      <button type="submit" className="searchbar-btn">
        🔍
      </button>
    </form>
  );
};

export default SearchResults;
