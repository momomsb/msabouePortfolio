import { ArrowUp } from "lucide-react";
import { SocialIcon } from "@/components/ui/brand-icons";
import { profile } from "@/data/profile";
import { getAvailableSocials, socialLinkProps } from "@/lib/content";

export function Footer() {
  const socials = getAvailableSocials();

  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="font-display text-2xl font-medium tracking-tight text-fg sm:text-3xl">{profile.name.toUpperCase()}</p>
            <p className="mt-2 label-mono text-accent">{profile.role}</p>
          </div>

          {socials.length > 0 && (
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.href}
                    {...socialLinkProps(social.platform)}
                    className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                  >
                    <SocialIcon platform={social.platform} className="size-4 text-subtle transition-colors group-hover:text-accent" />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col-reverse justify-between gap-4 border-t border-line pt-6 text-xs text-subtle sm:flex-row sm:items-center">
          <p>© 2026 {profile.name}</p>
          <p className="font-mono">Designed &amp; engineered with Next.js</p>
          <a href="#top" className="inline-flex items-center gap-1.5 self-start transition-colors hover:text-fg sm:self-auto">
            Back to top <ArrowUp className="size-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
