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
    aqi: '--'
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

    // 获取上海实时天气
    const fetchWeather = async () => {
      try {
        // 开发环境使用 Vite 代理，生产环境使用 Cloudflare Worker
        // API Key 由后端从环境变量读取，前端不传
        const apiUrl = '/api/weather?location=101020100'
        
        const response = await fetch(apiUrl)
        console.log('响应状态:', response.status, response.statusText)
        const text = await response.text()
        console.log('原始响应:', text)
        const data = JSON.parse(text)
        if (data.code === '200' || data.code === 200) {
          setWeather({
            temp: `${data.now.temp}°C`,
            condition: data.now.text,
            city: '上海',
            aqi: '--'
          })
        } else {
          console.error('天气API错误码:', data.code, data)
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Date */}
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">今日日期</p>
              <p className="text-lg font-medium text-foreground">{currentDate.date}</p>
              <p className="text-xs text-muted-foreground">{currentDate.weekday}</p>
            </div>

            {/* Lunar */}
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">农历</p>
              <p className="text-lg font-medium text-foreground">{currentDate.lunar}</p>
              <p className="text-xs text-muted-foreground">{currentDate.year}</p>
            </div>

            {/* Weather */}
            <div className="flex items-center gap-3">
              {getWeatherIcon()}
              <div>
                <p className="text-2xl font-medium text-foreground">{weather.temp}</p>
                <p className="text-xs text-muted-foreground">{weather.condition}</p>
              </div>
            </div>

            {/* City & AQI */}
            <div className="space-y-1">
              <p className="text-lg font-medium text-foreground">{weather.city}</p>
              <p className="text-xs text-muted-foreground">空气质量 {weather.aqi}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
