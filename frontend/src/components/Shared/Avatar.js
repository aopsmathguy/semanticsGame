import React from "react";
import SpriteImage from "./SpriteImage";
import { StyledAvatarContainer } from "./styles";
import eyesFrames from "./images/eyes_frames.json";
import fillOutlineFrames from "./images/fill_outline_frames.json";
import colorFilters from "./images/color_filters.json";

import fillAtlas from "./images/fill_atlas.png";
import outlineAtlas from "./images/outline_atlas.png";
import eyesAtlas from "./images/eyes_atlas.png";
function Avatar({ size, opts }) {
    const { shapeIdx, colorIdx, eyesIdx } = opts;
    const avatarSize = size || 48;
    const eyeIndex = eyesIdx || 0;
    return (
        <StyledAvatarContainer size={avatarSize}>
            <SpriteImage
                index={shapeIdx}
                atlas={fillAtlas}
                spritesheetData={fillOutlineFrames}
                filter={colorFilters.colors[colorIdx].filter}
                size={avatarSize}
            />
            <SpriteImage
                index={shapeIdx}
                atlas={outlineAtlas}
                spritesheetData={fillOutlineFrames}
                size={avatarSize}
            />
            <SpriteImage
                index={eyeIndex}
                atlas={eyesAtlas}
                spritesheetData={eyesFrames}
                size={avatarSize}
            />
        </StyledAvatarContainer>
    );
}

export default Avatar;