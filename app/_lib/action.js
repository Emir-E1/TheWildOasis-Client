"use server"; //the famous bridge its SA not SC

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { createBooking, deleteBooking, updateBooking } from "./data-service";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuestAction(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };
  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

export async function createBookingAction(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  await createBooking({
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: (formData.get("observations") || "").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  });

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function deleteBookingAction(bookingID) {
  const session = await auth();
  if (!session) throw new Error("must be log in ");
  await deleteBooking(bookingID);
  revalidatePath("account/reservation");
}

export async function updateBookingAction(reservationId, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const numGuests = Number(formData.get("numGuests"));
  const obeservations = formData.get("observations");
  const updatedFields = {
    numGuests: numGuests,
    observations: obeservations,
  };
  //i can later on add some try&catch condition
  await updateBooking(reservationId, updatedFields);
  revalidatePath("account/reservation");
}
