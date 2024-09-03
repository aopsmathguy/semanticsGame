import { useState, useEffect } from "react";
import {
    StyledRoomSettingsContainer,
    StyledSettingRow,
    StyledLabel,
    StyledSelect,
    StyledButton,
} from "./styles";
function RoomSettings({ settings, onChangeSettings, onStartGame, isHost }) {
    const [localSettings, setLocalSettings] = useState(settings);
    useEffect(() => {
        setLocalSettings(settings);
    }, [settings]);
    const handleChange = (event) => {
        const { name, value } = event.target;
        let newValue = 0;
        try {
            newValue = parseInt(value);
        } catch (e) {
            newValue = value;
        }
        const newSettings = { ...localSettings, [name]: newValue };
        setLocalSettings(newSettings);
        onChangeSettings({ settings : newSettings });
    };
    const handleStartClick = () => {
        onStartGame({}); // no data needed for now
    }
    return (
        <StyledRoomSettingsContainer>
            <StyledSettingRow>
                <StyledLabel htmlFor="maxPlayers">
                    Max Players:
                </StyledLabel>
                <StyledSelect
                    id="maxPlayers"
                    name="maxPlayers"
                    value={localSettings.maxPlayers}
                    onChange={handleChange}
                    disabled={!isHost}
                >
                    {/* Add options for max players (e.g., 2-10) */}
                    {Array.from({ length: 19 }, (_, i) => i + 2).map(
                        (num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        )
                    )}
                </StyledSelect>
            </StyledSettingRow>

            <StyledSettingRow>
                <StyledLabel htmlFor="guessTime">
                    Guess Time (seconds):
                </StyledLabel>
                <StyledSelect
                    id="guessTime"
                    name="guessTime"
                    value={localSettings.guessTime}
                    onChange={handleChange}
                    disabled={!isHost}
                >
                    {/* Add options for guess time (e.g., 30, 60, 90) */}
                    {[15,30,45, 60, 90, 120,150, 180, 210].map((time) => (
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
                    id="numberOfRounds"
                    name="numberOfRounds"
                    value={localSettings.numberOfRounds}
                    onChange={handleChange}
                    disabled={!isHost}
                >
                    {/* Add options for number of rounds (e.g., 3-10) */}
                    {Array.from({ length: 20 }, (_, i) => i + 1).map(
                        (num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        )
                    )}
                </StyledSelect>
            </StyledSettingRow>

            <StyledSettingRow>
                <StyledLabel htmlFor="numberOfHints">
                    Number of Hints:
                </StyledLabel>
                <StyledSelect
                    id="numberOfHints"
                    name="numberOfHints"
                    value={localSettings.numberOfHints}
                    onChange={handleChange}
                    disabled={!isHost}
                >
                    {/* Add options for number of hints (e.g., 0-5) */}
                    {Array.from({ length: 21 }, (_, i) => i).map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </StyledSelect>
            </StyledSettingRow>
            <StyledSettingRow>
                <StyledButton onClick={handleStartClick} disabled={!isHost}>
                    Start
                </StyledButton>
            </StyledSettingRow>
        </StyledRoomSettingsContainer>
    );
}

export default RoomSettings;
