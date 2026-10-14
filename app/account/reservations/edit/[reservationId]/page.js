import { updateBookingAction } from "@/app/_lib/action";
import { auth } from "@/app/_lib/auth";
import { getBooking } from "@/app/_lib/data-service";
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }) {
  const { reservationId } = await params;

  const session = await auth();

  if (!session) redirect("/account");

  // Retrieve the booking using its actual ID
  const booking = await getBooking(reservationId);

  // Security: make sure this booking belongs to the logged-in guest
  if (booking.guestId !== session.user.guestId) {
    notFound();
  }

  const maxCapacity = booking.numGuests; // Replace with cabin.maxCapacity if needed

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{booking.id}
      </h2>

      <form
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
        action={updateBookingAction.bind(null, booking.id)}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={booking.numGuests}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={booking.observations ?? ""}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all">
            Update reservation
          </button>
        </div>
      </form>
    </div>
  );
}
