import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
//import { useSpeechSynthesis } from 'react-speech-kit';


function App() {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('english');
  const [summary, setSummary] = useState('');
  

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/summarize', { text, language });
      setSummary(response.data.summary);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
    <div className='title'>
      <div className='titleImage'>
      <img src="./titleImage.png" alt="Title" width="200" />
      </div>
    </div>


    <div className="App">
      <header>
        <img src="./titleImage.png" alt="Title" width="200" />
        <h1>Summarization/Consolidation</h1>
      </header>
      <main>
        <textarea
          placeholder="Enter the text that needs to be summarized"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div>
          <label htmlFor="languageSelect">Select Language:</label>
          <select id="languageSelect" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="english">English</option>
            <option value="swedish">Swedish</option>
            <option value="german">German</option>
            <option value="french">French</option>
            <option value="spanish">Spanish</option>
          </select>
        </div>
        <button onClick={handleSubmit}>Summarize</button>
        <div className="summary">
          {summary && (
            <>
              <h2>Summary:</h2>
              <p>{summary}</p>
            </>
          )}
        </div>
      </main>
    </div>
    </>
  );
}

export default App;
