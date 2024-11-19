// /app/api/scrapeRelatedQueries/route.js

import axios from "axios";
import { load } from "cheerio";

// Fungsi untuk mengambil related queries dari Google Search
const scrapeRelatedQueries = async (searchQuery) => {
  try {
    const query = encodeURIComponent(searchQuery);
    const url = `https://www.google.com/search?q=${query}`;

    // Permintaan ke Google Search dengan header user-agent
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    // Parsing data HTML menggunakan Cheerio
    const $ = load(data);
    const relatedQueries = [];

    $(".dg6jd")
      .slice(0, 8) // Ambil maksimal 8 elemen
      .each((_, element) => {
        relatedQueries.push($(element).text());
      });

    return relatedQueries;
  } catch (error) {
    console.error("Error fetching the related queries:", error);
    throw error;
  }
};

// Fungsi rekursif untuk membangun struktur kata kunci terkait
const buildRelatedKeywords = async (keyword, depth = 1) => {
  if (depth > 3) return []; // Batasi hingga kedalaman maksimal 3 level

  const relatedQueries = await scrapeRelatedQueries(keyword);
  const relatedKeywordObjects = [];

  for (const query of relatedQueries) {
    // Rekursif untuk mendapatkan subquery di level berikutnya
    const subRelatedKeywords = await buildRelatedKeywords(query, depth + 1);
    relatedKeywordObjects.push({
      mainKeyword: query,
      relatedKeyword: subRelatedKeywords,
    });
  }

  return relatedKeywordObjects;
};

// Endpoint API GET untuk mengambil data related queries
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const mainKeyword = searchParams.get("keyword") || "indonesia";

  try {
    const result = {
      mainKeyword,
      relatedKeyword: await buildRelatedKeywords(mainKeyword),
    };

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error fetching related queries" }),
      { status: 500 }
    );
  }
}