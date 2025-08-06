import type { SVGProps } from "react";
const Component = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      fillRule="evenodd"
      d="M16.88 3.125H3.12c-.69 0-1.24.56-1.24 1.25v11.25c0 .69.55 1.25 1.24 1.25h13.76c.69 0 1.24-.56 1.24-1.25V4.375c0-.69-.55-1.25-1.24-1.25m0 12.5H3.12V4.375h13.76zm-3.13-8.75a3.75 3.75 0 0 1-7.5 0 .626.626 0 0 1 1.25 0 2.5 2.5 0 0 0 5 0 .624.624 0 1 1 1.25 0"
      clipRule="evenodd"
    />
  </svg>
);
export default Component;
