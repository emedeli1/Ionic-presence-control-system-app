# Presence Control System

This project consists of three main components:

- **AppUsuario**: A mobile application developed with Ionic that allows users to register and view check-ins.  
- **AppAdmin**: A mobile application developed with Ionic for administrators to manage users, jobs, and check-ins.  
- **Server**: A backend automatically generated with Swagger that handles all operations related to users, check-ins, and jobs.

Below is a guide on how to set up and run all components.

---

## Prerequisites

Before starting, make sure you have the following installed on your machine:

- **Node.js (LTS recommended)**: [Download here](https://nodejs.org/)  
- **Ionic CLI**: Install globally using:

```bash
npm install -g @ionic/cli
```

---

## Starting the Backend Server

The server was generated using Swagger and handles all necessary CRUD operations for the applications.

**Steps to start the server:**

1. Navigate to the server folder:

```bash
cd /path/to/project/server
```

2. Install server dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

The server will run on port `8080` by default. You should see something like:

```
Server running at http://localhost:8080
```

Verify it by opening [http://localhost:8080](http://localhost:8080) in your browser.

---

## Starting AppUsuario

AppUsuario is the interface for users to register and view check-ins.

**Steps to start AppUsuario:**

1. Navigate to the AppUsuario folder:

```bash
cd /path/to/project/AppUsuario
```

2. Install dependencies:

```bash
npm install
```

3. Run the app in development mode:

```bash
ionic serve
```

The app will open in your browser at [http://localhost:8100](http://localhost:8100).

---

## Starting AppAdmin

AppAdmin is used by administrators to manage users, jobs, and check-ins.

**Steps to start AppAdmin:**

1. Navigate to the AppAdmin folder:

```bash
cd /path/to/project/AppAdmin
```

2. Install dependencies:

```bash
npm install
```

3. Run the app in development mode:

```bash
ionic serve
```

The app will open in your browser at [http://localhost:8101](http://localhost:8101).

---

## Geolocation Configuration

AppUsuario uses geolocation to record check-ins with location data.

**Steps to configure geolocation:**

1. Make sure you are in the AppUsuario folder:

```bash
cd /path/to/project/AppUsuario
```

2. Install the geolocation plugin:

```bash
npm install @capacitor/geolocation
```

3. Sync the project with Capacitor:

```bash
ionic cap sync
```

4. On a mobile device, ensure the app has location permissions enabled.

---

## Important Notes

- **Independent apps**: The backend, AppUsuario, and AppAdmin run as separate services. Make sure the backend is running before using the apps.  
- **Default ports**:
  - Backend server: `8080`
  - AppUsuario: `8100`
  - AppAdmin: `8101`  

**Common issues**:

- Verify that the backend URL configured in the apps is correct.  
- If geolocation is not working, check device permissions and settings.

---

## ✅ All Set!

With these configurations, the Presence Control System should be running correctly. 🚀

