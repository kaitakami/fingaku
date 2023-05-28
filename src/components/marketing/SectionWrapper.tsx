import React, { type ReactNode, type HTMLProps } from 'react';

type Props = {
    children: ReactNode;
} & HTMLProps<HTMLDivElement>;

const SectionWrapper: React.FC<Props> = ({ children, ...props }) => (
    <section {...props} className={`py-16 lg:py-24 ${props.className || ""}`}>
        {children}
    </section>
)

export default SectionWrapper
