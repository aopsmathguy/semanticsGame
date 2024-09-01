import { StyledGuessAreaOverlay, StyledGuessAreaOverlayContent } from './styles';
//on gameState = "WAIT_START_GAME", show settings
//on gameState = "WAIT_ROUND_START", show round number with timer
//on gameState = "GUESSING", hide overlay
//on gameState = "WAIT_ROUND_END", show target word and roundScores
//on gameState = "WAIT_GAME_END", show final scores podium
function RoomSettings({
    settings,
    onSettingsChange,
    isHost
}){
    
}
function GameAreaOverlay({
    gameState,
    currentRound,
    timer,
    playerId,
    players,
}) {
    const hidden = gameState == "GUESSING";
    return <>
        <StyledGuessAreaOverlay hidden={hidden}/>
        <StyledGuessAreaOverlayContent hidden={hidden}>
            
        </StyledGuessAreaOverlayContent>
    </>
}
export default GameAreaOverlay;