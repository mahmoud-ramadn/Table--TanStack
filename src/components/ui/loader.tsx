import { cn } from "@/lib/utils"

type Props = {
    className?: string
}

export default function Loader({ className }: Readonly<Props>) {
    return (
        <div
            className={cn("animate-spin rounded-full size-14 border-2 border-violet-400  border-t-primary", className)}
        ></div>
    )
}
