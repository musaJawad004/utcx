# UTCX

UTCX is a local-first world clock for iOS and Android. It uses Expo SDK 57, React Native, TypeScript, Expo Router, Reanimated, Skia, Zustand, MMKV, Luxon, Expo Location, native widgets, and iOS Live Activities.

## Architecture

The app follows MVVM:

- `app/` contains lightweight Expo Router route adapters.
- `src/screens/` contains views; every screen keeps its styles in a sibling `*.styles.ts` file.
- `src/viewmodels/` owns screen state and user actions.
- `src/models/` contains domain models.
- `src/services/` contains time, location, solar, haptic, persistence, widget, and Live Activity integrations.
- `src/store/` contains persisted Zustand state backed by MMKV.
- `src/components/ui/` contains reusable controls, each isolated in its own folder with separate styles.
- `src/theme/` is the single source of truth for color, spacing, radius, and typography tokens.
- `src/utils/` contains search and state validation.
- `widgets/` contains iOS WidgetKit and ActivityKit layouts expressed through Expo Widgets.
- `plugins/` contains the native Android AppWidget generator used by Expo Prebuild.

## Development

UTCX requires a development build because MMKV, WidgetKit, ActivityKit, and Android AppWidgets are native capabilities and are not available in Expo Go.

```sh
corepack yarn install
corepack yarn prebuild
corepack yarn ios
corepack yarn android
```

Useful checks:

```sh
corepack yarn typecheck
corepack yarn export:ios
corepack yarn export:android
corepack yarn widget:bundle
```

## Privacy

Location access is foreground-only. UTCX does not create an account, contact a server, or track location in the background. Saved cities and settings remain on-device.
