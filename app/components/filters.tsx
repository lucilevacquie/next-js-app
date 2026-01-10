"use client";

import { useState } from "react";
import {
  TFacet,
  TFacetOptionBoolean,
  TFacetOptionPrice,
  TFacetOptionString,
  TFilters,
} from "../types";
import { useProductContext } from "../context/productContext";

import StringFilter from "./stringFilter";
import PriceFilter from "./priceFilter";

const numberOfInitialOptions = 6;

type ExpandedFacets = Record<string, boolean>;

const Filters = ({ ...facets }: TFilters) => {
  const { selectedFacets, setSelectedFacets } = useProductContext();

  const isSameValue = (
    a: (TFacetOptionString | TFacetOptionBoolean | TFacetOptionPrice)["value"],
    b: (TFacetOptionString | TFacetOptionBoolean | TFacetOptionPrice)["value"]
  ) => {
    if (typeof a === "object" && typeof b === "object") {
      return JSON.stringify(a) === JSON.stringify(b);
    }
    return a === b;
  };

  const toggleFacetOption = (
    facet: TFacet,
    option: TFacetOptionString | TFacetOptionBoolean | TFacetOptionPrice
  ) => {
    setSelectedFacets((prev) => {
      const facetId = facet.identifier;
      const current = prev[facetId] ?? [];

      const exists = current.some((v) => isSameValue(v, option.value));

      return {
        ...prev,
        [facetId]: exists
          ? current.filter((v) => !isSameValue(v, option.value))
          : [...current, option.value],
      };
    });
  };

  const [expandedFacets, setExpandedFacets] = useState<ExpandedFacets>({});

  const toggleFacetExpansion = (facetId: string) => {
    setExpandedFacets((prev) => ({
      ...prev,
      [facetId]: !prev[facetId],
    }));
  };

  const getVisibleOptions = (facet: TFacet) => {
    const isExpanded = expandedFacets[facet.identifier];
    return isExpanded
      ? facet.options
      : facet.options.slice(0, numberOfInitialOptions);
  };

  return (
    <aside className="relative">
      <div className="sticky top-4 max-h-[calc(100vh-1rem)] overflow-y-auto flex h-full flex-col justify-between px-4 py-6 min-w-2xs">
        <header className="flex justify-between align-baseline">
          <h2 className="font-bold text-2xl">Filter by</h2>
          {Object.keys(selectedFacets).length > 0 ? (
            <button
              onClick={() => {
                setSelectedFacets({});
              }}
            >
              Clear filters
            </button>
          ) : null}
        </header>
        <ul className="space-y-1">
          {Object.values(facets).map((facet) => {
            const isExpanded = expandedFacets[facet.identifier];
            const visibleOptions = getVisibleOptions(facet);
            return (
              <li
                key={facet.identifier}
                className="mt-6 pt-6 border-e border-gray-100 bg-white"
              >
                <h3 className="font-bold mb-4 px-4">{facet.displayName}</h3>
                <fieldset>
                  {facet.facetType === 20 ? (
                    <PriceFilter
                      visibleOptions={visibleOptions as TFacetOptionPrice[]}
                      selectedValues={selectedFacets[facet.identifier] ?? []}
                      onToggle={(option) => toggleFacetOption(facet, option)}
                      isSameValue={isSameValue}
                      className="px-4"
                    />
                  ) : facet.facetType === 10 ? (
                    <StringFilter
                      visibleOptions={visibleOptions as TFacetOptionString[]}
                      selectedValues={selectedFacets[facet.identifier] ?? []}
                      onToggle={(option) => toggleFacetOption(facet, option)}
                      isSameValue={isSameValue}
                      className="px-4"
                    />
                  ) : null}
                  {facet.options.length > numberOfInitialOptions && (
                    <button
                      type="button"
                      onClick={() => toggleFacetExpansion(facet.identifier)}
                      className="w-full font-semibold text-center py-2 bg-[#DEDEDE] hover:underline"
                    >
                      {isExpanded ? "Show less" : "Show all options"}
                    </button>
                  )}
                </fieldset>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Filters;
