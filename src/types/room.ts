export type RoomType = "huddle" | "meeting" | "conference" | "training";

export type RoomStatus = "active" | "maintenance" | "inactive";
export type RoomAmenity =
  | "projector"
  | "whiteboard"
  | "video-conference"
  | "tv-screen";

export interface Room {
  id: string;
  name: string;
  description: string;
  type: RoomType;
  capacity: number;
  floor: number;
  amenities: RoomAmenity[];
  isAccessible: boolean;
  status: RoomStatus;
}
