# React Native Expo Project

Welcome to the React Native Expo project repository! This project is built using React Native and Expo, allowing you to develop and test your mobile applications seamlessly on both iOS and Android devices. This readme file provides an overview of the project and instructions to get you started.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the App](#running-the-app)
- [Build](#build)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you start, make sure you have the following tools installed:

- [Node.js](https://nodejs.org) (LTS version recommended)
- [Yarn](https://yarnpkg.com/) - Yarn is a package manager that we'll use instead of npm.
- [Expo CLI](https://docs.expo.dev/get-started/installation/) - Install Expo CLI globally using yarn:
  ```bash
  yarn global add expo-cli
  ```

### Installation

1. Clone this repository to your local machine using:

   ```bash
   git clone https://github.com/OpusC/Speed-Wordle.git
   ```

2. Change directory to the project folder:

   ```bash
   cd Speed-Wordle
   ```

3. Install project dependencies using Yarn:

   ```bash
   yarn install
   ```

## Running the App

To run the app on your local development server, use the following Expo CLI command:

```bash
expo start
```

This will start the Expo development server and open the Expo Developer Tools in your default web browser. From there, you can choose to run the app on an iOS/Android simulator or scan the QR code with the Expo Go app on your physical device.

## Build

To create a standalone build for iOS and Android, you can use Expo CLI's build commands. Refer to the [Expo documentation](https://docs.expo.dev/distribution/building-standalone-apps/) for detailed instructions on building your app.

## Contributing

We welcome contributions to this project! If you find any bugs or want to add new features, please feel free to create issues or submit pull requests. Make sure to follow the coding guidelines and create descriptive commit messages for better collaboration.

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute the code as per the terms of the license. See the [LICENSE](LICENSE) file for more details.