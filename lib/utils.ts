// lib/utils.ts

/**
 * Smoothly scrolls to a specific section by ID
 * @param sectionId - ID of the section to scroll to
 */
export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}

/**
 * Merges multiple Tailwind classes into a single string
 * Skips falsy values
 * @param classes - array of class strings
 * @returns merged class string
 */
export const cn = (...classes: (string | undefined | null | boolean)[]) => {
  return classes.filter(Boolean).join(" ")
}

/**
 * Formats a date into a readable string (e.g., Jan 2024)
 * @param date - Date object
 * @returns formatted date string
 */
export const formatDate = (date: Date) => {
  return date.toLocaleString("en-US", { month: "short", year: "numeric" })
}

/**
 * Generates a random ID (for keys or temporary placeholders)
 * @param length - length of the ID string
 */
export const generateId = (length = 8) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}