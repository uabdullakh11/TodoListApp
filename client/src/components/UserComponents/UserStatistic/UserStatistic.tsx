import { getUserStatistic } from "@/utils/services/user.service"
import { useEffect, useState } from "react"
import { StatisticCircles, Circle, CircleBg, CircularChart, Percantage, SingleChart, StatisticContainer } from "./userStatisticStyles"

export const UserStatistic = () => {
    const [weekStatistic, setWeekStatistic] = useState<string>("")
    const [allTimeStatistic, setAllTimeStatistic] = useState<string>("")
    useEffect(() => {
        const getStatistics = async () => {
            try {
                const { WeekPercant, AllTimePercant } = await getUserStatistic();
                setWeekStatistic(WeekPercant)
                setAllTimeStatistic(AllTimePercant)
            }
            catch (err) {
                console.log(err)
            }
        }
        getStatistics()
    })
    return (
        <StatisticContainer>
            <StatisticCircles>
                <span>This week</span>
                <SingleChart>
                    <CircularChart viewBox="0 0 36 36">
                        <CircleBg
                            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <Circle
                            strokeDasharray={`${weekStatistic}, 100`}
                            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <Percantage x="18" y="20.35">{weekStatistic}%</Percantage>
                    </CircularChart>
                </SingleChart>
            </StatisticCircles>
            <StatisticCircles>
                <span>All time</span>
                <SingleChart>
                    <CircularChart viewBox="0 0 36 36">
                        <CircleBg
                            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <Circle
                            strokeDasharray={`${allTimeStatistic}, 100`}
                            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <Percantage x="18" y="20.35">{allTimeStatistic}%</Percantage>
                    </CircularChart>
                </SingleChart>
            </StatisticCircles>
        </StatisticContainer>
    )
}