"use client";

import { useState } from "react";
import { useProductContext } from "../context/productContext";

import StringFilter from "./stringFilter";
import PriceFilter from "./priceFilter";

const NUMBER_OF_INITIAL_OPTIONS = 6;

type ExpandedFacets = Record<string, boolean>;

const Filters = () => {
  const { facets, selectedFacets, setSelectedFacets } = useProductContext();

  const toggleFacetOption = (facet: TFacet, option: TFacetOption) => {
    setSelectedFacets((prev) => {
      const facetId = facet.identifier;
      const current = prev[facetId] ?? [];

      const exists = current.some((v) => v.identifier === option.identifier);

      const optionObject = {
        identifier: option.identifier,
        value: option.value,
      };

      let nextSelectedFacet = {
        ...prev,
        [facetId]: exists
          ? current.filter((v) => v.identifier !== option.identifier)
          : [...current, optionObject],
      };

      if (nextSelectedFacet[facetId].length === 0) {
        delete nextSelectedFacet[facetId];
      }

      return nextSelectedFacet;
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
      : facet.options.slice(0, NUMBER_OF_INITIAL_OPTIONS);
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
                      visibleOptions={visibleOptions}
                      selectedValues={selectedFacets[facet.identifier] ?? []}
                      onToggle={(option) => toggleFacetOption(facet, option)}
                      className="px-4"
                    />
                  ) : facet.facetType === 10 ? (
                    <StringFilter
                      visibleOptions={visibleOptions}
                      selectedValues={selectedFacets[facet.identifier] ?? []}
                      onToggle={(option) => toggleFacetOption(facet, option)}
                      className="px-4"
                    />
                  ) : null}
                  {facet.options.length > NUMBER_OF_INITIAL_OPTIONS && (
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
