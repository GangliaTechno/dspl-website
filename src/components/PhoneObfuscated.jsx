/**
 * PhoneObfuscated
 * ---------------
 * Renders a phone number in a way that defeats simple HTML scrapers:
 *   1. The raw HTML contains the reversed digit string (gibberish to a scraper).
 *   2. CSS `direction: rtl; unicode-bidi: bidi-override` flips it back visually.
 *   3. The `tel:` URI is assembled at click-time via JS — it never appears in
 *      the static HTML/href attribute.
 *   4. An `aria-label` on the wrapper ensures screen readers announce the real number.
 *
 * Limitations (honest trade-offs):
 *   • Headless-browser scrapers that render CSS will still see the number.
 *   • Copy-pasting the visible text produces the reversed string.
 */

const PhoneObfuscated = ({ digits, display, className, icon }) => {
  // `digits` — raw E.164-style string used to build the tel: URI at click time
  // `display` — the human-readable label (e.g. "+91 88619 42440")
  // Reverse the display string so the raw HTML looks like noise to a scraper.
  const reversed = display.split('').reverse().join('');

  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = `tel:${digits}`;
  };

  return (
    <a
      href="#phone"
      onClick={handleClick}
      aria-label={`Call ${display}`}
      className={className}
    >
      {icon && icon}
      {/* aria-hidden so screen readers use the aria-label above, not the reversed chars */}
      <span
        aria-hidden="true"
        style={{
          unicodeBidi: 'bidi-override',
          direction: 'rtl',
          display: 'inline-block',
        }}
      >
        {reversed}
      </span>
    </a>
  );
};

export default PhoneObfuscated;
