export function showSnackbar(ele: Element | undefined | null = undefined, text: string, color: "" | "error" | "primary" = "") {
  const snackbar = document.createElement('div')
  snackbar.className = `snackbar active ${color}`
  snackbar.innerText = text;
  (ele ?? document.body)?.append(snackbar)
  setTimeout(() => {
    (ele ?? document.body)?.removeChild(snackbar)
  }, 5000)
}
