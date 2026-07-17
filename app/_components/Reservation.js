import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { ReservationProvider } from "../context/ReservationContext";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }) {
  //Fetch for Date & Reservation
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  return (
    <div>
      <div className="grid grid-cols-[7fr_5fr] min-h-[400px] w-full border-2 border-primary-800">
        <DateSelector
          settings={settings}
          bookedDates={bookedDates}
          cabin={cabin}
        />
        <ReservationForm cabin={cabin} />
      </div>
    </div>
  );
}

export default Reservation;
