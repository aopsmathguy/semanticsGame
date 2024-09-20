import { useState, useEffect } from "react";
import {
    StyledRoomSettingsContainer,
    StyledRoomSettingsListContainer,
    StyledSettingRow,
    StyledStartButtonContainer,
    StyledLabel,
    StyledSelect,
    StyledButton,
} from "./styles";
function RoomSettings({ settings, onChangeSettings, onStartGame, isHost }) {
    const [localSettings, setLocalSettings] = useState(settings);
    useEffect(() => {
        setLocalSettings(settings);
    }, [settings]);

    const changeSettings = (name, value) => {
        const newSettings = { ...localSettings, [name]: value };
        setLocalSettings(newSettings);
        onChangeSettings({ settings: newSettings });
    };
    const handleStartClick = () => {
        onStartGame({}); // no data needed for now
    };
    return (
        <StyledRoomSettingsContainer>
            <StyledRoomSettingsListContainer>
                <StyledSettingRow>
                    <StyledLabel htmlFor="maxPlayers">Max Players:</StyledLabel>
                    <StyledSelect
                        value={localSettings.maxPlayers}
                        onChange={(e) =>
                            changeSettings("maxPlayers", parseInt(e.target.value))
                        }
                        disabled={!isHost}
                    >
                        {/* Add options for max players (e.g., 2-10) */}
                        {Array.from({ length: 19 }, (_, i) => i + 2).map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </StyledSelect>
                </StyledSettingRow>

                <StyledSettingRow>
                    <StyledLabel htmlFor="guessTime">
                        Guess Time (seconds):
                    </StyledLabel>
                    <StyledSelect
                        value={localSettings.guessTime}
                        onChange={(e) =>
                            changeSettings("guessTime", parseInt(e.target.value))
                        }
                        disabled={!isHost}
                    >
                        {/* Add options for guess time (e.g., 30, 60, 90) */}
                        {[15, 30, 45, 60, 90, 120, 150, 180, 210].map((time) => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))}
                    </StyledSelect>
                </StyledSettingRow>

                {/* Add similar rows for numberOfRounds and numberOfHints */}
                <StyledSettingRow>
                    <StyledLabel htmlFor="numberOfRounds">
                        Number of Rounds:
                    </StyledLabel>
                    <StyledSelect
                        value={localSettings.numberOfRounds}
                        onChange={(e) =>
                            changeSettings("numberOfRounds", parseInt(e.target.value))
                        }
                        disabled={!isHost}
                    >
                        {/* Add options for number of rounds (e.g., 3-10) */}
                        {[2,3,5,8,12,20].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </StyledSelect>
                </StyledSettingRow>

                <StyledSettingRow>
                    <StyledLabel htmlFor="numberOfHints">
                        Number of Hints:
                    </StyledLabel>
                    <StyledSelect
                        value={localSettings.numberOfHints}
                        onChange={(e) =>
                            changeSettings("numberOfHints", parseInt(e.target.value))
                        }
                        disabled={!isHost}
                    >
                        {[0,1,2,3,5,8,12,20].map((num) => (
                            <option key={num} value={num} data-int-value={num}>
                                {num}
                            </option>
                        ))}
                    </StyledSelect>
                </StyledSettingRow>
            </StyledRoomSettingsListContainer>
            <StyledStartButtonContainer>
                <StyledButton onClick={handleStartClick} disabled={!isHost}>
                    Start
                </StyledButton>
            </StyledStartButtonContainer>
        </StyledRoomSettingsContainer>
    );
}

export default RoomSettings;
