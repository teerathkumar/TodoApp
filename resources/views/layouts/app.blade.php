<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Manager</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .status-todo {
            background-color: #e7f1ff !important;   /* Light blue */
            border-left: 5px solid #0d6efd;
        }
        .status-inprogress {
            background-color: #fff8e1 !important;   /* Light yellow */
            border-left: 5px solid #ffc107;
        }
        .status-done {
            background-color: #e6f4ea !important;   /* Light green */
            border-left: 5px solid #198754;
        }
        .task-item {
            transition: box-shadow 0.2s, border-color 0.2s;
            border-left: 5px solid transparent;
        }
        .task-item:focus-within, .task-item:hover {
            box-shadow: 0 0 10px #b3b3b3;
        }
        .card-text {
            word-break: break-word;
            max-width: 100%;
        }
        @media (max-width: 576px) {
            .task-item .d-flex.flex-row.flex-md-column {
                flex-direction: column !important;
                width: 100%;
            }
            .task-item .btn {
                width: 100%;
            }
        }
    </style>
    @yield('head')
</head>
<body>
    <div class="container py-4">
        <h1 class="mb-4 text-center">Task Manager</h1>
        @yield('content')
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    @yield('scripts')
</body>
</html> 