# Hisn al-Muslim API

A clean, production-ready JSON API for the book **“Hisn al-Muslim / Fortress of the Muslim”**. This API provides access to a normalized dataset of Islamic supplications (Adhkar) with support for Arabic text, English translations, transliterations, and audio resources.

## Features

- **Arabic Text**: Preserved exactly as sourced with full diacritics.
- **English Translation**: Clear and accurate English meanings.
- **Transliteration**: Phonetic representation for non-Arabic speakers.
- **Audio Support**: Direct URLs to audio recitations.
- **Audio-Text Sync**: Word-by-word highlighting metadata support.
- **Normalized Data**: Consistent schema with ordered IDs and chapter categorization.
- **Fast & Documented**: Built with Node.js/Express, featuring OpenAPI/Swagger documentation.
- **Production Ready**: Includes health checks, error handling, CORS, and pagination.

## Tech Stack

- **Framework**: Node.js with Express
- **Middleware**: Helmet (security), CORS, Morgan (logging)
- **Testing**: Jest & Supertest
- **Documentation**: OpenAPI 3.0 (Swagger)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/hisn-al-muslim-api.git
   cd hisn-al-muslim-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Start the server:
   ```bash
   npm start
   ```
   For development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

### Base URL
The API is accessible at `http://localhost:3000/api/v1` (default).

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/` | GET | API Overview and metadata |
| `/health` | GET | Service status and health check |
| `/api/v1/chapters` | GET | Returns all chapters ordered by ID |
| `/api/v1/chapters/:id` | GET | Returns a single chapter with its items |
| `/api/v1/items` | GET | Returns all items with pagination (`?page=1&limit=20`) |
| `/api/v1/items/:id` | GET | Returns a single record by ID |
| `/api/v1/search?q=` | GET | Searches text, transliteration, and chapters |
| `/api/v1/random` | GET | Returns one random item |
| `/api/v1/audio/:id` | GET | Returns audio metadata for the requested item |
| `/api/v1/meta` | GET | Returns dataset statistics and counts |

## Response Format

All responses follow a consistent envelope:

```json
{
  "success": true,
  "message": "...",
  "data": { ... },
  "meta": {
    "base_url": "...",
    "version": "v1",
    "count": 1,
    "pagination": { ... }
  }
}
```

## Audio Sync Support

The API supports word-by-word highlighting through the `audio_sync` field. This allows frontends to highlight specific words in sequence during audio playback.

```json
"audio_sync": {
  "words": [
    { "word": "الحمد", "start_ms": 0, "end_ms": 500 },
    { "word": "لله", "start_ms": 500, "end_ms": 1000 }
  ]
}
```
*Note: If exact timings are unavailable, the structure remains as a placeholder.*

## Dataset Source

The data is sourced and normalized from the [Hisn-Muslim-Json](https://github.com/wafaaelmaandy/Hisn-Muslim-Json) repository.

## License

This project is licensed under the MIT License.
