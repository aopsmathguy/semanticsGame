import React from "react";
import SpriteImage from "./SpriteImage";
import { StyledAvatarContainer } from "./styles";
import colorFilters from "./images/color_filters.json";
import fillOutlineFrames from "./images/fill_outline_frames.json";
import eyesFrames from "./images/eyes_frames.json";
import mouthFrames from "./images/mouth_frames.json";

import fillAtlas from "./images/fill_atlas.png";
import outlineAtlas from "./images/outline_atlas.png";
import eyesAtlas from "./images/eyes_atlas.png";
import mouthAtlas from "./images/mouth_atlas.png";

function Avatar({ size, opts, ...props }) {
    const { shapeIdx, colorIdx, eyesIdx, mouthIdx } = opts;
    const avatarSize = size || 48;
    const eyeIndex = eyesIdx || 0;
    const mouthIndex = mouthIdx || 0;
    return (
        <StyledAvatarContainer size={avatarSize} {...props}>
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
            <SpriteImage
                index={mouthIndex}
                atlas={mouthAtlas}
                spritesheetData={mouthFrames}
                size={avatarSize}
            />
        </StyledAvatarContainer>
    );
}

export default Avatar;