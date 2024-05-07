import axios from "axios";
import * as cheerio from "cheerio";

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.timeout = process.env.AXIOS_TIMEOUT;

export async function getWeatherByURL(url) {
  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);
    const captions = $("#divCurrentWeather table tbody tr:first td:last div:last .wet_s_wblk_caption");
    const data = $("#divCurrentWeather table tbody tr:first td:last div:last .wet_s_wblk_data");
    const data2 = $("#divCurrentWeather table tbody tr:first td:last div:last .wet_s_wblk_data2");
    let captionsArray = [];
    let dataArray = [];
    captions.each((index, element) => {
      const cap = $(element).not(".wet_s_wblk_caption_detail").text();
      if (cap.length) {
        captionsArray.push(cap);
      }
    });
    data.each((index, element) => {
      const data = $(element).not(".wet_s_wblk_data_detail").text();
      if (data.length) {
        dataArray.push(data);
      }
    });
    data2.each((index, element) => {
      const data = $(element).not(".wet_s_wblk_data_detail").text();
      if (data.length) {
        dataArray.push(data);
      }
    });
    const finalData = {};
    for (let i = 0; i < captionsArray.length; i++) {
      finalData[captionsArray[i]] = dataArray[i];
    }
    return { success: true, data: finalData };
  } catch (err) {
    return { success: false, data: { message: "an error accured" } };
  }
}
