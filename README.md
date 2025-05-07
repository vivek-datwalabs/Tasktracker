
# Task Tracker API Documentation

This is the API documentation for the Task Tracker backend built with Node.js and Express.js.

## Base URL

```
http://<your-domain-or-ip>:<port>/api/tasks
```

---

## Endpoints

### 1. Get All Tasks

- **URL**: `/`
- **Method**: `GET`
- **Description**: Retrieve all non-deleted tasks.
- **Response**:
  ```json
  [
    {
      "_id": "taskId",
      "title": "Task title",
      "completed": false,
      "isDeleted": false
    }
  ]
  ```

---

### 2. Get All Deleted Tasks

- **URL**: `/alldeletedtask`
- **Method**: `GET`
- **Description**: Retrieve all soft-deleted tasks (where `isDeleted: true`).
- **Response**:
  ```json
  [
    {
      "_id": "taskId",
      "title": "Deleted task title",
      "completed": false,
      "isDeleted": true
    }
  ]
  ```

---

### 3. Create a New Task

- **URL**: `/`
- **Method**: `POST`
- **Description**: Create a new task.
- **Request Body**:
  ```json
  {
    "title": "New task title"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "taskId",
    "title": "New task title",
    "completed": false,
    "isDeleted": false
  }
  ```

---

### 4. Update a Task

- **URL**: `/:id`
- **Method**: `PUT`
- **Description**: Update a task's title or completion status.
- **Request Body**:
  ```json
  {
    "title": "Updated title",
    "completed": true
  }
  ```
- **Response**:
  ```json
  {
    "_id": "taskId",
    "title": "Updated title",
    "completed": true,
    "isDeleted": false
  }
  ```

---

### 5. Soft Delete a Task

- **URL**: `/:id`
- **Method**: `DELETE`
- **Description**: Marks a task as deleted by setting `isDeleted` to `true`.
- **Response**:
  ```json
  {
    "message": "Task deleted"
  }
  ```

---

## Notes

- All errors will return a structured JSON error message with appropriate HTTP status codes.
- Make sure MongoDB is connected and environment variables are configured.

---

## Example Environment Configuration (`.env`)
```env
PORT=5000
MONGODB_URI=your-mongodb-uri
```

---

