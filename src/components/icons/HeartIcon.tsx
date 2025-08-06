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
      d="M13.91 2.5c-1.62 0-3.03.694-3.91 1.866C9.12 3.194 7.71 2.5 6.09 2.5a4.847 4.847 0 0 0-4.84 4.844c0 5.469 8.11 9.895 8.45 10.078.19.1.41.1.6 0 .34-.183 8.45-4.61 8.45-10.078 0-2.674-2.17-4.841-4.84-4.844M10 16.156c-1.43-.831-7.5-4.618-7.5-8.812A3.596 3.596 0 0 1 6.09 3.75c1.52 0 2.8.81 3.33 2.11.1.234.33.387.58.387s.48-.153.58-.388c.53-1.302 1.81-2.109 3.33-2.109a3.596 3.596 0 0 1 3.59 3.594c0 4.188-6.07 7.98-7.5 8.812"
      clipRule="evenodd"
    />
  </svg>
);
export default Component;
