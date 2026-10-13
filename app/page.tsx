import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background px-6">
      <main className="flex max-w-xl flex-col items-start gap-6">
        <p className="text-sm font-medium text-muted-foreground">
          Milestone 0
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          AI Fluency Assessment
        </h1>
        <p className="text-muted-foreground leading-7">
          React-track product: a three-pane session where candidates solve
          problems with AI, hidden tests grade on the server, and every event
          is logged.
        </p>
        <div className="flex items-center gap-3">
          <Button>Styling check</Button>
          <a
            href="/api/health"
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            /api/health
          </a>
        </div>
      </main>
    </div>
  );
}
