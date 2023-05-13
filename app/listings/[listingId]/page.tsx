import getCurrentUser from "@/app/api/actions/getCurrentUser";
import getListingById from "@/app/api/actions/getListingById";
import getReservations from "@/app/api/actions/getReservations";
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/navbar/ClientOnly";
import ListingClient from "./ListingClient";

interface IParams {
  listingId?: string;
}
const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservation = await getReservations(params);
  const currentUser = await getCurrentUser();
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState></EmptyState>
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservation}
        currentUser={currentUser}
      ></ListingClient>
    </ClientOnly>
  );
};

export default ListingPage;
