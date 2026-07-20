import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  console.log(request, params);
  const { cabinId } = params;
  try {
    const [cabin, bookedDates] = await Promise.allSettled([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({
      status: 200,
      cabin: cabin,
      BookedDates: bookedDates,
    });
  } catch (error) {
    return Response.json({
      status: 404,
      message: "Not Found",
    });
  }
}
//export async function POST() {}
