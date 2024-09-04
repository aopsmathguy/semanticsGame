import { StyledText } from '../Shared/styles';
function WaitRoundStart({
    gameState,
    timer,
    currentRound,
}){
    return <>
        <StyledText fontSize={30} color="white">Round {currentRound}</StyledText>
        <StyledText fontSize={60} color="white">{ gameState == "WAIT_ROUND_START" ? timer : 0}</StyledText>
    </>
}
export default WaitRoundStart;