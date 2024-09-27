import React, { useRef, useState } from "react";
import openai from "../utils/openai";
import ReactMarkDown from "react-markdown";

const AISearch = () => {
  const searchText = useRef();
  const [searchResult, setSearchResult] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleAISearch = async () => {
    const prompt = `You are an intelligent AI coding assistant. Your primary tasks are to debug code by identifying errors and suggesting improvements, write clear and informative comments to explain the code functionality, and provide detailed explanations of any mistakes found. For example, if a code snippet contains a TypeError due to incompatible data types, you should explain the issue and suggest converting the data types to resolve the error. ${searchText.current.value}`;
    try {
      setLoading(true);
      setError(null);
      const gptResult = await openai.generateContent(prompt);
      const response = gptResult.response;
      const text = response.text();
      if (!text) {
        setLoading(false);
        return;
      }
      setSearchResult(text);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="container-fluid py-5 w-75">
      <h2 className="text-center">AI Search</h2>
      <div className="d-flex justify-content-around mx-auto">
        <input
          type="text"
          className="form-control"
          placeholder="Ai coding assissant"
          ref={searchText}
        />
        <button className="btn btn-info text-nowrap " onClick={handleAISearch}>
          Search
        </button>
      </div>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        searchResult && (
          <div className="border border-1 border-secondary rounded my-2 p-4">
            <ReactMarkDown>{searchResult}</ReactMarkDown>
          </div>
        )
      )}
    </div>
  );
};

export default AISearch;
