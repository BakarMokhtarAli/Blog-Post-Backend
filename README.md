## API Documentation for Blog Post

`BASE_URL= https://blog-post-mojt.onrender.com`

### **GET /api/owner**

**Description:** Get all owners.

**Request:**

```
Method: GET
```

**Response:**

```json
{
  "owners": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com"
    },
    {
      "id": 2,
      "name": "Jane Doe",
      "email": "jane.doe@example.com"
    }
  ]
}
```

### **GET /api/owner/:id**

**Description:** Get an owner by ID.

**Request:**

```
Method: GET
```

**Parameters:**

```
id: The ID of the owner.
```

**Response:**

```json
{
  "owner": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

### **POST /api/owner/signup**

**Description:** Sign up a new owner.

**Request:**

```
Method: POST
```

**Body:**

 |parameter      |type      |required|
 |----------|-----------|--------|
 |name|string|Yes|
 |email|string|Yes|
 |password|string|Yes|
<!-- 
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
``` -->

**Response:**

```json
{
  "message": "Owner created success!",
  "owner": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

### **POST /api/owner/login**

**Description:** Log in an existing owner.

**Request:**

```
Method: POST
```

**Body:**
|parameter      |type      |required|
 |----------|-----------|--------|
 |email     |string     |Yes|
 |password  |string     |Yes|
<!-- ```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
``` -->

**Response:**

```json
{
  "message": "Login success",
  "token": "<JWT token>"
}
```

### **PUT /api/owner/:id**

**Description:** Update an owner by ID.

**Request:**

```
Method: PUT
Headers:
- Authorization: Bearer <JWT token>
```

**Request Parameters:**

|parameter      |type      |required|
 |----------|-----------|--------|
 |id     |integer     |Yes|
 

**Body:**
|parameter      |type      |required|
 |----------|-----------|--------|
 |email     |string     |Yes|
 |password  |string     |Yes|

**Response:**

```json
{
  "message": "Owner updated success"
}
```

### **DELETE /api/owner/:id**

**Description:** Delete an owner by ID.

**Request:**

```
Method: DELETE
Headers:
- Authorization: Bearer <JWT token>
```

**Request Parameters:**

```
id: The ID of the owner.
```

**Response:**

```json
{
  "message": "Owner deleted success"
}
```

### Posts

### **GET /api/post**

**Description:** Get all posts.

**Request:**

```
Method: GET
```

**Response:**

```json
{
  "posts": [
    {
      "id": 1,
      "ownerId": 1,
      "title": "My first post",
      "description": "This is my first post!"
    },
    {
      "id": 2,
      "ownerId": 2,
      "title": "My second post",
      "description": "This is my second post!"
    }
  ]
}
```

### **GET /api/post/:id**

**Description:** Get a post by ID.

**Request:**

```
Method: GET
```

**Parameters:**

```
id: The ID of the post.
```

**Response:**

```json
{
  "post": {
    "id": 1,
    "ownerId": 1,
    "title": "My first post",
    "description": "This is my first post!"
  }
}
```

### **POST /api/post**

**Description:** Create a new post.

**Request:**

```
Method: POST
Headers:
- Authorization: Bearer <JWT token>
```

**Body:**
|parameter      |type      |required|
 |----------|-----------|--------|
 |ownerId     |integer     |Yes|
 |title  |string     |Yes|
 |description  |string     |Yes|


**Response:**

```json
{
  "message": "Post created success",
  "post": {
    "id": 3,
    "ownerId": 1,
    "title": "My new post",
    "description": "This is my new post!"
  }
}
```

### **PUT /api/post/:id**

**Description:** Update a post by ID.

**Request:**

```
Method: PUT
Headers:
- Authorization: Bearer <JWT token>
```

**Parameters:**

```
id: The ID of the post.
```

**Body:**

|parameter      |type      |required|
 |----------|-----------|--------|
 |ownerId     |integer     |Yes|
 |title  |string     |Yes|
 |description  |string     |Yes|

**Response:**

```json
{
  "message": "Post updated success"
}
```

### **DELETE /api/post/:id**

**Description:** Delete a post by ID.

**Request:**

```
Method: DELETE
Headers:
- Authorization: Bearer <JWT token>
```

**Parameters:**

```
id: The ID of the post.
```

**Response:**

```json
{
  "message": "Post deleted success"
}
```

### Authentication

All requests to the `/api/post` endpoint must be authenticated with a valid JWT token. The token can be obtained by logging in as an owner.
