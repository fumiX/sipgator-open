# SipGator-open

This repository contains the public part of SipGator,
which is the webapp and the common parts used in both the Android app and the webapp.

## Start the webapp for development

```shell
./gradlew :common:build
cd web
npm ci
npm run dev
```

## Build the webapp for production

```shell
./gradlew :web:build
```
