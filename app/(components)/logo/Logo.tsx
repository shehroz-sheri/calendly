import Image from "next/image"
import LogoSvg from '../../../public/assets/images/logo.svg'
import { LogoProps } from "@/types/types"


const Logo: React.FC<LogoProps> = ({ width, className }) => {
    return (
        <>
            <Image width={width} className={className} src={LogoSvg} alt="Calendly" loading="lazy" />
        </>
    )
}

export default Logo