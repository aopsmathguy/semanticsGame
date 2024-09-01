import React from "react";
import {
    StyledGuessListContainer,
    StyledGuessRow,
    StyledWordColumn,
    StyledSimilarityColumn,
    StyledProgressBarContainer,
    StyledProgressBarBorder,
    StyledProgressBar,
    StyledPlayerAvatarColumn
} from "./styles";
import Avatar from "../Shared/Avatar";
function GuessList({ guesses, lastGuessHash, players }) {
    return (
        <StyledGuessListContainer>
            <StyledGuessRow>
                <StyledWordColumn>Word</StyledWordColumn>
                <StyledSimilarityColumn>Similarity</StyledSimilarityColumn>
                <StyledProgressBarContainer></StyledProgressBarContainer>
                <StyledPlayerAvatarColumn>Player</StyledPlayerAvatarColumn>
            </StyledGuessRow>
            {Object.entries(guesses)
                .sort((a, b) => b[1].similarity - a[1].similarity)
                .map(([wordHash, { playerId, word, similarity }]) => {
                    const avatar = players[playerId]?.profile?.avatar;
                    return <StyledGuessRow
                        key={wordHash}
                        isLastGuess={wordHash == lastGuessHash}
                    >
                        <StyledWordColumn>{word}</StyledWordColumn>
                        <StyledSimilarityColumn>
                            {(100 * similarity).toFixed(1)}%
                        </StyledSimilarityColumn>
                        <StyledProgressBarContainer>
                            <StyledProgressBarBorder>
                                <StyledProgressBar sim={similarity} />
                            </StyledProgressBarBorder>
                        </StyledProgressBarContainer>
                        <StyledPlayerAvatarColumn>
                            {avatar &&
                            <Avatar opts={avatar} size={36} />}
                        </StyledPlayerAvatarColumn>
                    </StyledGuessRow>
                })}
        </StyledGuessListContainer>
    );
}

export default GuessList;
