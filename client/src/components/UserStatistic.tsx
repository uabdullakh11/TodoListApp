import { AllTime, StatisticContainer, ThisWeek } from "@/styles/containers"
import { useState } from "react"

export const UserStatistic = () => {
    const [weekStatistic, setWeekStatistic] = useState<string>("")
    const [allTimeStatistic, setAllTimeStatistic] = useState<string>("")
    return (
        <StatisticContainer>
            <ThisWeek>
                <span>This week</span>
            </ThisWeek>
            <AllTime>
                <span>All time</span>
            </AllTime>
        </StatisticContainer>
    )
}