const fs = require('fs');
const path = require('path');

class DataService {
  constructor() {
    const dataPath = path.join(__dirname, '../../data/hisn-al-muslim.normalized.json');
    this.items = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    this.chapters = this.extractChapters();
  }

  extractChapters() {
    const chaptersMap = new Map();
    this.items.forEach(item => {
      if (!chaptersMap.has(item.chapter_id)) {
        chaptersMap.set(item.chapter_id, {
          id: item.chapter_id,
          title_ar: item.chapter_title_ar,
          title_en: item.chapter_title_en,
          item_count: 0
        });
      }
      chaptersMap.get(item.chapter_id).item_count++;
    });
    return Array.from(chaptersMap.values()).sort((a, b) => a.id - b.id);
  }

  getAllChapters() {
    return this.chapters;
  }

  getChapterById(chapterId) {
    const chapter = this.chapters.find(c => c.id === parseInt(chapterId));
    if (!chapter) return null;
    
    const items = this.items.filter(item => item.chapter_id === parseInt(chapterId));
    return { ...chapter, items };
  }

  getAllItems(page = 1, limit = 20) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    return {
      items: this.items.slice(startIndex, endIndex),
      total: this.items.length,
      page,
      limit,
      totalPages: Math.ceil(this.items.length / limit)
    };
  }

  getItemById(id) {
    return this.items.find(item => item.id === parseInt(id));
  }

  search(query) {
    if (!query) return [];
    const q = query.toLowerCase();
    return this.items.filter(item => 
      (item.arabic_text && item.arabic_text.includes(q)) ||
      (item.english_text && item.english_text.toLowerCase().includes(q)) ||
      (item.transliteration && item.transliteration.toLowerCase().includes(q)) ||
      (item.chapter_title_en && item.chapter_title_en.toLowerCase().includes(q)) ||
      (item.footnote && item.footnote.toLowerCase().includes(q))
    );
  }

  getRandomItem() {
    const randomIndex = Math.floor(Math.random() * this.items.length);
    return this.items[randomIndex];
  }

  getMetadata() {
    return {
      total_items: this.items.length,
      total_chapters: this.chapters.length,
      last_updated: this.items[0]?.updated_at || new Date().toISOString(),
      source: "Hisn al-Muslim"
    };
  }
}

module.exports = new DataService();
