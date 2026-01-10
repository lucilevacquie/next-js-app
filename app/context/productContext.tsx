"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  TSelectedFacets,
  TProduct,
  TFacetPriceOptionValue,
  TData,
  TFilters,
} from "../types";
import { fetchData } from "../data/fetchData";

const NUMBER_PRODUCTS_PER_PAGE = 90;

type TProductsProps = {
  facets: TFilters | undefined;
  selectedFacets: TSelectedFacets;
  setSelectedFacets: React.Dispatch<React.SetStateAction<TSelectedFacets>>;
  filteredProducts: TProduct[] | undefined;
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
  const [data, setData] = useState<TData>();
  const [selectedFacets, setSelectedFacets] = useState<TSelectedFacets>({});
  const [filteredProducts, setFilteredProducts] = useState<
    TProduct[] | undefined
  >(undefined);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);

  const getData = async () => {
    setData(await fetchData({ pageNumber: currentPageNumber }));
  };

  useEffect(() => {
    getData();
  }, [currentPageNumber]);

  const products = data?.products;
  const facets = data?.facets;
  const totalPageNumber =
    data?.pagination.total &&
    Math.ceil(data?.pagination.total / NUMBER_PRODUCTS_PER_PAGE);

  useEffect(() => {
    const updatedProducts = products?.filter((product) =>
      Object.entries(selectedFacets).every(([facetId, selectedValues]) => {
        if (selectedValues.length === 0) return true;

        switch (facetId) {
          case "brands":
            return selectedValues.includes(product.brand.name);

          case "isOnPromotion":
            return selectedValues.includes(product.price.isOnPromotion);

          case "prices":
            return selectedValues.some(
              (priceRange) =>
                product.price.priceIncTax >=
                  (priceRange as TFacetPriceOptionValue).gte &&
                product.price.priceIncTax <
                  (priceRange as TFacetPriceOptionValue).lte
            );
          default:
            return true;
        }
      })
    );
    setFilteredProducts(updatedProducts);
  }, [products, selectedFacets]);

  return (
    <ProductContext.Provider
      value={{
        facets,
        selectedFacets,
        setSelectedFacets,
        filteredProducts,
        currentPageNumber,
        setCurrentPageNumber,
        totalPageNumber,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
