import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import type { BookingFormValues } from "../../types/booking";

export interface BookingFormFieldProps {
  register: UseFormRegister<BookingFormValues>;
  errors: FieldErrors<BookingFormValues>;
}