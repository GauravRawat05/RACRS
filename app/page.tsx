export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-serif">Welcome</h1>
      <div className="flex gap-2">
        <span className="badge-mint">Mint Badge</span>
        <span className="badge-rose">Rose Badge</span>
        <span className="badge-lavender">Lavender Badge</span>
      </div>
    </main>
  );
}
