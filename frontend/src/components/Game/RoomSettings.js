import { useState } from "react";
import {
    StyledRoomSettingsContainer,
    StyledSettingRow,
    StyledLabel,
    StyledSelect,
    StyledButton,
} from "./styles";
import { StyledText } from "../Shared/styles";
function RoomSettings({ settings, onChangeSettings, onStartGame, isHost }) {
    const [localSettings, setLocalSettings] = useState(settings);

    const handleChange = (event) => {
        const { name, value } = event.target;
        let newValue = 0;
        try {
            newValue = parseInt(value);
        } catch (e) {
            newValue = value;
        }
        setLocalSettings({ ...localSettings, [name]: newValue });
        onChangeSettings({ ...localSettings, [name]: newValue });
    };
    return (
        <StyledRoomSettingsContainer>
            <StyledSettingRow>
                <StyledLabel htmlFor="maxPlayers">
                    <StyledText color="white">Max Players:</StyledText>
                </StyledLabel>
                <StyledText>
                    <StyledSelect
                        id="maxPlayers"
                        name="maxPlayers"
                        value={localSettings.maxPlayers}
                        onChange={handleChange}
                        disabled={!isHost}
                    >
                        {/* Add options for max players (e.g., 2-10) */}
                        {Array.from({ length: 9 }, (_, i) => i + 2).map(
                            (num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            )
                        )}
                    </StyledSelect>
                </StyledText>
            </StyledSettingRow>

            <StyledSettingRow>
                <StyledLabel htmlFor="guessTime">
                    <StyledText color="white">Guess Time (seconds):</StyledText>
                </StyledLabel>
                <StyledText>
                    <StyledSelect
                        id="guessTime"
                        name="guessTime"
                        value={localSettings.guessTime}
                        onChange={handleChange}
                        disabled={!isHost}
                    >
                        {/* Add options for guess time (e.g., 30, 60, 90) */}
                        {[30, 60, 90, 120].map((time) => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))}
                    </StyledSelect>
                </StyledText>
            </StyledSettingRow>

            {/* Add similar rows for numberOfRounds and numberOfHints */}
            <StyledSettingRow>
                <StyledLabel htmlFor="numberOfRounds">
                    <StyledText color="white"> Number of Rounds:</StyledText>
                </StyledLabel>
                <StyledText>
                    <StyledSelect
                        id="numberOfRounds"
                        name="numberOfRounds"
                        value={localSettings.numberOfRounds}
                        onChange={handleChange}
                        disabled={!isHost}
                    >
                        {/* Add options for number of rounds (e.g., 3-10) */}
                        {Array.from({ length: 8 }, (_, i) => i + 3).map(
                            (num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            )
                        )}
                    </StyledSelect>
                </StyledText>
            </StyledSettingRow>

            <StyledSettingRow>
                <StyledLabel htmlFor="numberOfHints">
                    <StyledText color="white">Number of Hints:</StyledText>
                </StyledLabel>
                <StyledText>
                    <StyledSelect
                        id="numberOfHints"
                        name="numberOfHints"
                        value={localSettings.numberOfHints}
                        onChange={handleChange}
                        disabled={!isHost}
                    >
                        {/* Add options for number of hints (e.g., 0-5) */}
                        {Array.from({ length: 6 }, (_, i) => i).map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </StyledSelect>
                </StyledText>
            </StyledSettingRow>
            <StyledSettingRow>
                <StyledButton onClick={onStartGame} disabled={!isHost}>
                    <StyledText justify={"center"}>Start</StyledText>
                </StyledButton>
            </StyledSettingRow>
        </StyledRoomSettingsContainer>
    );
}

export default RoomSettings;
