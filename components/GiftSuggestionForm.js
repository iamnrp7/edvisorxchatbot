// components/GiftSuggestionForm.js

import { useState } from 'react';

const GiftSuggestionForm = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [relationship, setRelationship] = useState('');
  const [occasion, setOccasion] = useState('');
  const [budget, setBudget] = useState('');
  const [interest, setInterest] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/giftSuggestions?age=${age}&gender=${gender}&relationship=${relationship}&occasion=${occasion}&budget=${budget}&interest=${interest}`);
      const data = await response.json();

      if (response.status === 200) {
        setSuggestions(data.suggestions);
        setError('');
      } else {
        setError(data.message);
        setSuggestions([]);
      }
    } catch (error) {
      setError('Error fetching gift suggestions.');
      setSuggestions([]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Age:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <div>
          <label>Gender:</label>
          <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} required />
        </div>
        <div>
          <label>Relationship:</label>
          <input type="text" value={relationship} onChange={(e) => setRelationship(e.target.value)} required />
        </div>
        <div>
          <label>Occasion:</label>
          <input type="text" value={occasion} onChange={(e) => setOccasion(e.target.value)} required />
        </div>
        <div>
          <label>Budget:</label>
          <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} required />
        </div>
        <div>
          <label>Interest:</label>
          <input type="text" value={interest} onChange={(e) => setInterest(e.target.value)} required />
        </div>
        <button type="submit">Suggest Gift</button>
      </form>

      {error && <p>{error}</p>}

      {suggestions.length > 0 && (
        <div>
          <h2>Suggested Gifts:</h2>
          {suggestions.map((gift, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <h3>{gift.Gift}</h3>
              <p>Rating: {gift.Rating}</p>
              <a href={gift.Link} target="_blank" rel="noopener noreferrer">Buy Here</a>
              <img src={gift["Image Link"]} alt={gift.Gift} style={{ width: '150px' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GiftSuggestionForm;
