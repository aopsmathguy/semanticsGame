import React from "react";
import {
    StyledPlayerListArea,
    StyledPlayerListContainer,
    StyledPlayerCard,
    StyledPlayerInfo,
    StyledPlayerName,
    StyledPlayerScore,
    StyledPlayerAvatar,
    StyledPlayerRank,
} from "./styles";
import Avatar from "../Shared/Avatar";

function PlayerList({ players, playerId, hostId }) {
    const myPlayerId = playerId;
    const playerValues = [...Object.values(players)].sort((a, b) => b.playerRoomInfo.score - a.playerRoomInfo.score);

    let rank = 1;
    let lastScore = null;

    return (
        <StyledPlayerListArea>
            <StyledPlayerListContainer>
                {playerValues.map(({ profile, playerRoomInfo }, i) => {
                    const { name, avatar } = profile;
                    const { playerId, score, solved } = playerRoomInfo;

                    // Handle ties
                    if (lastScore !== score) {
                        rank = i + 1;
                    }
                    lastScore = score;

                    return (
                        <StyledPlayerCard key={playerId} solved={solved}>
                            <StyledPlayerInfo>
                                <StyledPlayerName isMe={playerId == myPlayerId} isHost={playerId == hostId}>
                                    {name}
                                </StyledPlayerName>
                                <StyledPlayerScore>
                                    {score} points
                                </StyledPlayerScore>
                            </StyledPlayerInfo>
                            <StyledPlayerAvatar>
                                <Avatar
                                    opts={avatar}
                                    size={48}
                                />
                            </StyledPlayerAvatar>
                            <StyledPlayerRank>
                                #{rank}
                            </StyledPlayerRank>
                        </StyledPlayerCard>
                    );
                })}
            </StyledPlayerListContainer>
        </StyledPlayerListArea>
    );
}

export default PlayerList;