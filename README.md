# JankE

Extension that adds Epitech specific features to Jenkins

## Features

- GitHub Link button on a Job
- Git Hash that goes directly to the delivery commit

## Install (from Release)

Go to the releases tab and grab the latest release.

If you're on Firefox:
- First of all, make sure to [allow unsigned extensions](https://support.mozilla.org/en-US/kb/add-on-signing-in-firefox#w_what-are-my-options-if-i-want-to-use-an-unsigned-add-on-advanced-users).
- It should just prompt you to install the extension when pressing on the .xpi.
- If it doesn't, download the .xpi and go to your extensions then click the little gear and Install Addon From File.

If you're on Chromium:
- download the .zip and go to your extensions
- Enable developer mode, then Load unpacked and put in the .zip file.

## Local installation

Use make with your specific platform:

```sh
make chromium
make firefox
```

Or make for all platforms:

```sh
make all
```
