import { onRequest as __api_articles_js_onRequest } from "C:\\Users\\Jeffrey\\WorkBuddy\\20260430095335\\lingzhiwu\\functions\\api\\articles.js"
import { onRequest as __api_weather_js_onRequest } from "C:\\Users\\Jeffrey\\WorkBuddy\\20260430095335\\lingzhiwu\\functions\\api\\weather.js"

export const routes = [
    {
      routePath: "/api/articles",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_articles_js_onRequest],
    },
  {
      routePath: "/api/weather",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_weather_js_onRequest],
    },
  ]