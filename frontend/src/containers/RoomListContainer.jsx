//game screen
import React, { useEffect, useState, useRef } from "react";
import RoomList from "../components/RoomList/RoomList";

import { useSelector } from "react-redux";
import { selectRoomList } from "../redux/slices/game";

import useSocket from "../ws";

function RoomListContainer() {
    const roomList = useSelector(selectRoomList);

    const socket = useSocket();
    const onJoinRoom = socket.emitJoinRoom;
    const onMakeRoom = socket.emitMakeRoom;
    const onRefresh = socket.emitRoomListRequest;
    return (
        <RoomList
            roomList={roomList}
            onJoinRoom={onJoinRoom}
            onMakeRoom={onMakeRoom}
            onRefresh={onRefresh}
        />
    );
}
export default RoomListContainer;
