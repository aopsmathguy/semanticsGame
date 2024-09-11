import React from 'react';
import { StyledWelcomeSection } from './styles';
const WelcomeSection = () => {
  return (
    <StyledWelcomeSection>
      <h2>Welcome to Cosemantle!</h2>

      <h3>The Goal:</h3>
      <p>Be the first to guess the secret word!</p>

      <h3>How to Play:</h3>
      <ul>
        <li>
          <strong>Live Multiplayer:</strong> Compete against other players in
          real-time to be the first to crack the code.
        </li>
        <li>
          <strong>Guess by meaning:</strong> Each guess must be a single word.
          Cosemantle will tell you how semantically similar your guess is to the
          secret word. Sometimes, common misspellings will have a higher score!
        </li>
        <li>
          <strong>AI-powered:</strong> We use an advanced OpenAI embedding
          model to calculate the semantic distance between words, showing how
          closely related they are.
        </li>
        <li>
          <strong>Community clues:</strong> See guesses from other players,
          unless their guess is too close to the secret word.
        </li>
        <li>
          <strong>Get a head start:</strong> At the beginning of each round, you'll
          receive a few "hints" - guesses that are already closely related to the
          secret word. Use them wisely!
        </li>
        <li>
          <strong>Limited time:</strong> Each round has a time limit, so be quick
          and strategic! Wrong guesses do not negatively impact your score.
        </li>
        <li>
          <strong>Explore the semantic landscape:</strong> Unleash your
          vocabulary and enjoy the competitive challenge!
        </li>
      </ul>

      <h3>Join the fun!</h3>
    </StyledWelcomeSection>
  );
};

export default WelcomeSection;