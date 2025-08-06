import type { SVGProps } from "react";

interface SingleStarIconProps extends SVGProps<SVGSVGElement> {
  filled?: boolean;
}

const SingleStarIcon = ({ filled = false, ...props }: SingleStarIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={filled ? "currentColor" : "none"}
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={filled ? 0 : 1}
      fillRule="evenodd"
      d="m16.488 8.04-3.171 2.77.95 4.12c.103.44-.068.9-.434 1.17-.365.26-.855.28-1.242.05l-3.594-2.18-3.586 2.18c-.387.23-.876.21-1.242-.05a1.13 1.13 0 0 1-.434-1.17l.949-4.12-3.172-2.77a1.13 1.13 0 0 1-.336-1.2c.14-.43.525-.73.976-.77l4.181-.36 1.632-3.9c.174-.41.582-.68 1.035-.68s.861.27 1.035.68l1.637 3.9 4.179.36a1.123 1.123 0 0 1 .641 1.97z"
      clipRule="evenodd"
    />
  </svg>
);

export default SingleStarIcon;
