const dataService = require('../services/dataService');

const getBaseUrl = (req) => {
  return process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
};

const formatResponse = (req, success, message, data, meta = {}) => {
  return {
    success,
    message,
    data,
    meta: {
      base_url: getBaseUrl(req),
      version: 'v1',
      ...meta
    }
  };
};

exports.getMetadata = (req, res) => {
  const stats = dataService.getMetadata();
  res.json(formatResponse(req, true, 'API Metadata', stats));
};

exports.getHealth = (req, res) => {
  res.json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
};

exports.getApiOverview = (req, res) => {
  const baseUrl = getBaseUrl(req);
  res.json(formatResponse(req, true, 'Hisn al-Muslim API Overview', {
    name: 'hisn-al-muslim-api',
    description: 'A clean, production-ready JSON API for Hisn al-Muslim',
    endpoints: {
      chapters: `${baseUrl}/api/v1/chapters`,
      items: `${baseUrl}/api/v1/items`,
      search: `${baseUrl}/api/v1/search?q={query}`,
      random: `${baseUrl}/api/v1/random`,
      meta: `${baseUrl}/api/v1/meta`,
      health: `${baseUrl}/health`
    }
  }));
};

exports.getChapters = (req, res) => {
  const chapters = dataService.getAllChapters();
  res.json(formatResponse(req, true, 'All Chapters', chapters, { count: chapters.length }));
};

exports.getChapterById = (req, res) => {
  const chapter = dataService.getChapterById(req.params.chapterId);
  if (!chapter) {
    return res.status(404).json(formatResponse(req, false, 'Chapter not found', null));
  }
  res.json(formatResponse(req, true, `Chapter ${req.params.chapterId}`, chapter, { count: chapter.items.length }));
};

exports.getItems = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const result = dataService.getAllItems(page, limit);
  res.json(formatResponse(req, true, 'All Items', result.items, {
    count: result.items.length,
    pagination: {
      total: result.total,
      page: result.page,
      limit: result.limit,
      total_pages: result.totalPages
    }
  }));
};

exports.getItemById = (req, res) => {
  const item = dataService.getItemById(req.params.id);
  if (!item) {
    return res.status(404).json(formatResponse(req, false, 'Item not found', null));
  }
  res.json(formatResponse(req, true, `Item ${req.params.id}`, item));
};

exports.search = (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json(formatResponse(req, false, 'Search query is required', null));
  }
  const results = dataService.search(query);
  res.json(formatResponse(req, true, `Search results for: ${query}`, results, { count: results.length }));
};

exports.getRandom = (req, res) => {
  const item = dataService.getRandomItem();
  res.json(formatResponse(req, true, 'Random Item', item));
};

exports.getAudioMetadata = (req, res) => {
  const item = dataService.getItemById(req.params.id);
  if (!item) {
    return res.status(404).json(formatResponse(req, false, 'Item not found', null));
  }
  res.json(formatResponse(req, true, `Audio metadata for item ${req.params.id}`, {
    id: item.id,
    audio_url: item.audio_url,
    audio_sync: item.audio_sync
  }));
};

exports.getBaseUrls = (req, res) => {
  res.json(formatResponse(req, true, 'Configured Base URLs', {
    current: getBaseUrl(req),
    environments: {
      local: 'http://localhost:3000',
      staging: process.env.STAGING_URL || null,
      production: process.env.PRODUCTION_URL || null
    }
  }));
};
