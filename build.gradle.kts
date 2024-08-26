buildscript {
  repositories {
    mavenCentral()
  }
  dependencies {
    classpath(libs.kotlin.gradle.plugin)
    classpath(libs.jgit)
  }
}

subprojects {
  repositories {
    mavenCentral()
  }
}
