import { HeartIcon } from "@heroicons/react/24/outline";
import { StarRating } from "./starRating";

const ProductCard = (product: TProduct) => (
  <a
    href={product.slug}
    className="group relative block overflow-hidden h-full"
  >
    <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
      <span className="sr-only">Wishlist</span>
      <HeartIcon className="size-6 text-[#408548]" />
    </button>

    <img
      src={product.image.url}
      alt={product.image.attributes.imageAltText}
      className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
    />

    <div className="relative border border-gray-100 bg-white p-6 h-full">
      <img
        src={product.brand.brandImage.url}
        alt={product.brand.brandImage.attributes.imageAltText}
        className="max-h-5"
      />

      <h3 className="mt-1.5 text-lg font-medium text-gray-900">
        {product.productName}
      </h3>

      <p className="text-[#CF0010] font-bold">
        £{product.price.priceIncTax}{" "}
        {product.price.isOnPromotion && (
          <span className="text-gray-400">
            was{" "}
            <span className="line-through">
              £{product.price.wasPriceIncTax}
            </span>
          </span>
        )}
      </p>

      <StarRating
        rating={product.averageRating}
        reviewsCount={product.reviewsCount}
      />
    </div>
  </a>
);

export default ProductCard;
