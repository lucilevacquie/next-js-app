"use client";

import React, { useContext, useEffect, useState } from "react";
import { fetchData } from "../data/fetchData";

const NUMBER_PRODUCTS_PER_PAGE = 90;

type TProductsProps = {
  facets: TFilters;
  selectedFacets: TSelectedFacets;
  setSelectedFacets: React.Dispatch<React.SetStateAction<TSelectedFacets>>;
  products: TProduct[] | undefined;
  currentPageNumber: number;
  setCurrentPageNumber: React.Dispatch<React.SetStateAction<number>>;
  totalPageNumber: number | undefined;
};

const ProductContext = React.createContext<TProductsProps | undefined>(
  undefined
);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error(
      "useProductsContext must be used within the ProductsProvider"
    );
  return context;
};

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<TData>({
    facets: {},
    pagination: {} as TPagination,
    products: [],
  });
  const [selectedFacets, setSelectedFacets] = useState<TSelectedFacets>({});
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);

  const getData = async () => {
    setData(await fetchData({ pageNumber: currentPageNumber, selectedFacets }));
  };

  useEffect(() => {
    getData();
  }, [currentPageNumber, selectedFacets]);

  const products = data.products;
  const facets = data.facets;
  const totalPageNumber =
    data?.pagination.total &&
    Math.ceil(data?.pagination.total / NUMBER_PRODUCTS_PER_PAGE);

  return (
    <ProductContext.Provider
      value={{
        facets,
        selectedFacets,
        setSelectedFacets,
        products,
        currentPageNumber,
        setCurrentPageNumber,
        totalPageNumber,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
