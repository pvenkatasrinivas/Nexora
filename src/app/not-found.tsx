import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-start py-20">
      <p className="font-display text-6xl font-bold text-brand">404</p>
      <h1 className="mt-4 text-3xl font-bold">This page doesn’t exist</h1>
      <p className="mt-2 max-w-md text-ink-soft">The link may be old or mistyped. You can keep shopping from the products page.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink href="/products">Browse products</ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Go to home page
        </ButtonLink>
      </div>
    </div>
  );
}
