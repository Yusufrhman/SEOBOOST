import IndonesiaMap from "@/components/chart/indo-map";
import NetworkGraph from "@/components/chart/network-graph";

export default async function Page({ params }) {
  const keyword = decodeURIComponent(params.keyword);
  let relatedKeyword = await fetch(
    `http://localhost:3000/api/relatedQueries?keyword=${keyword}`
  );
  let keywordData = await relatedKeyword.json();
  let getGeoMapData = await fetch(
    `http://localhost:3000/api/googletrend/interest-by-region?keyword=${keyword}`
  );
  let geoMapDataFull = await getGeoMapData.json();
  let geoMapData = geoMapDataFull.default.geoMapData;

  function convertToNodePairs(data, parent = null, pairs = []) {
    if (parent) {
      pairs.push([parent, data.mainKeyword]);
    }
    data.relatedKeyword.forEach((child) =>
      convertToNodePairs(child, data.mainKeyword, pairs)
    );
    return pairs;
  }

  // const keywordData = {
  //   mainKeyword: "sistem informasi",
  //   relatedKeyword: [
  //     {
  //       mainKeyword: "Sistem Informasi belajar apa",
  //       relatedKeyword: [
  //         {
  //           mainKeyword: "Sistem Informasi kerja apa",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Pekerjaan lulusan Sistem informasi dan Gajinya",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Lowongan kerja jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Apakah lulusan sistem informasi bisa kerja di bank",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi sulit",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi belajar apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi gelarnya apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Apakah jurusan Sistem Informasi bisa bekerja di rumah sakit",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi sulit",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi kerja apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Universitas yang ada Jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi belajar apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan kuliah IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan kuliah IPA",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Contoh karangan alasan memilih jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gelar Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Sistem Informasi gelarnya apa",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Sistem Informasi belajar apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Penulisan gelar Sarjana Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gelar Sistem Informasi S2",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sarjana Sistem Informasi kerja apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gelar Sistem Informasi UT",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gelar Informatika",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Penulisan gelar Sarjana Teknik Informatika",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Materi sistem informasi",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Materi sistem informasi PDF",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Materi Sistem Informasi semester 1",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Fungsi sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Pengertian sistem informasi menurut para ahli",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi belajar apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Pengertian sistem informasi dan Contohnya",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Komponen sistem informasi",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Sistem Informasi Fakultas apa",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Sistem Informasi Fakultas apa di UT",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi fakultas apa di UNRI",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi sulit",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi fakultas apa di BSI",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi fakultas apa di unesa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi belajar apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gelar Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Jurusan Sistem Informasi UT",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Mata Kuliah Sistem Informasi UT",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi UT Akreditasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi UT biaya",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jumlah sks Sistem Informasi UT",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mata Kuliah Sistem Informasi UT semester 1",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan UT",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gelar Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi Akademik UT",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Mata Kuliah Sistem Informasi Semester 1",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Mata Kuliah Sistem Informasi semester 1 UT",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi sulit",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mata kuliah Sistem Informasi semester 2",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mata Kuliah Sistem Informasi UT",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Materi kuliah sistem informasi PDF",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mata Kuliah Sistem Informasi Semester 3",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mata kuliah Sistem Informasi UI",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mata Kuliah Sistem Informasi Semester 5",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Perbedaan Sistem Informasi dan Teknik Informatika",
  //           relatedKeyword: [
  //             {
  //               mainKeyword:
  //                 "Perbedaan prospek kerja Sistem Informasi dan Teknik Informatika",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Perbedaan Sistem Informasi dan teknologi Informasi dan contohnya",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Lebih susah Teknik Informatika atau Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Perbedaan Sistem Informasi dan Sistem Komputer",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Peluang kerja Teknik Informatika dan sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Perbedaan Teknologi Informasi dan Teknik Informatika",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Apa perbedaan antara sistem Informatika dan Teknik Informatika buatlah dalam bentuk tabel",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       mainKeyword: "Jurusan Sistem Informasi",
  //       relatedKeyword: [
  //         {
  //           mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi sulit",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi kerja apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi belajar apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Universitas yang ada Jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gelar Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi UI ipa atau IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan IPA atau IPS yang banyak peluang kerja",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan kuliah IPA",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Universitas yang ada Jurusan Sistem Informasi",
  //           relatedKeyword: [
  //             {
  //               mainKeyword:
  //                 "Universitas dengan Jurusan Sistem Informasi akreditasi A",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Universitas Negeri yang ada Jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Universitas yang ada jurusan Sistem Informasi di Bandung",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Universitas yang ada Jurusan Sistem Informasi di Jakarta",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Universitas dengan Jurusan Sistem Informasi Terbaik di Indonesia",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Universitas Swasta dengan Jurusan Sistem Informasi Terbaik",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Universitas Negeri jurusan Sistem Informasi di Jogja",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Apakah jurusan Sistem Informasi sulit",
  //           relatedKeyword: [
  //             {
  //               mainKeyword:
  //                 "Apakah jurusan Sistem Informasi sulit dapat kerja",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh soal Tes masuk jurusan sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi banyak hitungan",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Fakta jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Apakah jurusan Sistem Informasi harus pintar matematika",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Apakah jurusan sistem informasi banyak peluang kerja",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mata Kuliah Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Jurusan Sistem Informasi UT",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Mata Kuliah Sistem Informasi UT",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi UT Akreditasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi UT biaya",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jumlah sks Sistem Informasi UT",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mata Kuliah Sistem Informasi UT semester 1",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan UT",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gelar Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi Akademik UT",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Jurusan Sistem Informasi kerja apa",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Pekerjaan lulusan Sistem informasi dan Gajinya",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi sulit",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Apakah lulusan sistem informasi bisa kerja di bank",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Lowongan kerja jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi belajar apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Apakah jurusan Sistem Informasi bisa bekerja di rumah sakit",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi UT",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Jurusan Sistem Informasi belajar apa",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi sulit",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi kerja apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi Fakultas apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi UT",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gelar Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Universitas yang ada Jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mata Kuliah Sistem Informasi Semester 1",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Jurusan Sistem Informasi Terbaik di Indonesia",
  //           relatedKeyword: [
  //             {
  //               mainKeyword:
  //                 "Universitas dengan Jurusan Sistem Informasi akreditasi A",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi Terbaik di Indonesia 2023",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi Terbaik di Indonesia 2024",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Universitas Swasta dengan Jurusan Sistem Informasi Terbaik",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Universitas yang ada Jurusan Sistem Informasi di Jakarta",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Universitas yang ada jurusan Sistem Informasi di Bandung",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Universitas Negeri yang ada Jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Gelar Jurusan Sistem Informasi",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Penulisan gelar Sarjana Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gelar Sistem Informasi UT",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gelar Sistem Informasi S2",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sarjana Sistem Informasi kerja apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gelar Sarjana Teknik Informatika",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Penulisan gelar Sarjana Teknik Informatika",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi belajar apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Universitas dengan Jurusan Sistem Informasi akreditasi A",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       mainKeyword: "Sistem Informasi kerja apa",
  //       relatedKeyword: [
  //         {
  //           mainKeyword: "Pekerjaan lulusan Sistem informasi dan Gajinya",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Lowongan kerja jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Apakah lulusan sistem informasi bisa kerja di bank",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gaji Sistem Informasi S1",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Apakah lulusan Sistem Informasi bisa jadi PNS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi sulit",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Lulusan Sistem Informasi kerja apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi belajar apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Apakah jurusan Sistem Informasi bisa bekerja di rumah sakit",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Lowongan kerja jurusan Sistem Informasi",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Lowongan kerja Sistem Informasi BUMN",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Lowongan kerja Sistem Informasi Fresh Graduate",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Apakah lulusan sistem informasi bisa kerja di bank",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi kerja apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Lowongan kerja D3 Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Loker Sistem Informasi 2024",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gaji lulusan Sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Apakah jurusan Sistem Informasi bisa bekerja di rumah sakit",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Apakah lulusan sistem informasi bisa kerja di bank",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Pekerjaan lulusan Sistem informasi dan Gajinya",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Apakah lulusan Sistem Informasi bisa jadi PNS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Lulusan S1 sistem informasi bisa kerja dimana",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Apakah jurusan Sistem Informasi bisa bekerja di rumah sakit",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gaji lulusan Sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi sulit",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Lulusan sistem Informasi gelar",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Lulusan Teknologi Informasi bisa kerja dimana",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Apakah jurusan Sistem Informasi sulit",
  //           relatedKeyword: [
  //             {
  //               mainKeyword:
  //                 "Apakah jurusan Sistem Informasi sulit dapat kerja",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh soal Tes masuk jurusan sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi banyak hitungan",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Fakta jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Apakah jurusan Sistem Informasi harus pintar matematika",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Apakah jurusan sistem informasi banyak peluang kerja",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mata Kuliah Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Sistem Informasi belajar apa",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Sistem Informasi kerja apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi gelarnya apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Materi sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi Fakultas apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi UT",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mata Kuliah Sistem Informasi Semester 1",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Perbedaan Sistem Informasi dan Teknik Informatika",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Sistem Informasi gelarnya apa",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Sistem Informasi belajar apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Penulisan gelar Sarjana Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gelar Sistem Informasi S2",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sarjana Sistem Informasi kerja apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gelar Sistem Informasi UT",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gelar Informatika",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Penulisan gelar Sarjana Teknik Informatika",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword:
  //             "Apakah jurusan Sistem Informasi bisa bekerja di rumah sakit",
  //           relatedKeyword: [],
  //         },
  //         {
  //           mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi sulit",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi kerja apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi belajar apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Universitas yang ada Jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gelar Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi UI ipa atau IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan IPA atau IPS yang banyak peluang kerja",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan kuliah IPA",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
  //       relatedKeyword: [
  //         {
  //           mainKeyword: "Apakah jurusan Sistem Informasi sulit",
  //           relatedKeyword: [
  //             {
  //               mainKeyword:
  //                 "Apakah jurusan Sistem Informasi sulit dapat kerja",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh soal Tes masuk jurusan sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi banyak hitungan",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Fakta jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Apakah jurusan Sistem Informasi harus pintar matematika",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Apakah jurusan sistem informasi banyak peluang kerja",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mata Kuliah Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Jurusan Sistem Informasi kerja apa",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Pekerjaan lulusan Sistem informasi dan Gajinya",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi sulit",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Apakah lulusan sistem informasi bisa kerja di bank",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Lowongan kerja jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi belajar apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Apakah jurusan Sistem Informasi bisa bekerja di rumah sakit",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi UT",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Jurusan Sistem Informasi belajar apa",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi sulit",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi kerja apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi Fakultas apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi UT",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gelar Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Universitas yang ada Jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mata Kuliah Sistem Informasi Semester 1",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Universitas yang ada Jurusan Sistem Informasi",
  //           relatedKeyword: [
  //             {
  //               mainKeyword:
  //                 "Universitas dengan Jurusan Sistem Informasi akreditasi A",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Universitas Negeri yang ada Jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Universitas yang ada jurusan Sistem Informasi di Bandung",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Universitas yang ada Jurusan Sistem Informasi di Jakarta",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Universitas dengan Jurusan Sistem Informasi Terbaik di Indonesia",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Universitas Swasta dengan Jurusan Sistem Informasi Terbaik",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Universitas Negeri jurusan Sistem Informasi di Jogja",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Gelar Sistem Informasi",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Gelar Sistem Informasi UT",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gelar Sistem Informasi S2",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Penulisan gelar Sarjana Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gelar Sarjana Informatika",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gelar Sistem Informasi Gunadarma",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi belajar apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sarjana Sistem Informasi kerja apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Penulisan gelar Sarjana Teknik Informatika",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Sistem Informasi UI ipa atau IPS",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Sistem Informasi jurusan IPA atau IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan IPA UI",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi sulit",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan IPA di UI yang sepi peminat",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "DKV UI soshum atau saintek",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Kriminologi UI IPA atau IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan IPS di UI",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi belajar apa",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Jurusan IPA atau IPS yang banyak peluang kerja",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Pekerjaan jurusan IPS yang gajinya besar",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Jurusan kuliah IPS yang jarang Diminati tapi menjanjikan",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan kuliah IPA",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Kuliah jurusan IPS yang menjamin masa depan",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Lebih mudah jurusan IPA atau IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan IPS yang tidak menghitung",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan IPA SMA bisa jadi apa saja",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan kuliah IPS untuk Wanita",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Jurusan kuliah IPA",
  //           relatedKeyword: [
  //             {
  //               mainKeyword:
  //                 "Jurusan kuliah IPA yang Menjamin masa depan untuk perempuan",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan kuliah IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "jurusan kuliah ipa yang menjamin masa depan untuk laki-laki",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan kuliah IPA yang jarang Diminati",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Jurusan kuliah untuk anak IPA yang peluang kerjanya besar",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan IPA SMA",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Pekerjaan jurusan IPA yang gajinya besar",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Pekerjaan jurusan IPA dan IPS",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       mainKeyword: "Contoh sistem informasi",
  //       relatedKeyword: [
  //         {
  //           mainKeyword: "10 contoh sistem informasi",
  //           relatedKeyword: [
  //             {
  //               mainKeyword:
  //                 "contoh sistem informasi dalam kehidupan sehari-hari",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "5 contoh sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh sistem informasi sederhana",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh aplikasi sistem Informasi manajemen",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "10 contoh informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh sistem informasi BERBASIS WEB",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Contoh sistem informasi manajemen dalam perusahaan",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "contoh sistem dalam kehidupan sehari-hari",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "contoh sistem informasi dalam kehidupan sehari-hari",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "10 contoh sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "contoh sistem dalam kehidupan sehari-hari",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "contoh penerapan teknologi informasi dalam kehidupan sehari-hari",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh sistem informasi sederhana",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh aplikasi sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh sistem informasi BERBASIS WEB",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh sistem informasi manajemen",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Contoh aplikasi sistem informasi manajemen pada perusahaan",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Contoh sistem informasi sederhana",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "10 contoh sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh sistem informasi BERBASIS WEB",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh aplikasi sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "5 contoh Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh sistem informasi manajemen",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "5 contoh sistem",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "contoh sistem dalam kehidupan sehari-hari",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "contoh penerapan teknologi informasi dalam kehidupan sehari-hari",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Contoh sistem informasi BERBASIS WEB",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Contoh skripsi Sistem Informasi BERBASIS WEB",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Contoh proposal skripsi sistem informasi BERBASIS WEB",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Judul Skripsi Sistem Informasi BERBASIS WEB",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "contoh sistem informasi dalam kehidupan sehari-hari",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Judul Skripsi Teknik Informatika Berbasis web yang Mudah",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Judul Skripsi Sistem Informasi di Kantor Desa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh skripsi Sistem Informasi S1 PDF",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Judul Skripsi Sistem Informasi yang mudah",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "5 contoh sistem informasi",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "10 contoh sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "5 contoh Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "contoh sistem informasi dalam kehidupan sehari-hari",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "10 contoh informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh sistem informasi sederhana",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "contoh sistem informasi manajemen dalam kehidupan sehari-hari",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh sistem informasi BERBASIS WEB",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh informasi yang lengkap",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Contoh sistem informasi manajemen",
  //           relatedKeyword: [
  //             {
  //               mainKeyword:
  //                 "contoh sistem informasi manajemen dalam kehidupan sehari-hari",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Contoh Sistem Informasi Manajemen dalam organisasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh aplikasi sistem Informasi manajemen",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh sistem Informasi Manajemen di sekolah",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Contoh sistem informasi manajemen perusahaan jasa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Contoh PENERAPAN sistem informasi manajemen pada perusahaan",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Contoh sistem informasi manajemen dalam PENDIDIKAN",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "10 contoh sistem informasi",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword:
  //             "contoh sistem informasi manajemen dalam kehidupan sehari-hari",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "10 contoh sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "contoh sistem dalam kehidupan sehari-hari",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Contoh penerapan teknologi Informasi dalam kehidupan sehari hari",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh sistem informasi sederhana",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh aplikasi sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "contoh informasi dalam kehidupan sehari-hari",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh aplikasi sistem Informasi manajemen",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Contoh aplikasi sistem informasi manajemen pada perusahaan",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Contoh aplikasi sistem informasi",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "10 contoh sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh aplikasi sistem Informasi manajemen",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "berikan contoh aplikasi sistem informasi yang anda ketahui, minimal 3 contoh aplikasi!",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Contoh aplikasi sistem informasi manajemen pada perusahaan",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Contoh sistem informasi dalam kehidupan sehari hari",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh sistem informasi BERBASIS WEB",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Contoh aplikasi sistem informasi yang tidak berhubungan dengan dunia bisnis",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "contoh sistem informasi manajemen dalam kehidupan sehari-hari",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       mainKeyword: "Apakah jurusan Sistem Informasi sulit",
  //       relatedKeyword: [
  //         {
  //           mainKeyword: "Apakah jurusan Sistem Informasi sulit dapat kerja",
  //           relatedKeyword: [
  //             {
  //               mainKeyword:
  //                 "Lebih sulit Sistem Informasi atau Teknik Informatika",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh soal Tes masuk jurusan sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi banyak hitungan",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Fakta jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Apakah jurusan Sistem Informasi harus pintar matematika",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Apakah jurusan sistem informasi banyak peluang kerja",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Kelebihan dan kekurangan Jurusan sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi Nganggur",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Contoh soal Tes masuk jurusan sistem Informasi",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Soal Sistem Informasi Manajemen",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Soal Sistem Informasi Manajemen dan jawabannya",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Soal Pilihan Ganda sistem informasi dan jawabannya",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "PERTANYAAN tentang sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Soal kasus sistem informasi Manajemen",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Soal olimpiade Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Pertanyaan dan jawaban tentang analisis sistem",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Soal Arsitektur sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Apakah jurusan Sistem Informasi banyak hitungan",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi sulit",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi jurusan IPA atau IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Kesulitan jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Kelebihan dan kekurangan Jurusan sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mata Kuliah Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Fakta jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Apakah jurusan Sistem Informasi harus bisa coding",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi Nganggur",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Fakta jurusan Sistem Informasi",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi sulit",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Prospek kerja Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi belajar apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi UT",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Universitas yang ada Jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gelar Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Materi sistem informasi",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword:
  //             "Apakah jurusan Sistem Informasi harus pintar matematika",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi sulit",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan yang tidak ada matematika",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Apakah jurusan Sistem Informasi harus bisa coding",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi banyak hitungan",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Soft skill Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Kesulitan jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Matematika Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Kelebihan dan kekurangan Jurusan sistem informasi",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Apakah jurusan sistem informasi banyak peluang kerja",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi sulit",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Pekerjaan lulusan Sistem informasi dan Gajinya",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Lowongan kerja jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Apakah jurusan Sistem Informasi bisa bekerja di rumah sakit",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi belajar apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi bisa jadi guru",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi UT",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi sulit",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi kerja apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi belajar apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Universitas yang ada Jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gelar Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi UI ipa atau IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan IPA atau IPS yang banyak peluang kerja",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan kuliah IPA",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Mata Kuliah Sistem Informasi",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Mata Kuliah Sistem Informasi Semester 1",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mata kuliah Sistem Informasi UI",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi sulit",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mata Kuliah Sistem Informasi UT",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mata kuliah Sistem Informasi Telkom University",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Materi kuliah sistem informasi PDF",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mata kuliah Sistem Informasi BSI",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       mainKeyword: "Sistem Informasi Fakultas apa",
  //       relatedKeyword: [
  //         {
  //           mainKeyword: "Sistem Informasi Fakultas apa di UT",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Mata Kuliah Sistem Informasi UT",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi UT Akreditasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi UT biaya",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan yang ada di Universitas Terbuka",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Tagline Universitas Terbuka adalah",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jumlah sks Sistem Informasi UT",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Berapa Fakultas di UT",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan S1 di UT apa saja",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Sistem Informasi fakultas apa di UNRI",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Sistem Informasi UNRI Akreditasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mata kuliah sistem Informasi UNRI",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan di UNRI",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi Akademik UNRI",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi uir",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Dosen Sistem Informasi UNRI",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Ilmu Komputer UNRI",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi admisi unri",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Apakah jurusan Sistem Informasi sulit",
  //           relatedKeyword: [
  //             {
  //               mainKeyword:
  //                 "Apakah jurusan Sistem Informasi sulit dapat kerja",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh soal Tes masuk jurusan sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi banyak hitungan",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Fakta jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Apakah jurusan Sistem Informasi harus pintar matematika",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Apakah jurusan sistem informasi banyak peluang kerja",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mata Kuliah Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi sulit",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi kerja apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi belajar apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Universitas yang ada Jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gelar Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi UI ipa atau IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan IPA atau IPS yang banyak peluang kerja",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan kuliah IPA",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Sistem Informasi fakultas apa di BSI",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Mata kuliah Sistem Informasi BSI",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi BSI Akreditasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Universitas BSI Jakarta",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Universitas BSI dimana",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan di BSI Depok",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan di BSI D3",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan BSI Bekasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Kode Mata Kuliah BSI",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Sistem Informasi fakultas apa di unesa",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Sistem Informasi UNESA Akreditasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mitra Program Studi Sistem Informasi UNESA",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Profil lulusan Sistem Informasi Unesa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Keunggulan prodi Sistem Informasi Unesa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Matkul Sistem Informasi Unesa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Dosen Sistem Informasi UNESA",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan di UNESA",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Pendidikan Teknologi Informasi UNESA",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Sistem Informasi belajar apa",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Sistem Informasi kerja apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi gelarnya apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Materi sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi Fakultas apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi UT",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mata Kuliah Sistem Informasi Semester 1",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Perbedaan Sistem Informasi dan Teknik Informatika",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Gelar Sistem Informasi",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Gelar Sistem Informasi UT",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gelar Sistem Informasi S2",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Penulisan gelar Sarjana Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gelar Sarjana Informatika",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Gelar Sistem Informasi Gunadarma",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi belajar apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sarjana Sistem Informasi kerja apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Penulisan gelar Sarjana Teknik Informatika",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       mainKeyword: "Materi sistem informasi",
  //       relatedKeyword: [
  //         {
  //           mainKeyword: "Materi sistem informasi PDF",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Buku sistem informasi PDF",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Konsep Dasar sistem informasi PDF",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Makalah Konsep Dasar sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Buku PENGANTAR Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurnal Konsep sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Ebook Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Konsep Dasar sistem informasi Manajemen",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Konsep Sistem Informasi PPT",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Contoh sistem informasi",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "10 contoh sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "contoh sistem informasi dalam kehidupan sehari-hari",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh sistem informasi sederhana",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh sistem informasi BERBASIS WEB",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh sistem informasi manajemen",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "5 contoh sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "contoh sistem informasi manajemen dalam kehidupan sehari-hari",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh aplikasi sistem informasi",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Materi Sistem Informasi semester 1",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Materi kuliah sistem informasi PDF",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mata Kuliah Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Apakah jurusan Sistem Informasi sulit",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mata Kuliah Sistem Informasi UT",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mata Kuliah Sistem Informasi semester 1 UT",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Materi Sistem Informasi Teknik Informatika",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi Fakultas apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mata Kuliah Sistem Informasi Semester 3",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Fungsi sistem informasi",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Fungsi sistem informasi manajemen",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Fungsi sistem informasi menurut para ahli",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Komponen sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jenis-jenis Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Pengertian sistem informasi menurut para ahli",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Fungsi sistem informasi akuntansi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Apa itu Jurusan Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Pengertian sistem informasi menurut para ahli",
  //           relatedKeyword: [
  //             {
  //               mainKeyword:
  //                 "Pengertian Sistem informasi menurut para ahli dan daftar PUSTAKA",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Pengertian sistem informasi menurut para ahli terbaru",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Pengertian informasi menurut para ahli",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Pengertian sistem informasi menurut para ahli 5 tahun terakhir",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem informasi menurut para ahli jurnal",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Pengertian informasi menurut para ahli jurnal",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Fungsi sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Materi sistem informasi",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Sistem Informasi belajar apa",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "Sistem Informasi kerja apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi gelarnya apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Materi sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Sistem Informasi Fakultas apa",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurusan Sistem Informasi UT",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Mata Kuliah Sistem Informasi Semester 1",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword:
  //                 "Perbedaan Sistem Informasi dan Teknik Informatika",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Pengertian sistem informasi dan Contohnya",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "6 komponen sistem informasi dan Contohnya",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Fungsi sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Contoh komponen sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Pengertian sistem informasi menurut para ahli",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jenis-jenis Sistem Informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Tujuan sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Pengertian sistem informasi manajemen",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Manfaat sistem informasi manajemen",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //         {
  //           mainKeyword: "Komponen sistem informasi",
  //           relatedKeyword: [
  //             {
  //               mainKeyword: "6 komponen sistem informasi dan Contohnya",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Komponen sistem informasi manajemen",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "6 komponen sistem informasi Manajemen",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Komponen sistem informasi PDF",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "5 komponen sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Komponen sistem informasi menurut para ahli",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Jurnal komponen sistem informasi",
  //               relatedKeyword: [],
  //             },
  //             {
  //               mainKeyword: "Komponen sistem adalah",
  //               relatedKeyword: [],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // };

  const dataForNetworkGraph = convertToNodePairs(keywordData);

  return (
    <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-auto">
      <div className=" w-full flex flex-col gap-10">
        <NetworkGraph
          data={dataForNetworkGraph}
          title={keywordData.mainKeyword}
        />
        <section className="h-fit">
          <section className="flex gap-8 items-center justify-between h-[30rem] bg-[#2b2b2b] p-8 rounded-lg">
            <IndonesiaMap geoMapData={geoMapData} />
            <div className="w-[95%] h-full">
              <h2 className="text-custom-teal text-xl text-center font-bold pb-4">
                Minat Menurut Sub-Wilayah
              </h2>
              <div className="h-[24rem] overflow-y-auto">
                <table className="w-full border-collapse text-white">
                  <thead>
                    <tr className="text-left font-bold border-b border-gray-600">
                      <th className="p-3">Urutan Ke-</th>
                      <th className="p-3">Wilayah</th>
                      <th className="p-3">Jumlah Pencarian</th>
                    </tr>
                  </thead>
                  <tbody>
                    {geoMapData.map((item, index) => {
                      return (
                        <tr id={item.id} key={item.id} className="border-b border-gray-600">
                          <td className="p-3">{index + 1}</td>
                          <td className="p-3">{item.geoName}</td>
                          <td className="p-3">{item.value}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
