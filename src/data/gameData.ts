
export type Difficulty = 'mild' | 'medium' | 'spicy';
export type GameType = 'truth' | 'dare';

export interface GameQuestion {
  id: number;
  type: GameType;
  difficulty: Difficulty;
  text: string;
}

export const truthQuestions: GameQuestion[] = [
  // Mild truths
  { id: 1, type: 'truth', difficulty: 'mild', text: 'What is your biggest pet peeve?' },
  { id: 2, type: 'truth', difficulty: 'mild', text: 'What was the last lie you told?' },
  { id: 3, type: 'truth', difficulty: 'mild', text: 'What is your most embarrassing childhood memory?' },
  { id: 4, type: 'truth', difficulty: 'mild', text: 'If you could swap lives with someone for a day, who would it be?' },
  { id: 5, type: 'truth', difficulty: 'mild', text: 'What is your guilty pleasure TV show or movie?' },
  { id: 6, type: 'truth', difficulty: 'mild', text: 'What is the most embarrassing thing in your search history?' },
  { id: 7, type: 'truth', difficulty: 'mild', text: 'What is your worst habit?' },
  
  // Medium truths
  { id: 8, type: 'truth', difficulty: 'medium', text: 'What is your biggest insecurity?' },
  { id: 9, type: 'truth', difficulty: 'medium', text: 'What is the biggest mistake you've ever made?' },
  { id: 10, type: 'truth', difficulty: 'medium', text: 'What is something you're afraid to tell your parents?' },
  { id: 11, type: 'truth', difficulty: 'medium', text: 'What is the weirdest thought you've ever had?' },
  { id: 12, type: 'truth', difficulty: 'medium', text: 'What is your biggest regret?' },
  { id: 13, type: 'truth', difficulty: 'medium', text: 'What is the most embarrassing thing you've done while drunk?' },
  { id: 14, type: 'truth', difficulty: 'medium', text: 'What is a secret you've never told anyone?' },
  
  // Spicy truths
  { id: 15, type: 'truth', difficulty: 'spicy', text: 'What is your most controversial opinion?' },
  { id: 16, type: 'truth', difficulty: 'spicy', text: 'What is the biggest lie you've ever told?' },
  { id: 17, type: 'truth', difficulty: 'spicy', text: 'What is something you'd never want your family to know about you?' },
  { id: 18, type: 'truth', difficulty: 'spicy', text: 'What is the most embarrassing thing that's happened to you in a romantic situation?' },
  { id: 19, type: 'truth', difficulty: 'spicy', text: 'What is your biggest fantasy?' },
  { id: 20, type: 'truth', difficulty: 'spicy', text: 'What is a secret you've been keeping from your best friend?' },
  { id: 21, type: 'truth', difficulty: 'spicy', text: 'What is the meanest thing you've ever done to someone?' }
];

export const dareQuestions: GameQuestion[] = [
  // Mild dares
  { id: 101, type: 'dare', difficulty: 'mild', text: 'Do your best impression of a celebrity.' },
  { id: 102, type: 'dare', difficulty: 'mild', text: 'Sing the chorus of your favorite song.' },
  { id: 103, type: 'dare', difficulty: 'mild', text: 'Tell a joke that makes everyone laugh.' },
  { id: 104, type: 'dare', difficulty: 'mild', text: 'Do 10 jumping jacks.' },
  { id: 105, type: 'dare', difficulty: 'mild', text: 'Take a silly selfie and show everyone.' },
  { id: 106, type: 'dare', difficulty: 'mild', text: 'Speak in an accent for the next three rounds.' },
  { id: 107, type: 'dare', difficulty: 'mild', text: 'Make up a short poem on the spot.' },
  
  // Medium dares
  { id: 108, type: 'dare', difficulty: 'medium', text: 'Call a friend and sing Happy Birthday to them.' },
  { id: 109, type: 'dare', difficulty: 'medium', text: 'Do your best dance move.' },
  { id: 110, type: 'dare', difficulty: 'medium', text: 'Let someone else post a status on your social media.' },
  { id: 111, type: 'dare', difficulty: 'medium', text: 'Show the last five photos in your camera roll.' },
  { id: 112, type: 'dare', difficulty: 'medium', text: 'Let someone go through your text messages for 30 seconds.' },
  { id: 113, type: 'dare', difficulty: 'medium', text: 'Do your best impression of someone in the room.' },
  { id: 114, type: 'dare', difficulty: 'medium', text: 'Tell an embarrassing story about yourself.' },
  
  // Spicy dares
  { id: 115, type: 'dare', difficulty: 'spicy', text: 'Let the group look through your DMs for one minute.' },
  { id: 116, type: 'dare', difficulty: 'spicy', text: 'Eat a spoonful of the spiciest condiment available.' },
  { id: 117, type: 'dare', difficulty: 'spicy', text: 'Send a flirty text to a random contact.' },
  { id: 118, type: 'dare', difficulty: 'spicy', text: 'Let someone else send a message to anyone in your contacts.' },
  { id: 119, type: 'dare', difficulty: 'spicy', text: 'Post an embarrassing childhood photo on social media.' },
  { id: 120, type: 'dare', difficulty: 'spicy', text: 'Show everyone your last three searches on your browser.' },
  { id: 121, type: 'dare', difficulty: 'spicy', text: 'Tell everyone your most embarrassing story.' }
];

export const getRandomQuestion = (type: GameType, difficulty: Difficulty): GameQuestion => {
  const questions = type === 'truth' ? truthQuestions : dareQuestions;
  const filteredQuestions = questions.filter(q => q.difficulty === difficulty);
  const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
  return filteredQuestions[randomIndex];
};
