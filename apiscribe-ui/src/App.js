import React, { useState } from 'react';
import './App.css';

const TABS = [
  { key: 'javascriptFetch', label: 'JavaScript (fetch)' },
  { key: 'javascriptAxios', label: 'JavaScript (axios)' },
  { key: 'javaSpring', label: 'Java (Spring)' },
  { key: 'pythonRequests', label: 'Python (requests)' },
];

function App() {
  const [prompt, setPrompt] = useState('');

  const [snippets, setSnippets] = useState(null);
  
  const [activeTab, setActiveTab] = useState(TABS[0].key);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [copyButtonText, setCopyButtonText] = useState('Copy');

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsLoading(true);
    setSnippets(null);
    setError('');
    setCopyButtonText('Copy');

    try {
      const API_HOST = process.env.NODE_ENV === 'production' 
        ? process.env.REACT_APP_API_URL
        : 'http://localhost:8080';

      const response = await fetch(`${API_HOST}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt }), 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      
      try {
        const parsedSnippets = JSON.parse(data.code);
        setSnippets(parsedSnippets);
        setActiveTab(TABS[0].key);
      } catch (parseError) {
        console.error("Failed to parse AI's JSON response:", parseError);
        setError("AI returned invalid JSON. Try a different prompt.");
      }

    } catch (e) {
      console.error('Fetch error:', e);
      setError('Failed to generate code. Is the backend running?');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!snippets || !activeTab) return;

    const codeToCopy = snippets[activeTab];
    navigator.clipboard.writeText(codeToCopy).then(() => {
      setCopyButtonText('Copied!');
      setTimeout(() => setCopyButtonText('Copy'), 2000);
    }).catch(err => {
      console.error('Failed to copy', err);
      setCopyButtonText('Failed');
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>APIScribe 🚀</h1>
        <p>Paste a cURL command or describe your API call in plain English.</p>

        <form className="prompt-form" onSubmit={handleSubmit}>
          <textarea
            className="prompt-textarea"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'A javascript fetch request to POST /api/users with a JSON body of name and email'"
            rows="5"
          />
          <button type="submit" className="generate-button" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Code'}
          </button>
        </form>

        {/* The Output Zone (Phase 4) */}
        
        {error && <p className="error-message">{error}</p>}

        {/* We only show the output area if snippets exist */}
        {snippets && (
          <div className="code-output-area">
            
            {/* Priority 1: The Tabs */}
            <div className="tabs-container">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* The Code Block and Copy Button */}
            <div className="code-block-wrapper">
              {/* Priority 2: The Copy Button */}
              <button className="copy-button" onClick={handleCopy}>
                {copyButtonText}
              </button>
              
              <pre className="code-block">
                {/*
                  If it's a string, we render it normally.
                  If the AI sent an object (like the error shows),
                  we 'stringify' it with 2 spaces of indentation
                  so React can render it as text.
                */}
                {typeof snippets[activeTab] === 'string'
                  ? snippets[activeTab]
                  : JSON.stringify(snippets[activeTab], null, 2)}
              </pre>
            </div>
            
          </div>
        )}
      </header>
    </div>
  );
}

export default App;