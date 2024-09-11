import React from "react";
import { StyledSpriteImage } from "./styles";

const SpriteImage = ({ index, atlas, spritesheetData, size, ...props }) => {
    if (!spritesheetData) {
        // If no spritesheetData, just display the image
        const style = {
            backgroundImage: `url('${atlas}')`,
            backgroundSize: 'contain', // Ensure image fits within container
            backgroundRepeat: 'no-repeat',
            width: size || 'auto', // Use size prop or let image determine width
            height: size || 'auto', // Use size prop or let image determine height
        };
        return <StyledSpriteImage style={style} {...props} />;
    }

    // Otherwise, proceed with sprite sheet logic
    const frameData = spritesheetData.frames[index];
    const frame = frameData.frame;

    const scaleFactor = size ? size / frame.w : 1; 

    const style = {
        backgroundImage: `url('${atlas}')`,
        backgroundPosition: `-${frame.x * scaleFactor}px -${
            frame.y * scaleFactor
        }px`,
        backgroundSize: `${spritesheetData.meta.size.w * scaleFactor}px ${
            spritesheetData.meta.size.h * scaleFactor
        }px`,
        width: frame.w * scaleFactor,
        height: frame.h * scaleFactor,
    };

    return <StyledSpriteImage style={style} {...props} />;
};

export default SpriteImage;