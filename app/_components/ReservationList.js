"use client";
import { useOptimistic } from "react";
//useOptimistic need be in CC
import ReservationCard from "./ReservationCard";
import { deleteBookingAction } from "../_lib/action";

export function ReservationList({ bookings }) {
  //we pass in the current state at first , do update function

  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id == !bookingId);
    }
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteBookingAction(bookingId);
  }

  return (
    <ul className="space-y-6">
      {bookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
