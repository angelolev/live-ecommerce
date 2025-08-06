import type { SVGProps } from "react";
const Component = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      fillRule="evenodd"
      d="M14.146 14.667S12.025 11.3 13.723 8c1.898-3.689.346-6.667.346-6.667H2.337S3.886 4.311 1.99 8c-1.698 3.302.434 6.668.434 6.668z"
      clipRule="evenodd"
    />
  </svg>
);
export default Component;
