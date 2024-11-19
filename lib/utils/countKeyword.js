// lib/countKeywords.js

/**
 * Fungsi untuk menghitung jumlah kemunculan keyword di kedalaman tertentu.
 * @param {Object} data - Data JSON yang berisi keyword dan relatedKeyword.
 * @param {number} depth - Kedalaman saat ini (default 1).
 * @param {Object} result - Objek hasil sementara.
 * @returns {Object} - Hasil hitungan keyword di setiap kedalaman.
 */
export const countKeywords = (data, depth = 1, result = {}) => {
    const keyword = data.mainKeyword.toLowerCase();
    if (!result[keyword]) {
      result[keyword] = {
        kedalaman1: 0,
        kedalaman2: 0,
        kedalaman3: 0,
        kedalaman4: 0,
      };
    }
    if (depth <= 4) {
      result[keyword][`kedalaman${depth}`]++;
    }
  
    data.relatedKeyword.forEach((related) => {
      countKeywords(related, depth + 1, result);
    });
  
    return result;
  };