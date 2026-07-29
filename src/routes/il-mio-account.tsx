import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageShell";

export const Route = createFileRoute("/il-mio-account")({
  head: () => ({
    meta: [
      { title: "Il mio account | Flair Avenue" },
      { name: "description", content: "Accedi al tuo account Flair Avenue o registrati." },
      { property: "og:title", content: "Il mio account | Flair Avenue" },
      { property: "og:description", content: "Accedi o registrati su Flair Avenue." },
      { property: "og:url", content: "/il-mio-account" },
    ],
    links: [{ rel: "canonical", href: "/il-mio-account" }],
  }),
  component: AccountPage,
});

function AccountPage() {
  return (
    <>
      <PageHeader title="Il mio account" />
      <div className="mx-auto max-w-md px-4 py-14 md:px-6">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="email" className="label-wide mb-2 block">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
              placeholder="nome@email.it"
            />
          </div>
          <div>
            <label htmlFor="password" className="label-wide mb-2 block">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="label-wide w-full bg-primary py-4 text-primary-foreground">
            Accedi
          </button>
          <p className="text-center text-xs text-muted-foreground">
            Non hai un account? La registrazione sarà disponibile a breve.
          </p>
        </form>
      </div>
    </>
  );
}
