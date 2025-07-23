# 🧩 Mini Task Manager

A clean, modern, and state-managed task manager built with Angular 19, Tailwind CSS, and NgRx Store. It supports full task CRUD, localStorage persistence via NgRx Effects, filtering, and drag-and-drop (optional).

---

## 🚀 Project Overview

Mini Task Manager is a lightweight productivity app for managing tasks categorized by completion status and category. Built using Angular Standalone Components and NgRx, it emphasizes modern frontend practices:

* ✅ Angular 19 + Standalone Components
* ✅ Tailwind CSS for styling
* ✅ NgRx Store for global state management
* ✅ NgRx Effects for localStorage persistence
* ✅ Responsive, mobile-first UI

---

## ⚙️ Setup Instructions

### 1. 📦 Clone and Install

```bash
npm install
```

### 2. 🔥 Run Locally

```bash
npm start
# or
ng serve
```

### 3. 🐳 Run via Docker

#### Build Image:

```bash
docker build -t mini-task-manager .
```

#### Run Container:

```bash
docker run -d -p 4200:80 mini-task-manager
```

App will be accessible at: [http://localhost:4200](http://localhost:4200)

---

## 🧪 Running Tests

### Unit Tests:

```bash
ng test
```

This runs Karma + Jasmine unit tests for components, reducers, effects, and selectors.

---

## 🏗️ Architectural Decisions

### 📦 State Management

* Used `@ngrx/store` and `@ngrx/effects`
* Central state for tasks
* Filters (status/category) are managed locally in component for simplicity, but can be moved to store

### 💾 Persistence

* LocalStorage is used for saving tasks using NgRx Effects
* Effects listen to `addTask`, `toggleTask`, `reorderTasks` and serialize task state

### 🎨 UI

* Tailwind CSS used directly in component templates
* `async` pipe used in templates to bind state reactively

### 🧱 Angular Standalone

* No NgModules used
* Bootstrapped via `main.ts` using `provideStore`, `provideEffects`

---

## ⚠️ Known Issues / Limitations

* 🔁 Tasks are only persisted in localStorage (not synced to a backend)
* 📂 Filter state (status/category) is not yet managed in NgRx (can be added)
* ⛔ No authentication/user support
* 🧪 `localStorage` usage may need mocks in tests to avoid spy-related crashes
* ⛔ Some test cases are failing
---

## 📂 Folder Structure

```
src/
├── app/
│   ├── components/ (common components)
│   ├── store/
│   │   ├── task.actions.ts
│   │   ├── task.reducer.ts
│   │   ├── task.effects.ts
│   │   ├── task.model.ts
│   │   ├── task.selectors.ts
│   └── app.component.ts/html
├── assets/
├── main.ts
└── styles.css
```

---

## 🙌 Contributing

Pull requests and suggestions welcome!

---

## 📝 License

MIT
