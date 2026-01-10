export type TQuery = {
  pageNumber: number;
};

export type TData = {
  products: TProduct[];
  facets: TFilters;
  pagination: TPagination;
};

export type TPagination = {
  total: number;
};

export type TProduct = {
  id: string;
  productName: string;
  price: TPrice;
  slug: string;
  brand: TBrand;
  image: TImage;
  averageRating: number;
  reviewsCount: number;
};

export type TPrice = {
  currencyCode: string;
  isOnPromotion: boolean;
  priceExcTax: number;
  priceIncTax: number;
  wasPriceExcTax: number;
  wasPriceIncTax: number;
};

export type TBrand = {
  name: string;
  slug: string;
  brandImage: TImage;
};

export type TImage = {
  url: string;
  attributes: {
    imageAltText: string;
  };
};

export type TFilters = Record<string, TFacet>;

export type TFacet = {
  displayName: string;
  identifier: string;
  priority: number;
  options: (TFacetOptionString | TFacetOptionBoolean | TFacetOptionPrice)[];
  facetType: number;
};

export type TFacetOption = {
  displayValue: string;
  identifier: string;
  productCount: number;
};

export type TFacetOptionString = TFacetOption & {
  value: string;
};

export type TFacetOptionBoolean = TFacetOption & {
  value: boolean;
};

export type TFacetOptionPrice = TFacetOption & {
  displayValue: string;
  productCount: number;
  value: TFacetPriceOptionValue;
};

export type TFacetPriceOptionValue = {
  gte: number;
  lte: number;
};

export type TSelectedFacets = {
  [facetIdentifier: string]: (
    | TFacetOptionString
    | TFacetOptionBoolean
    | TFacetOptionPrice
  )["value"][];
};
