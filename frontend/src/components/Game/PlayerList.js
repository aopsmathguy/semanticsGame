import React from "react";
import {
    StyledPlayerListArea,
    StyledPlayerListContainer,
    StyledPlayerCard,
    StyledPlayerInfo,
    StyledPlayerName,
    StyledPlayerScore,
    StyledPlayerAvatar,
} from "./styles";
import Avatar from "../Shared/Avatar";
function PlayerList({ players, playerId, hostId }) {
    const myPlayerId = playerId;
    const playerValues = Object.values(players);
    return (
        <StyledPlayerListArea>
            <StyledPlayerListContainer>
                {playerValues.map(({ profile, playerRoomInfo }) => {
                    const { name, avatar } = profile;
                    const { colorIdx, shapeIdx, eyesIdx } = avatar;
                    const { playerId, score, solved } = playerRoomInfo;
                    return (
                        <StyledPlayerCard key={playerId} solved={solved}>
                            <StyledPlayerInfo>
                                <StyledPlayerName isMe={playerId == myPlayerId} isHost={playerId==hostId}>
                                        {name}
                                </StyledPlayerName>
                                <StyledPlayerScore>
                                    {score} points
                                </StyledPlayerScore>
                            </StyledPlayerInfo>
                            <StyledPlayerAvatar>
                                <Avatar
                                    opts={{ colorIdx, shapeIdx, eyesIdx }}
                                    size={48}
                                />
                            </StyledPlayerAvatar>
                        </StyledPlayerCard>
                    );
                })}
            </StyledPlayerListContainer>
        </StyledPlayerListArea>
    );
}
export default PlayerList;
