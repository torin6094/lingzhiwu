import { useState, useEffect } from 'react'
import { Sun, Cloud, CloudRain } from 'lucide-react'

export function HeroSection() {
  const [currentDate, setCurrentDate] = useState({
    date: '',
    weekday: '',
    lunar: '',
    year: ''
  })
  const [weather, setWeather] = useState({
    temp: '--',
    condition: '晴',
    city: '上海',
    aqi: '--',
    aqiLevel: '--',
    aqiColor: 'bg-gray-100 text-gray-600'
  })

  useEffect(() => {
    const now = new Date()
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')

    setCurrentDate({
      date: `${year} / ${month} / ${day}`,
      weekday: weekdays[now.getDay()],
      lunar: '腊月初五',
      year: '癸卯年 乙丑月 丁酋日'
    })

    // 获取上海实时天气（使用 Open-Meteo 免费 API，无需 Key）
    const fetchWeather = async () => {
      try {
        // Open-Meteo API：上海经纬度 31.23, 121.47
        // 包含天气和空气质量数据
        const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=31.23&longitude=121.47&current_weather=true'
        const aqiUrl = 'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=31.23&longitude=121.47&current=us_aqi'
        
        // 并行获取天气和空气质量
        const [weatherRes, aqiRes] = await Promise.all([
          fetch(apiUrl),
          fetch(aqiUrl)
        ])
        
        const weatherData = await weatherRes.json()
        const aqiData = await aqiRes.json()
        
        if (weatherData.current_weather) {
          const temp = Math.round(weatherData.current_weather.temperature)
          const code = weatherData.current_weather.weathercode
          // WMO Weather interpretation codes
          const conditions: Record<number, string> = {
            0: '晴', 1: '多云', 2: '多云', 3: '阴',
            45: '雾', 48: '雾凇',
            51: '小雨', 53: '中雨', 55: '大雨',
            61: '小雨', 63: '中雨', 65: '大雨',
            71: '小雪', 73: '中雪', 75: '大雪',
            80: '阵雨', 81: '阵雨', 82: '暴雨',
            95: '雷雨', 96: '雷雨', 99: '雷雨'
          }
          // 获取 AQI 并计算等级
          const aqi = aqiData.current?.us_aqi
          let aqiLevel = '--'
          let aqiColor = 'bg-gray-100 text-gray-600'
          
          if (aqi !== undefined && aqi !== null) {
            if (aqi <= 50) {
              aqiLevel = '优'
              aqiColor = 'bg-green-100 text-green-700'
            } else if (aqi <= 100) {
              aqiLevel = '良'
              aqiColor = 'bg-yellow-100 text-yellow-700'
            } else if (aqi <= 150) {
              aqiLevel = '轻度污染'
              aqiColor = 'bg-orange-100 text-orange-700'
            } else if (aqi <= 200) {
              aqiLevel = '中度污染'
              aqiColor = 'bg-red-100 text-red-700'
            } else if (aqi <= 300) {
              aqiLevel = '重度污染'
              aqiColor = 'bg-purple-100 text-purple-700'
            } else {
              aqiLevel = '严重污染'
              aqiColor = 'bg-rose-900 text-white'
            }
          }
          
          setWeather({
            temp: `${temp}°C`,
            condition: conditions[code] || '晴',
            city: '上海',
            aqi: aqi !== undefined && aqi !== null ? String(aqi) : '--',
            aqiLevel,
            aqiColor
          })
        }
      } catch (error) {
        console.error('获取天气失败:', error)
      }
    }
    fetchWeather()
  }, [])

  const getWeatherIcon = () => {
    const condition = weather.condition
    if (condition.includes('晴')) return <Sun className="w-8 h-8 text-amber-500" />
    if (condition.includes('云')) return <Cloud className="w-8 h-8 text-gray-400" />
    if (condition.includes('雨') || condition.includes('雪')) return <CloudRain className="w-8 h-8 text-blue-400" />
    return <Sun className="w-8 h-8 text-amber-500" />
  }

  return (
    <section className="pt-24 pb-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Main */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          {/* Left Content */}
          <div className="flex flex-col items-center justify-center space-y-6 h-full">
            <div className="bg-[#F5F0E8] p-4 rounded-2xl">
              <img
                src="./images/logo-main.png"
                alt="泠之屋"
                className="h-48 lg:h-64 object-contain"
              />
            </div>
            <button className="btn-primary">
              探索更多
            </button>
          </div>

          {/* Right Image */}
          <div className="relative flex items-center">
            <img
              src="./images/hero-cat.jpg"
              alt="两只猫"
              className="w-full h-48 lg:h-64 object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Date & Weather Card */}
        <div className="bg-white rounded-2xl card-shadow p-6 max-w-3xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-start">
            {/* Date */}
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground">今日日期</p>
              <p className="text-base font-medium text-foreground">{currentDate.date}</p>
              <p className="text-xs text-muted-foreground">{currentDate.weekday}</p>
            </div>

            {/* Lunar */}
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground">农历</p>
              <p className="text-base font-medium text-foreground">{currentDate.lunar}</p>
              <p className="text-xs text-muted-foreground">{currentDate.year}</p>
            </div>

            {/* Weather */}
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground">天气</p>
              <div className="flex items-center gap-2">
                {getWeatherIcon()}
                <div>
                  <p className="text-base font-medium text-foreground">{weather.temp}</p>
                  <p className="text-xs text-muted-foreground">{weather.condition}</p>
                </div>
              </div>
            </div>

            {/* City & AQI */}
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground">城市 · 空气</p>
              <p className="text-base font-medium text-foreground">{weather.city}</p>
              <div className="flex items-center gap-1.5">
                <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${weather.aqiColor}`}>
                  {weather.aqiLevel}
                </span>
                <span className="text-xs text-muted-foreground">{weather.aqi}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
