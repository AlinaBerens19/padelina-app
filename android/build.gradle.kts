// Top-level Gradle file for project-level build (Kotlin DSL)

buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        // Kotlin Gradle plugin
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:1.8.21")
        // Android Gradle plugin
        classpath("com.android.tools.build:gradle:8.11.1")
        // Google Services plugin (Firebase)
        classpath("com.google.gms:google-services:4.4.3")
    }
}

// Resolve React Native Android artifacts directory
val reactNativeAndroidDir: File = File(
    providers.exec {
        workingDir(rootDir)
        commandLine("node", "--print", "require.resolve('react-native/package.json')")
    }.standardOutput.toString().trim(),
    "../android"
)

allprojects {
    repositories {
        maven { url = reactNativeAndroidDir.toURI() }
        google()
        mavenCentral()
        maven("https://www.jitpack.io")
    }
}

// Expo & React Native root project plugins
apply(plugin = "expo-root-project")
apply(plugin = "com.facebook.react.rootproject")
// -----------------------------------------------------------------------------

// // android/build.gradle
// // Top-level build file where you can add configuration options common to all sub-projects/modules.
// buildscript {

//  repositories {
//    google()
//    mavenCentral()
//  }
//  dependencies {
//    // React Native Gradle plugin
//    classpath 'com.facebook.react:react-native-gradle-plugin'
//    // Kotlin Gradle plugin
//    classpath 'org.jetbrains.kotlin:kotlin-gradle-plugin'
//    classpath 'com.android.tools.build:gradle:8.11.1'

//  }
// }

// def reactNativeAndroidDir = new File(
//        providers.exec {
//          workingDir rootDir
//          commandLine("node", "--print", "require.resolve('react-native/package.json')")
//        }.standardOutput.asText.get().trim(),
//        "../android"
// )

// allprojects {
//  repositories {
//    maven {
//      // React Native (native) artifacts from npm
//      url reactNativeAndroidDir
//    }
//    google()
//    mavenCentral()
//    maven { url 'https://www.jitpack.io' }
//  }
// }

// // Expo & React Native root project setup
// apply plugin: 'expo-root-project'
// apply plugin: 'com.facebook.react.rootproject'
