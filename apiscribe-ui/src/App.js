import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSnippets(null);
    setError('');

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
    const codeToCopy = typeof snippets[activeTab] === 'string'
      ? snippets[activeTab]
      : JSON.stringify(snippets[activeTab], null, 2);
      
    navigator.clipboard.writeText(codeToCopy).then(() => {
      toast.success('Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy', err);
      toast.error('Failed to copy!');
    });
  };

  return (
    // Main container - using flex to center content vertically
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center font-sans">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1F2937', // bg-gray-800
            color: '#fff',
          },
        }}
      />

      {/* Centered content area - using mx-auto for horizontal centering, py-16 for vertical padding */}
      <header className="container mx-auto max-w-3xl flex flex-col items-center px-4 py-16">
        
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">
          APIScribe 🚀
        </h1>
        <p className="text-lg text-gray-400 mb-8 text-center">
          Paste a cURL command or describe your API call in plain English.
        </p>

        {/* --- Canned Demos --- */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
          <span className="text-sm text-gray-400">Try these:</span>
          <button
            onClick={() => setPrompt('a cURL command to POST /api/v1/users with a JSON body of name and email')}
            className="bg-gray-800 text-gray-300 border border-gray-700 px-3 py-1 rounded-full text-xs hover:bg-gray-700 hover:border-gray-600 transition-colors"
          >
            Demo: cURL
          </button>
          <button
            onClick={() => setPrompt('a python requests function to GET /api/products/123')}
            className="bg-gray-800 text-gray-300 border border-gray-700 px-3 py-1 rounded-full text-xs hover:bg-gray-700 hover:border-gray-600 transition-colors"
          >
            Demo: Python
          </button>
          <button
            onClick={() => setPrompt('a java spring WebClient to PUT /api/items/456')}
            className="bg-gray-800 text-gray-300 border border-gray-700 px-3 py-1 rounded-full text-xs hover:bg-gray-700 hover:border-gray-600 transition-colors"
          >
            Demo: Java
          </button>
        </div>

        {/* --- Form --- */}
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <textarea
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-gray-200 font-mono resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'A javascript fetch request to POST /api/users...'"
            rows="5"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed flex justify-center items-center h-12 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              'Generate Code'
            )}
          </button>
        </form>

        {/* --- Output Zone --- */}
        {error && <p className="text-red-500 font-bold mt-4">{error}</p>}

        {snippets && (
          <div className="w-full mt-10">
            {/* --- Tabs --- */}
            <div className="flex border-b border-gray-700">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  className={`py-2 px-4 font-medium -mb-px
                    ${activeTab === tab.key
                      ? 'text-white border-b-2 border-blue-500'
                      : 'text-gray-400 hover:text-gray-200'
                    }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* --- Code Block & Copy Button --- */}
            <div className="relative w-full">
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 bg-gray-700 px-3 py-1 rounded text-xs text-gray-200 hover:bg-gray-600 transition-colors"
              >
                Copy
              </button>
              
              <pre className="bg-gray-800 rounded-b-lg border border-gray-700 border-t-0 p-4 pt-10 text-left font-mono text-sm overflow-x-auto">
                {typeof snippets[activeTab] === 'string'
                  ? snippets[activeTab]
                  : JSON.stringify(snippets[activeTab], null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* --- Footer --- */}
        <footer className="text-gray-600 text-sm mt-16 pb-4">
          Built at HackCC by Safkat.
          <a
            href="https://github.com/Safkatul-Islam/APIScribe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-400 hover:underline ml-2 transition-colors"
          >
            View on GitHub
          </a>
        </footer>

      </header>
    </div>
  );
}

export default App;