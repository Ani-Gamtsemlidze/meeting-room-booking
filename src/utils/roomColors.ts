import type { RoomType, Room } from "../types";

    const roomPalette = [
    "#6366f1", // indigo
    "#14b8a6", // teal
    "#f59e0b", // amber
    "#ec4899", // pink
    "#3b82f6", // blue
    "#8b5cf6", // violet
    "#10b981", // emerald
    "#f97316", // orange
    ];

export function roomColor(room?: Room | { id: string; type?: RoomType }): string {
  if (!room) return "#94a3b8";
  const hash = Array.from(room.id).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );
  return roomPalette[hash % roomPalette.length];
}

export const roomTypeLabels: Record<RoomType, string> = {
  huddle: "Huddle",
  meeting: "Meeting",
  conference: "Conference",
  training: "Training",
};