import Image from "next/image"

const Brand = ({ ...props }) => (
    <Image
        src="/fingaku-logo.svg"
        alt="Fingaku logo"
        {...props}
        width={25}
        height={25}
        priority
    />
)
export default Brand
