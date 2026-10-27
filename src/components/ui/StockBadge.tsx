// Shows whether a product can be bought.

export default function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) {
    return <span className="whitespace-nowrap rounded-full bg-danger-tint px-2.5 py-1 text-xs font-semibold text-danger">Out of stock</span>;
  }
  if (stock <= 5) {
    return <span className="whitespace-nowrap rounded-full bg-marigold-tint px-2.5 py-1 text-xs font-semibold text-[#7a5300]">Only {stock} left</span>;
  }
  return <span className="whitespace-nowrap rounded-full bg-success-tint px-2.5 py-1 text-xs font-semibold text-success">In stock</span>;
}
