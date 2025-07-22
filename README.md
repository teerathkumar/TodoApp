# Laravel Task Manager

A modern, responsive Task Manager web app built with Laravel (PHP 8+), Bootstrap 5, and vanilla JavaScript.

## Features
- Create, edit, and delete tasks
- Each task has a title, description, and status (To Do, In Progress, Done)
- Drag-and-drop sorting of tasks
- Color-coded, responsive UI with modern UX
- Dynamic updates (AJAX, no page reload)
- Demo tasks seeded for testing
- No authentication required

## Getting Started

### 1. Clone the Repository
```
git clone <your-repo-url>
cd TodoApp
```

### 2. Install Dependencies
```
composer install
```

### 3. Environment Setup
- Copy `.env.example` to `.env`:
  ```
  cp .env.example .env
  ```
- Set your database connection in `.env` (SQLite recommended for quick start):
  ```
  DB_CONNECTION=sqlite
  DB_DATABASE=absolute/path/to/database.sqlite
  ```
  Or use MySQL if preferred.

### 4. Generate App Key
```
php artisan key:generate
```

### 5. Run Migrations & Seeders
```
php artisan migrate --seed
```

### 6. Serve the App
```
php artisan serve
```
Visit [http://localhost:8000](http://localhost:8000) in your browser.

## Project Structure
- `app/Repositories` - Database logic
- `app/Services` - Business logic
- `app/Http/Controllers` - RESTful API
- `resources/views` - Blade templates (Bootstrap 5)
- `public/js/tasks.js` - Frontend logic (AJAX, drag-and-drop)
- `database/seeders` - Demo data

## Customization
- Tweak styles in `resources/views/layouts/app.blade.php`
- Add more features as needed!

## Troubleshooting
- If API routes do not work, ensure `api` is registered in `bootstrap/app.php`:
  ```php
  ->withRouting(
      web: __DIR__.'/../routes/web.php',
      api: __DIR__.'/../routes/api.php',
      ...
  )
  ```
- Run `composer dump-autoload` if you add new classes.
- Check `storage/logs/laravel.log` for errors.

---

**Enjoy your Task Manager!**
