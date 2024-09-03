//game screen
import React, { useEffect, useState, useRef } from "react";
import MainMenu from "../components/MainMenu/MainMenu";

import { useSelector } from "react-redux";
import { selectProfile } from "../redux/slices/game";
import useSocket from "../ws";

function MainMenuContainer() {
    const profile = useSelector(selectProfile);
    const socket = useSocket();
    const sendJoin = socket.emitJoin;
    return <MainMenu profile={profile} sendJoin={sendJoin} />;
}
export default MainMenuContainer;
