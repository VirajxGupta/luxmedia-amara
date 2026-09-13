import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-sandDark text-limestone-100 flex flex-col items-center justify-center p-6 text-center">
      <span className="text-xs font-mono tracking-[0.35em] text-terracotta uppercase mb-3">
        404 • HORIZON UNCHARTED
      </span>
      <h1 className="font-serif text-5xl sm:text-7xl font-extralight text-limestone-100 mb-6">
        Lost in the Cliffside Mist
      </h1>
      <p className="font-serif italic text-lg text-limestone-200/80 max-w-md mb-8">
        "The path you seek has dissolved into the Tyrrhenian Sea."
      </p>
      <Link
        href="/"
        className="px-8 py-3 rounded-full bg-terracotta text-limestone-50 text-xs tracking-[0.2em] uppercase font-medium hover:bg-terracotta-light transition-colors"
      >
        Return to Sanctuary
      </Link>
    </div>
  );
}
