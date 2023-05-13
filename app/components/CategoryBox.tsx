"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";
interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}
const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    // console.log("currentQuery >", currentQuery);

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };
    //console.log("updatedQuery >", updatedQuery);

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    //  console.log("url >", url);

    router.push(url);
  }, [label, router, params]);

  return (
    <div
      onClick={handleClick}
      className={`
    flex
    cursor-pointer 
    flex-col 
    items-center 
    justify-center
    gap-2
    border-b-2
    p-3
    transition
    hover:text-rose-800
    ${selected ? "border-b-rose-800" : "border-transparent"}
    ${selected ? "text-rose-800" : "text-neutral-500"}
    ${selected ? "text-neutral-800" : "text-neutral-500"}
  `}
    >
      <Icon size={26} />
      <div
        className={`text-sm font-medium
      `}
      >
        {label}
      </div>
    </div>
  );
};

export default CategoryBox;
