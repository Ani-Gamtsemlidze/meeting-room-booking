import { useEffect } from "react";
import { useRoomStore } from "../store/useRoomStore";
import RoomList from "../components/rooms/RoomList";

export default function Rooms() {
  const { rooms, fetchRooms, loading } = useRoomStore();
  useEffect(() => {
      fetchRooms();
    }, [fetchRooms]);

    if (loading) return <p>Loading rooms</p>
  return (
    <RoomList rooms={rooms} />
  );
}
