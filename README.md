# Learning Service API

This is a backend service built with Node.js, Express, and MongoDB for managing articles. It provides a RESTful API for standard CRUD (Create, Read, Update, Delete) operations on customized learning content, like vocabulary and sentences.

## 🚀 Getting Started

Follow these instructions to get a local copy up and running for development and testing.

### Prerequisites

* [Node.js](https://nodejs.org/) (v16 or later recommended)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* [MongoDB](https://www.mongodb.com/) (A running instance, either local or cloud-based like MongoDB Atlas)

### Running Locally
1. **Install dependencies:**
    ```sh
    npm install
    ```

2. **Set up environment variables:**
    Create a file named `.env` in the root of the project and add the following variables.
    ```.env
    MONGO_URL=mongodb://localhost:27017/your_db_name
    JWT_SECRET=your_super_strong_secret_key_here
    PORT=3003
    ```

3. **Start the server:**
    ```sh
    npm start
    ```
    The server should now be running and connected to MongoDB, accessible at `http://localhost:3003`.


4. **Run Container:**
    -  **Option 1: Run container on local**
       Modify the Dockerfile to `EXPOSE 3003`, and create the docker container with:
       ```bash
       docker build -t shiba-learning:latest .
       ```
       Run container:
        ```bash
        docker run -p 3003:3003 --env-file ./.env shiba-learning:latest
        ```
    - **Option 2: Run with k8s**
      Modify the Dockerfile to `EXPOSE 8080`, and create the docker container with:
      ```bash
      # depoly with minikube
       docker build -t shiba-learning:latest .
      
      # depoly with GKE
      docker buildx build --platform linux/amd64 -t us-central1-docker.pkg.dev/tcss559-au25-chaoyuuu/tcss559/shiba-learning:latest .
      ```
      Run k8s (see the README.md in k8s folder)



## <caption> API Endpoints

> Swagger API endpoints: `/api-doc`.

prefixed with `/vocabularies`.

| Method | Endpoint | Description | Request Body/Query Params |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Creates a new vocabulary entry for the authenticated user. | **Body:** (See Vocabulary Schema) |
| `GET` | `/` | Gets all vocabulary entries for the authenticated user. | **Query Params (Optional):** <br> `?articleId=...`|
| `GET` | `/:id` | Gets a single vocabulary entry by its ID. | |
| `PUT` | `/:id` | Updates a vocabulary entry by its ID. | **Body:** `{ "definition": "New definition", ... }` |
| `DELETE` | `/:id` | Deletes a vocabulary entry by its ID. | |

prefixed with `/sentences`.

| Method | Endpoint | Description | Request Body/Query Params |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Creates a new sentence entry for the authenticated user. | **Body:** (See sentence Schema) |
| `GET` | `/` | Gets all sentence entries for the authenticated user. | **Query Params (Optional):** <br> `?articleId=...`|
| `GET` | `/:id` | Gets a single sentence entry by its ID. | |
| `PUT` | `/:id` | Updates a sentence entry by its ID. | **Body:** `{ "context": "New context", ... }` |
| `DELETE` | `/:id` | Deletes a sentence entry by its ID. | |
---

## 📝 Vocabulary Schema

This is the main data model for vocabularies stored in the `vocabularies` collection.

* **word**
    * Type: `String`
    * Required: Yes
* **sentence**
    * Type: `String`
    * Required: No
* **definition**
    * Type: `String`
    * Required: No
* **source\_id**
    * Type: `String`
    * Required: Yes
* **source\_title**
    * Type: `String`
    * Required: Yes
* **owner\_id**
    * Type: `Types.ObjectId`
    * Required: Yes

---

## 📝 Sentence Schema

This is the main data model for sentences stored in the `sentences` collection.

* **sentence**
    * Type: `String`
    * Required: Yes
* **context**
    * Type: `String`
    * Required: No
* **source\_id**
    * Type: `String`
    * Required: Yes
* **source\_title**
    * Type: `String`
    * Required: Yes
* **owner\_id**
    * Type: `Types.ObjectId`
    * Required: Yes

---

## 🛠️ Technology Stack

* **Runtime:** [Node.js](https://nodejs.org/)
* **Framework:** [Express.js](https://expressjs.com/)
* **Database:** [MongoDB](https://www.mongodb.com/)
* **ODM:** [Mongoose](https://mongoosejs.com/)
* **Middleware:** [CORS](https://github.com/expressjs/cors), `express.json`
* **Environment:** [dotenv](https://github.com/motdotla/dotenv)