import { unstable_noStore as noStore } from "next/cache";
import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

async function CabinList({ capacity }) {
  //noStore();
  let cabinsFiltred;
  const cabins = await getCabins();
  if (!cabins.length) return null;

  if (capacity === "small") {
    cabinsFiltred = cabins.filter((el) => el.maxCapacity <= 3);
  }
  if (capacity === "all") {
    cabinsFiltred = cabins;
  }

  if (capacity === "medium") {
    cabinsFiltred = cabins.filter(
      (el) => el.maxCapacity >= 4 && el.maxCapacity <= 7
    );
  }
  if (capacity === "large") {
    cabinsFiltred = cabins.filter(
      (el) => el.maxCapacity < 8 && el.maxCapacity <= 12
    );
  }

  return (
    <>
      {cabins.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {cabinsFiltred.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )}
    </>
  );
}

export default CabinList;
