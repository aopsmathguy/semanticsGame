//game screen
import React, { useEffect, useState, useRef } from "react";
import RoomList from "../components/RoomList/RoomList";

import { useSelector } from "react-redux";
import { selectRoomList } from "../redux/slices/game";

import { emit } from "../ws";

function RoomListContainer() {
    const roomList = useSelector(selectRoomList);
    return (
        <RoomList
            roomList={roomList}
            onJoinRoom={(data) => emit("join-room", data)}
            onMakeRoom={(data) => emit("make-room", data)}
            onRefresh={(data) => emit("room-list-request", data)}
        />
    );
}
export default RoomListContainer;
