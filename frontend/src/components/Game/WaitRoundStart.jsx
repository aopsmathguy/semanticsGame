import { StyledText } from '../Shared/styles';
function WaitRoundStart({
    timer,
    currentRound,
    settings
}){
    const { numberOfRounds } = settings;
    return <>
        <StyledText fontSize={1.5} color="white">Round {currentRound} of {numberOfRounds}</StyledText>
        <StyledText fontSize={3} color="white">{timer}</StyledText>
    </>
}
export default WaitRoundStart;