import { cn } from "@/libs/utils"
import { cva, VariantProps } from "class-variance-authority"
import Spinner from "./spinner"

export const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-zinc-300",
    {
      variants: {
        variant: {
          default:
            "bg-primary text-white",
          outline:
            "border border-primary text-primary",
          ghost: "hover:bg-accent hover:text-accent-foreground",
        },
        size: {
          default: "h-10 px-4 py-2",
          sm: "h-8 rounded-md px-3 text-xs",
          lg: "h-10 rounded-md px-8",
          icon: "h-9 w-9",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
)

interface Props
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    isLoading?: boolean
}

export default function Button({ 
    variant, 
    size, 
    className, 
    isLoading = false, 
    disabled, 
    children, 
    ...props 
  }: Props) {
    return (
        <button 
            disabled={isLoading || disabled}
            className={cn(buttonVariants({ variant, size, className }))} 
            {...props}
        >
            {isLoading ? (
                <Spinner/>
            ) : (
                children
            )}
        </button>
    )
}