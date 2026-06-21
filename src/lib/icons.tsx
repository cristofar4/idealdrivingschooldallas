import {
  BadgeCheck,
  BookOpen,
  CalendarCheck,
  Car,
  ClipboardCheck,
  GraduationCap,
  IdCard,
  MapPin,
  Route,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Trophy,
  UserCheck,
  Users,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

/** Custom steering-wheel glyph (lucide has no steering wheel). */
function SteeringWheel(props: LucideProps) {
  const { size = 24, strokeWidth = 2, className, ...rest } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.4" />
      <path d="M12 14.4V21" />
      <path d="M10.1 13.1 4.2 16.4" />
      <path d="M13.9 13.1l5.9 3.3" />
      <path d="M3.2 10.2a9 9 0 0 1 17.6 0" />
    </svg>
  );
}

/** Brand glyphs, lucide removed these for trademark reasons. */
function FacebookIcon(props: LucideProps) {
  const { size = 24, className, ...rest } = props;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...rest}>
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
    </svg>
  );
}

function InstagramIcon(props: LucideProps) {
  const { size = 24, strokeWidth = 2, className, ...rest } = props;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...rest}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const registry = {
  "badge-check": BadgeCheck,
  "book-open": BookOpen,
  "calendar-check": CalendarCheck,
  car: Car,
  "clipboard-check": ClipboardCheck,
  facebook: FacebookIcon,
  "graduation-cap": GraduationCap,
  "id-card": IdCard,
  instagram: InstagramIcon,
  "map-pin": MapPin,
  route: Route,
  "shield-check": ShieldCheck,
  sliders: SlidersHorizontal,
  star: Star,
  "steering-wheel": SteeringWheel,
  trophy: Trophy,
  "user-check": UserCheck,
  users: Users,
} satisfies Record<string, ComponentType<LucideProps>>;

export type IconName = keyof typeof registry;

export function Icon({
  name,
  ...props
}: { name: IconName } & LucideProps) {
  const Cmp = registry[name] ?? Star;
  return <Cmp {...props} />;
}
