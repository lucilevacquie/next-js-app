export const StarRating = ({
  rating,
  reviewsCount,
}: {
  rating: number;
  reviewsCount: number;
}) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, index) => {
      const filled = index < rating;

      return (
        <svg
          key={index}
          viewBox="0 0 20 20"
          className={`h-5 w-5 ${filled ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.377 2.454a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118l-3.377-2.454a1 1 0 00-1.175 0l-3.377 2.454c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.05 9.393c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.966z" />
        </svg>
      );
    })}
    <span>{reviewsCount}</span>
  </div>
);
