import { NextResponse } from 'next/server';
import { getGiftSuggestions } from '../../../lib/giftSuggestions';

export async function POST(req: Request) {
  const body = await req.json();
  const { age, gender, relationship, occasion, budget } = body;

  // Validate that all required inputs are present
  if (!age || !gender || !relationship || !occasion || !budget) {
    return NextResponse.json({ error: 'Please provide all required fields' }, { status: 400 });
  }

  // Fetch gift suggestions based on user input
  const suggestions = getGiftSuggestions({ age, gender, relationship, occasion, budget });

  if (suggestions.length > 0) {
    return NextResponse.json(suggestions, { status: 200 });
  } else {
    return NextResponse.json({ message: 'No gift suggestions found for the given criteria' }, { status: 404 });
  }
}
