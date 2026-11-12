val npmInstall = tasks.register<Exec>("npmInstall") {
  group = "build"
  workingDir(projectDir)
  commandLine("npm", "ci")
}

tasks.register<Exec>("build") {
  dependsOn(npmInstall, "${projects.common.path}:jsBrowserProductionLibraryDistribution")
  group = "build"
  workingDir(projectDir)
  commandLine("npm", "run", "build")
}
