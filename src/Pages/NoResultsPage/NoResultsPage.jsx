import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./NoResultsPage.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const NoResultsPage = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const term = query.get("q") || query.get("query") || "";

  return (
    <div className="noresults-wrapper">
      <div className="noresults-card">
        <h1 className="noresults-title">No results found</h1>

        {term && (
          <p className="noresults-text">
            We couldn&apos;t find any products matching{" "}
            <span className="noresults-term">"{term}"</span>.
          </p>
        )}

        <p className="noresults-text">
          Try a different keyword, or browse categories from the home page.
        </p>

        <div className="noresults-actions">
          <button
            className="noresults-btn noresults-btn-primary"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
          <button
            className="noresults-btn noresults-btn-secondary"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoResultsPage;
