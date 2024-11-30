
## Endpoints

### 1. Verify Transaction
- **Method**: `POST`
- **URL**: `/verify`
- **Request Body**:
  ```json
  {
    "transactionId": "string",
    "walletAddress": "string"
  }
  ```
- **Response**:
  - **Success (200)**:
    ```json
    {
      "message": "success",
      "transactionId": "string",
      "amountPaid": "number",
      "amountSent": "number",
      "walletAddress": "string"
    }
    ```
  - **Error (400)**:
    ```json
    {
      "message": "Transaction ID {transactionId} is not valid"
    }
    ```
  - **Error (500)**:
    ```json
    {
      "message": "Please contact customer service with the ID {transactionId}"
    }
    ```

### 2. Create Card
- **Method**: `POST`
- **URL**: `/sui-pay/createCard`
- **Request Body**:
  ```json
  {
    "password": "string",
    "walletAddress": "string"
  }
  ```
- **Response**:
  - **Success (200)**:
    ```json
    {
      "encrypted_mnemonic": "string",
      "walletAddressPublicKey": "string"
    }
    ```
  - **Error (500)**:
    ```json
    {
      "message": "create wallet failed"
    }
    ```

### 3. Buy Amount
- **Method**: `POST`
- **URL**: `/sui-pay/buyAmount`
- **Request Body**:
  ```json
  {
    "amount": "number"
  }
  ```
- **Response**:
  - **Success (200)**:
    ```json
    {
      "message": "success",
      "transactionId": "string"
    }
    ```
  - **Error (500)**:
    ```json
    {
      "message": "Can't mock pay at the moment"
    }
    ```

### 4. Decrypt Keyphrase
- **Method**: `POST`
- **URL**: `/sui-pay/decryptKeyphrase`
- **Request Body**:
  ```json
  {
    "encryptedData": "string",
    "password": "string",
    "amount": "number",
    "walletAddress": "string",
    "recipientAddress": "string"
  }
  ```
- **Response**:
  - **Success (200)**:
    ```json
    {
      "message": "Decryption successful",
      "result": "any"
    }
    ```
  - **Error (400)**:
    ```json
    {
      "errors": [
        {
          "msg": "encryptedData is required",
          "param": "encryptedData"
        },
        {
          "msg": "password is required",
          "param": "password"
        },
        {
          "msg": "amount must be a number",
          "param": "amount"
        },
        {
          "msg": "walletAddress is required",
          "param": "walletAddress"
        },
        {
          "msg": "recipientAddress is required",
          "param": "recipientAddress"
        }
      ]
    }
    ```
  - **Error (500)**:
    ```json
    {
      "message": "Decryption failed"
    }
    ```

### 5. Get Naira to USD Rate
- **Method**: `GET`
- **URL**: `/`
- **Response**:
  - **Success (200)**:
    ```json
    {
      "usd": "number"
    }
    ```
  - **Error (500)**:
    ```json
    {
      "message": "Could not get current rate"
    }
    ```

## Notes
- Ensure that the server is running on the specified base URL before making requests.
- All endpoints require proper validation of input data.
- Error messages may vary based on the implementation and error handling in the codebase.