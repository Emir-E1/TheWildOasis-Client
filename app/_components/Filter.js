"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);

    params.set("capacity", filter);

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  function Button({ children, filter }) {
    return (
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === filter ? "bg-primary/30" : ""
        }`}
        onClick={() => handleFilter(filter)}
      >
        {children}
      </button>
    );
  }

  return (
    <div className="flex border border-primary-800">
      <Button filter="all">All cabins</Button>
      <Button filter="small">1&mdash;3 guests</Button>
      <Button filter="medium">4&mdash;7 guests</Button>
      <Button filter="large">8&mdash;12 guests</Button>
    </div>
  );
}

export default Filter;
