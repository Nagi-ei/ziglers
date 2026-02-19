import Image from "next/image";
import Link from "next/link";

const FOOTER_LINKS = {
  Product: [
    { name: "Features", href: "#" },
    { name: "Templates", href: "#templates" },
    { name: "Method", href: "#method" },
  ],
  Company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
  ],
  Legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
} as const;

export function Footer() {
  return (
    <footer className="border-primary/20 border-t-2 bg-background pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="group mb-6 flex items-center gap-3">
              <div className="relative -rotate-2 transition-transform duration-300 group-hover:rotate-0">
                <div className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-primary opacity-20" />
                <Image
                  src="/logo.png"
                  alt="Zieglers"
                  draggable={false}
                  width={32}
                  height={32}
                  className="relative size-8"
                />
              </div>
              <span className="font-bold text-lg text-primary tracking-tight">Zieglers</span>
            </Link>
            <p className="mt-4 max-w-xs text-muted-foreground text-sm">
              Turn your vague ambitions into actionable steps. The 9x9 grid for life planning.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">
                {category}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground text-sm transition-colors hover:text-primary hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-primary/10 border-t pt-8">
          <p className="text-center text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} Zieglers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
