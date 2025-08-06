import type { SVGProps } from "react";
const Component = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      fillRule="evenodd"
      d="m21.531 20.47-4.694-4.694a8.261 8.261 0 1 0-1.061 1.06l4.693 4.695a.751.751 0 0 0 1.062-1.062M3.75 10.5a6.75 6.75 0 1 1 6.75 6.75 6.76 6.76 0 0 1-6.75-6.75"
      clipRule="evenodd"
    />
  </svg>
);
export default Component;
