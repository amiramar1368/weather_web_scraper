import axios from "axios";

import { getWeatherByURL } from "../services/scraper.js";

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.timeout = process.env.AXIOS_TIMEOUT

export class Weather {
  static renderHomePage(req, res) {
    res.render("index");
  }

  static async fetchDate(req, res) {
    const {city} = req.query;
    let url = "";
    if (city === "neyshabur") {
      url = "/701-پیش-بینی-وضع-هوای-نیشابور.html?id=184";
    } else if (city === "mashhad") {
      url = "/701-پیش-بینی-وضع-هوای-مشهد.html?id=17555";
    } else if (city === "yazd") {
      url = "/701-پیش-بینی-وضع-هوای-یزد.html?id=17546";
    } else if (city === "tehran") {
      url = "/701-پیش-بینی-وضع-هوای-تهران.html?id=17561";
    } else {
      return res.json({ success: false, message: "Not Found" });
    }
    const data = await getWeatherByURL(url);
    return res.json( data );
  }
}
