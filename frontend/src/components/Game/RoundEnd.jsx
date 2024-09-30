import { StyledText } from "../Shared/styles";
import {
    StyledPlayerRoundScores,
    StyledPlayerRoundScoresContainer,
    StyledWordReveal,
} from "./styles";
import Avatar from "../Shared/Avatar";
function RoundEnd({ players, targetWord, currentRound, settings }) {
    const { numberOfRounds } = settings;
    return (
        <>
            <StyledText fontSize={3} color="white">
                ROUND {currentRound}
            </StyledText>
            <StyledWordReveal>
                <StyledText fontSize={1.5} color="white">
                    The word was&nbsp;
                </StyledText>
                <StyledText fontSize={2.25} color="#0f0">
                    {targetWord}
                </StyledText>
            </StyledWordReveal>
            <StyledPlayerRoundScoresContainer>
                {[...Object.entries(players)]
                    .sort(
                        (a, b) =>
                            b[1].playerRoomInfo.roundScore -
                            a[1].playerRoomInfo.roundScore
                    )
                    .map(([id, { profile, playerRoomInfo }]) => (
                        <StyledPlayerRoundScores key={id}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Avatar size={48} opts={profile.avatar} />
                                <StyledText
                                    key={playerRoomInfo.playerId}
                                    fontSize={1}
                                    color="white"
                                >
                                    {profile.name}:
                                </StyledText>
                            </div>
                            {playerRoomInfo.roundScore > 0 ? (
                                <StyledText fontSize={1} color={"#0f0"}>
                                    +{playerRoomInfo.roundScore}
                                </StyledText>
                            ) : (
                                <StyledText fontSize={1} color={"#f00"}>
                                    {playerRoomInfo.roundScore}
                                </StyledText>
                            )}
                        </StyledPlayerRoundScores>
                    ))}
            </StyledPlayerRoundScoresContainer>
        </>
    );
}
export default RoundEnd;
