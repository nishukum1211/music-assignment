````

# 🎶 Nx Microfrontend Music App  

A **microfronREADME.md`** with **all deliverables covered** (run locally, deployment, credentials, explanation of microfrontended authentication** (Admin/User), **dynamic remote loading**, and **music library management** with filtering, sorting, and grouping.  

---

### 1. GitHub Repository with README  

#### 📌 How to Run Locally  

```bash
# Clone the repository
git clone https://github.com/your-username/nx-microfrontend-music-app.git
cd nx-microfrontend-music-app

# Install dependencies
npm install

# Run host app
nx serve hostapp

# Run remote app
nx serve remoteapp
````

* Open your browser at the **host app** URL.
* The host will dynamically load the **remote music app**.

---

#### 📌 How Deployed

* Both **Host App** and **Remote App** are deployed separately (e.g., **Vercel**).
* The **remoteapp** exposes its `remoteEntry.js` file.
* The **hostapp** consumes that file dynamically at runtime.

Example configuration in `hostapp` (Webpack Module Federation):

```js
remotes: {
  music: "music@https://remoteapp-demo.vercel.app/remoteEntry.js",
}
```

* This ensures the **hostapp** always loads the deployed **remoteapp**.

---

#### 📌 Credentials for Demo

* **Admin**

  * Role: `admin`
  * Permissions: View, Add, Delete songs

* **User**

  * Role: `user`
  * Permissions: View only

---

#### 📌 Explanation of Micro Frontend & Role-Based Auth

**Micro Frontend Setup**

* `hostapp` → Acts as the main container application.
* `remoteapp` → Music Library (songs listing + add/delete features).
* Integrated via **Webpack Module Federation** with **lazy loading**.

**Authentication & Role Management Flow**

1. On login, select either **User** or **Admin**.
2. A **mock JWT** is generated and stored in `localStorage`.
3. An **Auth Higher Order Component (HOC)** reads the token and extracts role.
4. The role determines which UI actions are enabled:

   * **User** → Can view and filter songs.
   * **Admin** → Can view, add, and delete songs.

**Music Library Features**

* Modern UI for managing songs.
* Filter, sort, and group by **Album, Artist, Title**.
* Implemented using JavaScript’s `map`, `filter`, and `reduce`.

---

### 2. 🌍 Live Demo Links

* **Main App (Host App)** → https://music-assignment-host.vercel.app/
* **Music Library (Remote App)** → https://music-assignment-remote.vercel.app/

---



---
