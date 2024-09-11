import { StyledText } from '../Shared/styles';
function WaitRoundStart({
    timer,
    currentRound,
    settings
}){
    const { numberOfRounds } = settings;
    return <>
        <StyledText fontSize={30} color="white">Round {currentRound} of {numberOfRounds}</StyledText>
        <StyledText fontSize={60} color="white">{timer}</StyledText>
    </>
}
export default WaitRoundStart;