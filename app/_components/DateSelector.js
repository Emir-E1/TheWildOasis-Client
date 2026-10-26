"use client";

import { differenceInDays, isWithinInterval, startOfDay } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "../context/ReservationContext";

function isAlreadyBooked(range, datesArr) {
  if (!range?.from || !range?.to) return false;

  return datesArr.some((date) =>
    isWithinInterval(startOfDay(date), {
      start: startOfDay(range.from),
      end: startOfDay(range.to),
    })
  );
}

function DateSelector({ settings, cabin, bookedDates }) {
  const { range, setRange } = useReservation();

  const { regularPrice, discount } = cabin;

  const numNights =
    range?.from && range?.to ? differenceInDays(range.to, range.from) : 0;

  const cabinPrice = numNights * regularPrice - discount;

  const minBookingLength = 1;
  const maxBookingLength = 23;

  const today = startOfDay(new Date());

  function isDateDisabled(date) {
    if (date < today) return true;

    return bookedDates.some((bookedDate) => {
      return startOfDay(bookedDate).getTime() === startOfDay(date).getTime();
    });
  }

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        min={minBookingLength}
        max={maxBookingLength}
        onSelect={(selectedRange) => setRange(selectedRange ?? {})}
        selected={range}
        fromDate={today}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={isDateDisabled}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}

            <span>/night</span>
          </p>

          {numNights > 0 && (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>

              <p>
                <span className="text-lg font-bold uppercase">Total </span>
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          )}
        </div>

        {(range?.from || range?.to) && (
          <button
            type="button"
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => setRange({})}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default DateSelector;
