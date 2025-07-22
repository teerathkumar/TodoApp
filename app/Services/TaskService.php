<?php

namespace App\Services;

use App\Repositories\TaskRepository;
use App\Models\Task;

class TaskService
{
    protected $repo;

    public function __construct(TaskRepository $repo)
    {
        $this->repo = $repo;
    }

    public function getAllTasks()
    {
        return $this->repo->all();
    }

    public function createTask(array $data)
    {
        return $this->repo->create($data);
    }

    public function updateTask($id, array $data)
    {
        $task = $this->repo->find($id);
        return $this->repo->update($task, $data);
    }

    public function deleteTask($id)
    {
        $task = $this->repo->find($id);
        return $this->repo->delete($task);
    }

    public function reorderTasks(array $ids)
    {
        return $this->repo->reorder($ids);
    }
} 