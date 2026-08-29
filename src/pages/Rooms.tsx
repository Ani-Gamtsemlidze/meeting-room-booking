import { useEffect } from "react";
import { useRoomStore } from "../store/useRoomStore";

export default function Rooms() {
  const { rooms, fetchRooms, loading } = useRoomStore();
  useEffect(() => {
      fetchRooms();
    }, [fetchRooms]);

    if (loading) return <p>Loading rooms</p>
  return (
    <div>
      {rooms.map((room) => (
        <p key={room.id}>{room.name}</p>
      ))}
    </div>
  );
}
