val npmInstall by tasks.registering(Exec::class) {
  group = "build"
  workingDir(projectDir)
  commandLine("npm", "ci")
}

tasks.register<Exec>("build") {
  dependsOn(npmInstall, projects.common.dependencyProject.tasks.named("jsBrowserProductionLibraryDistribution"))
  group = "build"
  workingDir(projectDir)
  commandLine("npm", "run", "build")
}
