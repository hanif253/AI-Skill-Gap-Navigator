import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'; 

function App() {
  const [skills, setSkills] = useState("");
  const [role, setRole] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!skills || !role) return alert("Please fill both fields!");
    setLoading(true);
    setResult(null); 
    
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/analyze-gap", {
        currentSkills: skills,
        targetRole: role
      });
      setResult(response.data);
    } catch (err) {
      alert("Backend error! Check if server is running.");
    }
    setLoading(false);
  };

  return (
    <div style={mainContainerStyle}>
      <div style={contentWrapperStyle}>
        <h1 style={titleStyle}>🚀 Career Navigator</h1>
        <p style={subtitleStyle}>Identify your skill gaps and get a personalized AI roadmap.</p>

        <div style={inputGroupStyle}>
          <input 
            placeholder="Current Skills (e.g. HTML, CSS)" 
            onChange={(e) => setSkills(e.target.value)}
            style={inputStyle}
          />
          <input 
            placeholder="Target Role (e.g. React Developer)" 
            onChange={(e) => setRole(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button 
          onClick={handleAnalyze} 
          disabled={loading}
          style={{
            ...buttonStyle,
            backgroundColor: loading ? '#64748b' : '#38bdf8',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? "AI is Thinking..." : "Generate My Roadmap"}
        </button>

        {result && (
          <div style={resultCardStyle}>
            <h2 style={{ color: '#38bdf8', marginBottom: '15px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
              🎯 Your AI Roadmap
            </h2>
            <div style={roadmapTextStyle}>
              <ReactMarkdown>{result.data}</ReactMarkdown>
            </div>
            
            <button 
              onClick={() => window.print()} 
              style={downloadButtonStyle}
            >
              Print / Save as PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const mainContainerStyle = {
  backgroundColor: '#0f172a',
  minHeight: '100vh',
  width: '100vw', 
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center', 
  padding: '60px 20px',
  color: 'white',
  fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  boxSizing: 'border-box',
  overflowX: 'hidden'
};

const contentWrapperStyle = {
  width: '100%',
  maxWidth: '800px', 
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', 
  textAlign: 'center'
};

const titleStyle = { 
  fontSize: '2.5rem', 
  color: '#38bdf8', 
  marginBottom: '10px', 
  fontWeight: '800' 
};

const subtitleStyle = { 
  color: '#94a3b8', 
  marginBottom: '30px', 
  fontSize: '1.1rem' 
};

const inputGroupStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '15px',
  justifyContent: 'center',
  marginBottom: '20px',
  width: '100%'
};

const inputStyle = {
  padding: '12px 20px',
  borderRadius: '8px',
  border: '1px solid #334155',
  backgroundColor: '#1e293b',
  color: 'white',
  width: '280px',
  outline: 'none',
  fontSize: '1rem'
};

const buttonStyle = {
  padding: '14px 40px',
  borderRadius: '8px',
  color: '#0f172a',
  fontWeight: 'bold',
  border: 'none',
  fontSize: '1.1rem',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px'
};

const resultCardStyle = {
  marginTop: '40px',
  padding: '30px',
  backgroundColor: '#1e293b',
  borderRadius: '16px',
  textAlign: 'left',
  border: '1px solid #334155',
  lineHeight: '1.6',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  width: '100%', 
  boxSizing: 'border-box'
};

const roadmapTextStyle = {
  fontSize: '1.05rem',
  color: '#e2e8f0',
  overflowWrap: 'anywhere'
};

const downloadButtonStyle = {
  marginTop: '30px',
  padding: '10px 20px',
  borderRadius: '6px',
  backgroundColor: 'transparent',
  color: '#38bdf8',
  border: '1px solid #38bdf8',
  cursor: 'pointer',
  fontSize: '0.9rem',
  fontWeight: '600',
  display: 'block',
  marginLeft: 'auto' 
};

export default App;