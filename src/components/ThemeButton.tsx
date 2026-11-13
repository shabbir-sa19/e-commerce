"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

function ThemeButton() {
  const { theme, setTheme } = useTheme()
  const toggle = () => {
    const mode = theme === "light" ? "dark" : "light"
    setTheme(mode)
  }
  return (
    <Button variant="outline" size="icon" onClick={toggle} className={"transition-all ease-in-out"}>
      <Sun className="h-[1.75rem] w-[1.75rem] scale-100 rotate-0 dark:scale-0 dark:-rotate-90 duration-700 ease-in-out fade-in transition-all" />
      <Moon className="absolute h-[1.75rem] w-[1.75rem] scale-0 rotate-90 dark:scale-100 dark:rotate-0 duration-700 fade-in transition-all" />
      <span className="sr-only">Toggle theme</span>
    </Button>

  )
}

export default ThemeButton
