interface TimelineItem {
  year: number
  title: string
  company: string
  location: string
  type: string
  current?: boolean
}

interface ExperienceTimelineProps {
  items: TimelineItem[]
}

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-sm font-medium text-gray-500">EXPERIENCE</h2>
      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={index} className="relative flex gap-6">
            <div className="w-12 text-sm text-gray-400 flex-shrink-0">{item.year}</div>
            <div className="flex-1">
              <h3 className="text-gray-900 font-medium">{item.title}</h3>
              <p className="text-sm text-gray-500">
                {item.company} ({item.type})
              </p>
              <p className="text-sm text-gray-500">{item.location}</p>
            </div>
            {item.current && <div className="absolute -left-2 top-1.5 w-2 h-2 rounded-full bg-blue-600" />}
          </div>
        ))}
      </div>
    </div>
  )
}

