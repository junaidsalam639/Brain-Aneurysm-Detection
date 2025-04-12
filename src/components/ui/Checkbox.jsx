import React from "react"
import { Check } from "lucide-react"
import { cn } from "../../libs/utils"


export const Checkbox = React.forwardRef(({ className, ...props }, ref) => {
  const [checked, setChecked] = React.useState(false)

  const handleChange = (e) => {
    setChecked(e.target.checked)
    if (props.onChange) {
      props.onChange(e)
    }
  }

  return (
    <div className="relative flex items-center">
      <input type="checkbox" className="peer sr-only" ref={ref} checked={checked} onChange={handleChange} {...props} />
      <div
        className={cn(
          "h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 peer-checked:bg-red-600 peer-checked:border-red-600",
          className,
        )}
      >
        {checked && <Check className="h-3 w-3 text-white" />}
      </div>
    </div>
  )
})

Checkbox.displayName = "Checkbox"
