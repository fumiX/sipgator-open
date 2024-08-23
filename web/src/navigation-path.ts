const navigationPaths = ["numbers", "history", "contacts"] as const

export type NavigationPath = typeof navigationPaths[number];

export function isNavigationPath(s: string): s is NavigationPath {
  return navigationPaths.some(it => it === s)
}

export function getCurrentNavigationPath(window: Window): NavigationPath {
  return navigationPaths.find(it => "#" + it === window.location.hash) ?? "numbers"
}
