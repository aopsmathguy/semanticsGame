import React, { useEffect } from "react";
import {
    StyledGuessListContainer,
    StyledGuessRow,
    StyledWordColumn,
    StyledSimilarityColumn,
    StyledProgressBarContainer,
    StyledProgressBarBorder,
    StyledProgressBar,
    StyledPlayerAvatarColumn,
    StyledPlayerAvatarContainer,
    StyledProgressBarWrapper,
    StyledProgressBarText,
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
                .map(([wordHash, { playerIds, word, similarity, ranking }]) => {
                    const avatars = playerIds.map(
                        (id) => players[id]?.profile?.avatar
                    );
                    return (
                        <StyledGuessRow
                            key={wordHash}
                            isLastGuess={wordHash == lastGuessHash}
                        >
                            <StyledWordColumn>{word}</StyledWordColumn>
                            <StyledSimilarityColumn>
                                {(100 * similarity).toFixed(1)}%
                            </StyledSimilarityColumn>
                            <StyledProgressBarContainer>
                                <StyledProgressBarWrapper>
                                    <StyledProgressBarBorder>
                                        <StyledProgressBar ranking={ranking} />
                                    </StyledProgressBarBorder>
                                    <StyledProgressBarText>
                                        {ranking == 100 ? "?" : `#${ranking}`}
                                    </StyledProgressBarText>
                                </StyledProgressBarWrapper>
                            </StyledProgressBarContainer>
                            <StyledPlayerAvatarColumn
                            >
                                {avatars.map(
                                    (avatar, i) =>
                                        avatar && (
                                            <StyledPlayerAvatarContainer
                                                key={i}
                                            >
                                                <Avatar
                                                    opts={avatar}
                                                    size={36}
                                                />
                                            </StyledPlayerAvatarContainer>
                                        )
                                )}
                            </StyledPlayerAvatarColumn>
                        </StyledGuessRow>
                    );
                })}
        </StyledGuessListContainer>
    );
}

export default GuessList;
