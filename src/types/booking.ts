export type BookingStatus = "confirmed" | "canceled";

export interface Booking {
    id: string;
    title: string;
    description?: string;
    startTime: string;
    endTime: string;
    date: string;
    roomId: string;
    organizerId: string;
    status: BookingStatus;
}

export type BookingFormValues = {
  title: string;
  description: string;
  date: string;
  startTime: string;
  duration: number;
  roomId: string;
  organizerId: string;
};