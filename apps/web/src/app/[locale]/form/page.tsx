export default function FormPage() {
  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center bg-background p-4 md:p-8">
      <div className="container max-w-4xl space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="animate-fade-in text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
            Coming Soon
          </h1>
          <p className="text-xl text-muted-foreground">
            We're working hard to bring you something amazing.
          </p>
        </div>
      </div>
    </div>
  )
}
