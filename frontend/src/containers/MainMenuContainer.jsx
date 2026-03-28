//game screen
import React, { useEffect, useState, useRef } from "react";
import MainMenu from "../components/MainMenu/MainMenu";

import { useSelector } from "react-redux";
import { selectProfile } from "../redux/slices/game";
import { emit } from "../ws";

function MainMenuContainer() {
    const profile = useSelector(selectProfile);
    return <MainMenu profile={profile} sendJoin={(data) => emit("join", data)} />;
}
export default MainMenuContainer;
