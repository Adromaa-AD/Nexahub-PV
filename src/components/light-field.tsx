const STARS = Array.from({ length: 18 }, (_, index) => index);
const PARTICLES = Array.from({ length: 10 }, (_, index) => index);

/** A fixed, CSS-only sky shared by every page. */
export function LightField() {
  return (
    <div aria-hidden="true" className="sky-field pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="sky-day absolute inset-0">
        <div className="sun-haze absolute inset-0" />
        <div className="sun-rays absolute inset-0" />
        <div className="cloud-layer cloud-layer-far absolute inset-0">
          <span />
          <span />
          <span />
        </div>
        <div className="cloud-layer cloud-layer-near absolute inset-0">
          <span />
          <span />
        </div>
      </div>

      <div className="sky-night absolute inset-0">
        <div className="moonlight absolute inset-0" />
        <div className="moon-disc absolute" />
        <div className="star-field absolute inset-0">
          {STARS.map((star) => (
            <span key={star} />
          ))}
        </div>
        <div className="night-clouds absolute inset-0">
          <span />
          <span />
        </div>
        <i className="shooting-star shooting-star-one absolute" />
        <i className="shooting-star shooting-star-two absolute" />
      </div>

      <div className="sky-particles absolute inset-0">
        {PARTICLES.map((particle) => (
          <span key={particle} />
        ))}
      </div>
      <div className="sky-veil absolute inset-0" />
    </div>
  );
}