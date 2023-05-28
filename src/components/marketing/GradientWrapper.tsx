import React, { type ReactNode, type HTMLProps } from 'react';

type Props = {
  children: ReactNode;
  wrapperClassName?: string;
} & HTMLProps<HTMLDivElement>;

const GradientWrapper: React.FC<Props> = ({ children, ...props }) => (
  <div {...props} className={`${props.className || ""}`}>
    <div
      className={`absolute top-0 m-auto blur-[160px] -z-10 ${props.wrapperClassName || ""}`}
      style={{
        background:
          "linear-gradient(180deg, #3a67ed 0%, rgba(103, 137, 240, 0.9) 0.01%, rgba(226, 237, 78, 0.2) 100%)",
      }}
    ></div>
    <div className="relative">
      {children}
    </div>
  </div>
);

export default GradientWrapper;
