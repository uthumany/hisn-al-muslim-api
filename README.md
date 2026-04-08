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

- **Framework**: Node.js with Express (for dynamic API, though static version is deployed)
- **Middleware**: Helmet (security), CORS, Morgan (logging)
- **Testing**: Jest & Supertest
- **Documentation**: OpenAPI 3.0 (Swagger)
- **Static Hosting**: GitHub Pages

## Installation (Dynamic API - for local development)

1. Clone the repository:
   ```bash
   git clone https://github.com/uthumany/hisn-al-muslim-api.git
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

## Static API Endpoints (GitHub Pages)

This API is statically hosted on GitHub Pages, providing direct JSON responses for easy consumption. The base URL for the static API is `https://uthumany.github.io/hisn-al-muslim-api/api/v1/`.

| Endpoint | Description | Example Link |
| :--- | :--- | :--- |
| `/` | API Overview and metadata | [https://uthumany.github.io/hisn-al-muslim-api/api/v1/index.json](https://uthumany.github.io/hisn-al-muslim-api/api/v1/index.json) |
| `/chapters` | Returns all chapters ordered by ID | [https://uthumany.github.io/hisn-al-muslim-api/api/v1/chapters.json](https://uthumany.github.io/hisn-al-muslim-api/api/v1/chapters.json) |
| `/chapters/:id` | Returns a single chapter with its items | [https://uthumany.github.io/hisn-al-muslim-api/api/v1/chapters/1.json](https://uthumany.github.io/hisn-al-muslim-api/api/v1/chapters/1.json) |
| `/items` | Returns all items (first page, limit 20) | [https://uthumany.github.io/hisn-al-muslim-api/api/v1/items.json](https://uthumany.github.io/hisn-al-muslim-api/api/v1/items.json) |
| `/items/:id` | Returns a single record by ID | [https://uthumany.github.io/hisn-al-muslim-api/api/v1/items/1.json](https://uthumany.github.io/hisn-al-muslim-api/api/v1/items/1.json) |
| `/random` | Returns one random item (static snapshot) | [https://uthumany.github.io/hisn-al-muslim-api/api/v1/random.json](https://uthumany.github.io/hisn-al-muslim-api/api/v1/random.json) |
| `/meta` | Returns dataset statistics and counts | [https://uthumany.github.io/hisn-al-muslim-api/api/v1/meta.json](https://uthumany.github.io/hisn-al-muslim-api/api/v1/meta.json) |

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
