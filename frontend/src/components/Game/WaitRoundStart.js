import { StyledText } from '../Shared/styles';
function WaitRoundStart({
    timer,
    currentRound,
}){
    return <>
        <StyledText fontSize={30} color="white">Round {currentRound}</StyledText>
        <StyledText fontSize={60} color="white">{timer}</StyledText>
    </>
}
export default WaitRoundStart;