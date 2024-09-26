import Avatar from "../Shared/Avatar";
import { StyledText } from "../Shared/styles";
import {
    StyledPlayerRoundScores,
    StyledPlayerRoundScoresContainer,
} from "./styles";
function GameEnd({ players }) {
    return (
        <>
            <StyledText fontSize={3} color="white">
                GAME END
            </StyledText>
            <StyledPlayerRoundScoresContainer>
                {[...Object.values(players)]
                    .sort(
                        (a, b) =>
                            b.playerRoomInfo.score - a.playerRoomInfo.score
                    )
                    .map(({ profile, playerRoomInfo }) => (
                        <StyledPlayerRoundScores>
                            <div style={{display:"flex", alignItems:"center"}}>
                                <Avatar size={48} opts={profile.avatar} />
                                <StyledText
                                    key={playerRoomInfo.playerId}
                                    fontSize={1}
                                    color="white"
                                >
                                    {profile.name}:
                                </StyledText>
                            </div>
                            <StyledText fontSize={1} color={"#0f0"}>
                                {playerRoomInfo.score}
                            </StyledText>
                        </StyledPlayerRoundScores>
                    ))}
            </StyledPlayerRoundScoresContainer>
        </>
    );
}
export default GameEnd;
