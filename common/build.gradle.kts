import org.jetbrains.kotlin.gradle.dsl.JsModuleKind
import org.jetbrains.kotlin.gradle.dsl.KotlinJsCompile

plugins {
  kotlin("multiplatform")
  kotlin("plugin.serialization").version(libs.versions.kotlin)
}

kotlin {
  jvm()
  js {
    browser()
    binaries.library()
    generateTypeScriptDefinitions()

  }

  sourceSets {
    commonMain {
      dependencies {
        implementation(libs.ktor.client.core)
        implementation(libs.ktor.client.resources)
        implementation(libs.ktor.client.serialization)
        implementation(libs.ktor.client.contentnegotiation)
        implementation(libs.kotlinx.coroutines.core)
        implementation(libs.ktor.serialization.json)
      }
    }
    jsMain {
      dependencies {
        implementation(libs.ktor.client.js)
      }
    }
    jvmMain {
      dependencies {
        implementation(libs.ktor.client.android)
      }
    }
  }
}
tasks.withType<KotlinJsCompile> {
  compilerOptions {
    moduleKind.set(JsModuleKind.MODULE_ES)
    useEsClasses.set(true)
    optIn.add("kotlin.js.ExperimentalJsExport")
  }
}
