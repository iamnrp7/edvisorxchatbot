import giftData from '../data/gifts.json';  // Adjust path as per your structure

interface GiftSuggestion {
  age: string;
  gender: string;
  relationship: string;
  occasion: string;
  budget: string;
  gift: string;
  link: string;
}

export function getGiftSuggestions(userInput: {
  age: string,
  gender: string,
  relationship: string,
  occasion: string,
  budget: string
}): GiftSuggestion[] {
  return giftData.filter(gift => 
    gift.age === userInput.age &&
    gift.gender === userInput.gender &&
    gift.relationship === userInput.relationship &&
    gift.occasion === userInput.occasion &&
    parseFloat(gift.budget) <= parseFloat(userInput.budget)
  );
}
