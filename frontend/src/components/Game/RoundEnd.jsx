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
            <StyledText fontSize={60} color="white">
                ROUND {currentRound} OF {numberOfRounds} END
            </StyledText>
            <StyledWordReveal>
                <StyledText fontSize={30} color="white">
                    The word was&nbsp;
                </StyledText>
                <StyledText fontSize={45} color="#0f0">
                    {targetWord}
                </StyledText>
            </StyledWordReveal>
            <StyledPlayerRoundScoresContainer>
                {[...Object.values(players)]
                    .sort(
                        (a, b) =>
                            b.playerRoomInfo.roundScore -
                            a.playerRoomInfo.roundScore
                    )
                    .map(({ profile, playerRoomInfo }) => (
                        <StyledPlayerRoundScores>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Avatar size={48} opts={profile.avatar} />
                                <StyledText
                                    key={playerRoomInfo.playerId}
                                    fontSize={20}
                                    color="white"
                                >
                                    {profile.name}:
                                </StyledText>
                            </div>
                            {playerRoomInfo.roundScore > 0 ? (
                                <StyledText fontSize={20} color={"#0f0"}>
                                    +{playerRoomInfo.roundScore}
                                </StyledText>
                            ) : (
                                <StyledText fontSize={20} color={"#f00"}>
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
