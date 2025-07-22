@extends('layouts.app')

@section('content')
<div class="mb-3 d-flex justify-content-between align-items-center">
    <button class="btn btn-primary" id="addTaskBtn">Add Task</button>
</div>
<div id="taskList" class="row g-3 mb-4">
    <!-- Tasks will be loaded here by JS -->
</div>

<!-- Modal -->
<div class="modal fade" id="taskModal" tabindex="-1" aria-labelledby="taskModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <form id="taskForm">
        <div class="modal-header">
          <h5 class="modal-title" id="taskModalLabel">Add Task</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="taskTitle" class="form-label">Title</label>
            <input type="text" class="form-control" id="taskTitle" name="title" required maxlength="255">
            <div class="invalid-feedback" id="titleError"></div>
          </div>
          <div class="mb-3">
            <label for="taskDescription" class="form-label">Description</label>
            <textarea class="form-control" id="taskDescription" name="description" rows="2"></textarea>
            <div class="invalid-feedback" id="descriptionError"></div>
          </div>
          <div class="mb-3">
            <label for="taskStatus" class="form-label">Status</label>
            <select class="form-select" id="taskStatus" name="status" required>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <div class="invalid-feedback" id="statusError"></div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-primary" id="saveTaskBtn">Save</button>
        </div>
        <input type="hidden" id="taskId">
      </form>
    </div>
  </div>
</div>
@endsection

@section('scripts')
<script src="/js/tasks.js"></script>
@endsection 