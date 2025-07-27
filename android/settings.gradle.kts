// Top‐level settings for React Native + Expo Autolinking (Kotlin DSL)

pluginManagement {
    repositories {
        gradlePluginPortal()           // Gradle plugins
        google()                        // Android Gradle Plugin & Google services
        mavenCentral()                  // Other plugins
    }

    // Include React Native Gradle Plugin from node_modules
    val reactNativeGradlePlugin = File(
        providers.exec {
            workingDir(rootDir)
            commandLine(
              "node", "--print",
              "require.resolve('@react-native/gradle-plugin/package.json', { paths: [ require.resolve('react-native/package.json') ] })"
            )
        }.standardOutput.toString().trim()
    ).parentFile.absolutePath
    includeBuild(reactNativeGradlePlugin)

    // Include Expo Autolinking Plugin
    val expoPluginsPath = File(
        providers.exec {
            workingDir(rootDir)
            commandLine(
              "node", "--print",
              "require.resolve('expo-modules-autolinking/package.json', { paths: [ require.resolve('expo/package.json') ] })"
            )
        }.standardOutput.toString().trim(),
        "../android/expo-gradle-plugin"
    ).absolutePath
    includeBuild(expoPluginsPath)
}

plugins {
    id("com.facebook.react.settings")
    id("expo-autolinking-settings")
}

extensions.configure<com.facebook.react.ReactSettingsExtension> {
    if (System.getenv("EXPO_USE_COMMUNITY_AUTOLINKING") == "1") {
        autolinkLibrariesFromCommand()
    } else {
        autolinkLibrariesFromCommand(expoAutolinking.rnConfigCommand)
    }
}

expoAutolinking.useExpoModules()
expoAutolinking.useExpoVersionCatalog()

rootProject.name = "Padelina"
include(":app")
includeBuild(expoAutolinking.reactNativeGradlePlugin)
// ---------------------------------------------------------------------------------

// pluginManagement {
//   def reactNativeGradlePlugin = new File(
//     providers.exec {
//       workingDir(rootDir)
//       commandLine("node", "--print", "require.resolve('@react-native/gradle-plugin/package.json', { paths: [require.resolve('react-native/package.json')] })")
//     }.standardOutput.asText.get().trim()
//   ).getParentFile().absolutePath
//   includeBuild(reactNativeGradlePlugin)
  
//   def expoPluginsPath = new File(
//     providers.exec {
//       workingDir(rootDir)
//       commandLine("node", "--print", "require.resolve('expo-modules-autolinking/package.json', { paths: [require.resolve('expo/package.json')] })")
//     }.standardOutput.asText.get().trim(),
//     "../android/expo-gradle-plugin"
//   ).absolutePath
//   includeBuild(expoPluginsPath)
// }

// plugins {
//   id("com.facebook.react.settings")
//   id("expo-autolinking-settings")
// }

// extensions.configure(com.facebook.react.ReactSettingsExtension) { ex ->
//   if (System.getenv('EXPO_USE_COMMUNITY_AUTOLINKING') == '1') {
//     ex.autolinkLibrariesFromCommand()
//   } else {
//     ex.autolinkLibrariesFromCommand(expoAutolinking.rnConfigCommand)
//   }
// }
// expoAutolinking.useExpoModules()

// rootProject.name = 'Padelina'

// expoAutolinking.useExpoVersionCatalog()

// include ':app'
// includeBuild(expoAutolinking.reactNativeGradlePlugin)
