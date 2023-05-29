import Image from "next/image"

const Brand = ({ imageWidth, imageHeight, textClassName }: { imageWidth: number, imageHeight: number, textClassName?: string }) => (
    <div className="w-full justify-center items-center flex gap-4">
        <Image
            src="/fingaku-logo.svg"
            alt="Fingaku logo"
            width={imageWidth}
            height={imageHeight}
            priority
        />
        <span className={textClassName}>
            Fingaku
        </span>
    </div>
)
export default Brand
