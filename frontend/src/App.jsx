import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse("");
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/api/prompt", {
        apiKey,
        prompt,
      });
      setResponse(res.data.response || "No response received");
    } catch (err) {
      setError(err.response?.data?.error || "Error connecting to the server");
    }
  };

  return (
    <div className="app">
      <h1>xAI Prompt App</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="apiKey">API Key:</label>
        <input
          type="text"
          id="apiKey"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your xAI API key"
          required
        />

        <label htmlFor="prompt">Prompt:</label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
          rows="4"
          required
        ></textarea>

        <button type="submit">Send Prompt</button>
      </form>

      {response && <div className="response">{response}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;
