import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";
import CabinList from "../_components/CabinList";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

export const metadata = {
  title: "Cabins",
};

export const revalidate = 3600;
export default function Page({ searchParams }) {
  const capacity = searchParams?.capacity ?? "all";

  console.log(searchParams);

  return (
    // CHANGE
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy natures beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>
      <div className="flex mb-8 justify-end">
        {" "}
        <Filter />
      </div>

      <Suspense fallback={<Spinner />} key={capacity}>
        <CabinList capacity={capacity} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
