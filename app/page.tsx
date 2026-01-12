"use client";

import Filters from "./components/filters";
import Pagination from "./components/pagination";
import ProductCard from "./components/productCard";
import { useProductContext } from "./context/productContext";

export default function Page() {
  const { products } = useProductContext();

  return (
    <>
      <header className="text-center">
        <h1 className="text-xl font-bold text-gray-900 sm:text-5xl">Toilets</h1>

        <p className="mx-auto mt-4 max-w-2xl">
          Shop our comprehensive range of toilets to complete your dream
          bathroom renovation. It’s all cisterns go with our brand new toilet
          models, available in designs to suit almost any bathroom space. You'll
          find all manner of high quality products from
          <a href="/toilets/traditional-toilets">traditional toilets</a>
          designed for comfort to&nbsp;
          <a href="/toilets/modern-toilets">modern toilets</a>
          with easy cleaning functionality and everything in-between. Free
          standard UK delivery on orders over £499 at Victorian Plumbing.
        </p>
      </header>
      <section className="relative flex gap-4 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <Filters />
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 sm:text-3xl">
            Shop all our products
          </h2>
          {products && products?.length > 0 ? (
            <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {products.map((product: TProduct) => (
                <li key={product.id}>
                  <ProductCard {...product} />
                </li>
              ))}
            </ul>
          ) : (
            <p>Oops, no product correspond to your search.</p>
          )}
        </div>
      </section>
      <Pagination />
    </>
  );
}
