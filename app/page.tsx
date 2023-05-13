import getCurrentUser from "./api/actions/getCurrentUser";
import getListings, { IlistingParams } from "./api/actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import ClientOnly from "./components/navbar/ClientOnly";

interface homeProps {
  searchParams: IlistingParams;
}

const Home = async ({ searchParams }: homeProps) => {
  // const isEMpty = true;
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  // console.log("salam", curremntUser);
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <Container>
        <div
          className="
       grid
       grid-cols-1
       gap-8
       pt-24
       sm:grid-cols-2
       md:grid-cols-3
       lg:grid-cols-4
       xl:grid-cols-5
       2xl:grid-cols-6
       "
        >
          {listings.map((listing: any) => {
            return (
              <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
