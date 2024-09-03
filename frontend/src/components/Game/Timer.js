
import SpriteImage from "../Shared/SpriteImage";
import { StyledEmphasis, StyledTimer } from "./styles";
import alarmClock from "../Shared/images/alarm_clock.png";
import alarmClockFill from "../Shared/images/alarm_clock_fill.png";
import color_filters from "../Shared/images/color_filters.json";
import { StyledText } from "../Shared/styles";
function Timer({ timer, timerEmphasize }) {
    const filter = color_filters.colors[2].filter;
    return <StyledTimer>
        <StyledEmphasis timerEmphasis={timerEmphasize}>
            <SpriteImage atlas={alarmClockFill} size={70} filter={filter}/>
        </StyledEmphasis>
        <SpriteImage atlas={alarmClock} size={70}>
            <StyledText fontSize={24}><b>{timer}</b></StyledText>
        </SpriteImage>

    </StyledTimer>
}
export default Timer;