"use client";
import usRegisterModal from "@/app/hooks/useRegisterModal";
import usLoginModal from "@/app/hooks/useLoginModal";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItems from "./MenuItems";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/api/types";
import usRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";
interface UserMenuProps {
  currentUser?: SafeUser | null;
}
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = usRegisterModal();
  const loginModal = usLoginModal();
  const rentModal = usRentModal();
  const router = useRouter();
  //console.log("inja", currentUser);
  const [isOpen, setIsOpen] = useState();
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const rental = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal]);
  return (
    <div className="relative">
      <div className="flex-rox flex items-center gap-3">
        <div
          onClick={rental}
          className="
          hidden
          cursor-pointer
          rounded-full
          px-4
          py-3
          text-sm
          font-semibold
          transition
          hover:bg-neutral-100
          hover:shadow-md
          md:block"
        >
          click me
        </div>
        <div
          onClick={toggleOpen}
          className="
               flex
               cursor-pointer
               flex-row
               items-center
               gap-3
               rounded-full
               border-[1px]
               border-neutral-200
               p-4
               transition
               hover:shadow-md
               md:px-2
               md:py-1

               "
        >
          <AiOutlineMenu></AiOutlineMenu>
          <div className="hidden md:block">
            <Avatar src={currentUser?.image}></Avatar>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="
             absolute
             right-0
             top-12
             w-[40vw]
             overflow-hidden
             rounded-xl
             bg-white
             text-sm
             shadow-md
             md:w-3/4
            "
        >
          <div className="flex cursor-pointer flex-col">
            {currentUser ? (
              <>
                <MenuItems
                  onClick={() => {
                    router.push("/trips");
                  }}
                  label="My trips"
                />
                <MenuItems
                  onClick={() => {
                    router.push("/reservations");
                  }}
                  label="My Reservations"
                />
                <MenuItems
                  onClick={() => {
                    router.push("/favorites");
                  }}
                  label="My Favorites"
                />

                <MenuItems onClick={() => {}} label="My Favorits" />
                <MenuItems
                  onClick={() => {
                    signOut();
                  }}
                  label="Logout"
                />

                <hr />
              </>
            ) : (
              <>
                <MenuItems
                  onClick={() => {
                    loginModal.onOpen();
                  }}
                  label="Login"
                />
                <MenuItems
                  onClick={() => registerModal.onOpen()}
                  label="Sign Up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
