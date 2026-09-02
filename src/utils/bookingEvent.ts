import { roomColor } from "./roomColors";
import type { Booking, Room } from "../types";

export function bookingToEvent(booking: Booking, rooms: Room[]) {
  const room = rooms.find((r) => r.id === booking.roomId);
  const color = roomColor(room);
  return {
    id: booking.id,
    title: booking.title,
    start: `${booking.date}T${booking.startTime}`,
    end: `${booking.date}T${booking.endTime}`,
    backgroundColor: color,
    borderColor: color,
    extendedProps: {
      roomName: room?.name ?? "Unknown room",
      color,
    },
  };
}