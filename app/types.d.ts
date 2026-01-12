type TQuery = {
  pageNumber: number;
  selectedFacets: TSelectedFacets;
};

type TData = {
  products: TProduct[];
  facets: TFilters;
  pagination: TPagination;
};

type TPagination = {
  total: number;
};

type TProduct = {
  id: string;
  productName: string;
  price: TPrice;
  slug: string;
  brand: TBrand;
  image: TImage;
  averageRating: number;
  reviewsCount: number;
};

type TPrice = {
  currencyCode: string;
  isOnPromotion: boolean;
  priceExcTax: number;
  priceIncTax: number;
  wasPriceExcTax: number;
  wasPriceIncTax: number;
};

type TBrand = {
  name: string;
  slug: string;
  brandImage: TImage;
};

type TImage = {
  url: string;
  attributes: {
    imageAltText: string;
  };
};

type TFilters = Record<string, TFacet>;

type TFacet = {
  displayName: string;
  identifier: string;
  priority: number;
  options: (TFacetOptionString | TFacetOptionBoolean | TFacetOptionPrice)[];
  facetType: number;
};

type TFacetOption = {
  displayValue: string;
  identifier: string;
  productCount: number;
  value: string | boolean | TFacetPriceOptionValue;
};

type TFacetPriceOptionValue = {
  gte: number;
  lte: number;
};

type TSelectedFacets = {
  [facetIdentifier: string]: (
    | TFacetOptionString
    | TFacetOptionBoolean
    | TFacetOptionPrice
  )["value"][];
};
