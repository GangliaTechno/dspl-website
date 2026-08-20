const PhoneObfuscated = ({
  number,
  digits,
  display,
  label,
  className,
  icon,
}) => {
  const visibleNumber = display || number || digits;
  const rawNumber = digits || number || display;
  const telNumber = rawNumber.replace(/(?!^)\D/g, '').replace(/^\+?/, '+');

  return (
    <a
      href={`tel:${telNumber}`}
      aria-label={label || `Call ${visibleNumber}`}
      className={className}
      data-umami-event="contact_method_select"
      data-umami-event-method="call"
    >
      {icon}
      <span>{visibleNumber}</span>
    </a>
  );
};

export default PhoneObfuscated;
