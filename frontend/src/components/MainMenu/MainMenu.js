import React, { useState } from "react";
import Avatar from "../Shared/Avatar";
import {
    StyledMainMenuWrapper,
    AvatarContainer,
    InputContainer,
    Input,
    AvatarControls,
    ControlButton,
    JoinButton,
    AvatarControl,
} from "./styles";

import eyesFrames from "../Shared/images/eyes_frames.json";
import fillOutlineFrames from "../Shared/images/fill_outline_frames.json";
import colorFilters from "../Shared/images/color_filters.json";
import { StyledText } from "../Shared/styles";

function MainMenu({ profile, sendJoin }) {
    const shapeNum = fillOutlineFrames.frames.length;
    const colorNum = colorFilters.colors.length;
    const eyesNum = eyesFrames.frames.length;

    const { name, avatar } = profile || {};
    const [localName, setLocalName] = useState(name || "");
    const onNameChange = (e) => {
        setLocalName(e.target.value);
    }
    const [shapeIdx, setShapeIdx] = useState(avatar?.shapeIdx || 0);
    const [colorIdx, setColorIdx] = useState(avatar?.colorIdx || 0);
    const [eyesIdx, setEyesIdx] = useState(avatar?.eyesIdx || 0);

    const clickLeftShape = () => {
        setShapeIdx((shapeIdx + shapeNum - 1) % shapeNum);
    };
    const clickRightShape = () => {
        setShapeIdx((shapeIdx + 1) % shapeNum);
    };
    const clickLeftColor = () => {
        setColorIdx((colorIdx + colorNum - 1) % colorNum);
    };
    const clickRightColor = () => {
        setColorIdx((colorIdx + 1) % colorNum);
    };
    const clickLeftEyes = () => {
        setEyesIdx((eyesIdx + eyesNum - 1) % eyesNum);
    };
    const clickRightEyes = () => {
        setEyesIdx((eyesIdx + 1) % eyesNum);
    };
    const clickFindGame = () => {
        const info = {
            profile: {
                name: localName,
                avatar: { shapeIdx, colorIdx, eyesIdx },
            },
        }
        console.log("Joining game with profile", info)
        sendJoin(info);
    };
    return (
        <StyledMainMenuWrapper>
            <StyledText fontSize={64}>COSEMANTLE</StyledText>
            <StyledText>A game of guessing words based on association</StyledText>
            <AvatarContainer>
                <InputContainer>
                    <Input type="text" placeholder="Enter your name"
                    onChange={onNameChange} value={localName}
                     />
                </InputContainer>

                <AvatarControls>
                    <ControlButton>
                        <AvatarControl onClick={clickLeftShape}>{"⬅️"}</AvatarControl>
                        <AvatarControl onClick={clickLeftColor}>{"⬅️"}</AvatarControl>
                        <AvatarControl onClick={clickLeftEyes}>{"⬅️"}</AvatarControl>
                    </ControlButton>
                    <Avatar size={96} opts={{ shapeIdx, colorIdx, eyesIdx }} />
                    <ControlButton>
                        <AvatarControl onClick={clickRightShape}>{"➡️"}</AvatarControl>
                        <AvatarControl onClick={clickRightColor}>{"➡️"}</AvatarControl>
                        <AvatarControl onClick={clickRightEyes}>{"➡️"}</AvatarControl>
                    </ControlButton>
                </AvatarControls>
                <InputContainer>
                    <JoinButton 
                        onClick={clickFindGame}
                    >Find a Game</JoinButton>
                </InputContainer>
            </AvatarContainer>
        </StyledMainMenuWrapper>
    );
}

export default MainMenu;
