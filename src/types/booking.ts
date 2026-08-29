export type BookingStatus = "confirmed" | "cancelled";

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