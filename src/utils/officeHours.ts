export const OFFICE_START = "09:00";
export const OFFICE_END = "18:00";

export function isWithinOfficeHours(
  startTime: string,
  endTime: string,
) {
  return startTime >= OFFICE_START && endTime <= OFFICE_END;
}