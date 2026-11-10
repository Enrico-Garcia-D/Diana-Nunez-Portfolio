import { profile } from "../data";

export default function Marquee() {
  const items = [...profile.services, ...profile.services];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.concat(items).map((s, i) => (
          <span key={i}>
            {s} <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
