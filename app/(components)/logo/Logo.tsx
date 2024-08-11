import Image from "next/image"
import { LogoProps } from "@/types/types"
import { logo } from "@/public/assets"


const Logo: React.FC<LogoProps> = ({ width, className }) => {
    return (
        <>
            <Image width={width} height={width} className={className} src={logo} alt="Calendly" loading="lazy" />
        </>
    )
}

export default Logo