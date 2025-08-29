# BFHL REST API

This is a simple REST API created for a university full-stack assignment. The API processes an array of data and returns a categorized breakdown of its contents.

## Technology Stack

-   Node.js
-   Express.js
-   Deployed on Vercel

## API Endpoints

All endpoints are prefixed with `/api`.

### Data Processing

-   **Endpoint:** `POST /bfhl`
-   **Description:** Processes an array of data.
-   **Request Body:**
    ```json
    {
        "data": ["a", "1", "334", "4", "R", "&"]
    }
    ```
-   **Success Response (200 OK):**
    ```json
    {
        "is_success": true,
        "user_id": "miit_daga_27082003",
        "email": "miit.daga2022@vitstudent.ac.in",
        "roll_number": "22BIT0084",
        "odd_numbers": ["1", "334"],
        "even_numbers": ["4"],
        "alphabets": ["A", "R"],
        "special_characters": ["&"],
        "sum": "339",
        "concat_string": "rA"
    }
    ```

### Status Check

-   **Endpoint:** `GET /bfhl`
-   **Description:** A simple GET endpoint to confirm the API is running.
-   **Success Response (200 OK):**
    ```json
    {
        "operation_code": 1,
        "message": "BFHL API is running successfully"
    }
    ```

### Health Check

-   **Endpoint:** `GET /health`
-   **Description:** A standard health check endpoint.
-   **Success Response (200 OK):**
    ```json
    {
        "status": "healthy",
        "timestamp": "2025-08-29T06:30:00.000Z",
        "service": "BFHL API"
    }
    ```

## Running Locally

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Start the server:**
    ```sh
    npm start
    ```

The server will be running on `http://localhost:3000`.
The deployed version is available on `https://vit-bfhl-task-a5z8.vercel.app/api` .
The test URL is `https://vit-bfhl-task-a5z8.vercel.app/api/bfhl` .