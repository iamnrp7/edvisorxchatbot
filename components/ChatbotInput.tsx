import React, { useState } from 'react';

const ChatbotInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSendMessage = async () => {
    const res = await fetch('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        age: '25-35',  // These would typically come from user input fields
        gender: 'female',
        relationship: 'friend',
        occasion: 'birthday',
        budget: '50'
      })
    });
    const data = await res.json();
    setResponse(data.message || 'No suitable gifts found.');
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Ask for gift suggestions!" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
      />
      <button onClick={handleSendMessage}>Send</button>

      <div>
        {response && <p>{response}</p>}
      </div>
    </div>
  );
};

export default ChatbotInput;
