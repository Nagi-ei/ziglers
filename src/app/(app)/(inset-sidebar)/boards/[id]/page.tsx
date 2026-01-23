export default function BoardPage({ params }: { params: { id: string } }) {
  return (
    <main className="container py-8">
      <h1 className="font-bold text-2xl">Board: {params.id}</h1>
      <p className="mt-2 text-muted-foreground">Coming soon...</p>
    </main>
  );
}
