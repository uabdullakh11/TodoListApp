import { AllTime, StatisticContainer, ThisWeek } from "@/styles/containers"
import { api } from "@/utils/axios/axios"
import { useEffect, useState } from "react"

export const UserStatistic = () => {
    const [weekStatistic, setWeekStatistic] = useState<string>("")
    const [allTimeStatistic, setAllTimeStatistic] = useState<string>("")
    useEffect(()=>{
        const getStatistics = async () =>{
            try {
                const res = await api('api/users/statistic')
                setWeekStatistic(res.data.WeekPercant)
                setAllTimeStatistic(res.data.AllTimePercant)
            }
            catch(err){
                console.log(err)
            }
        }
        getStatistics()
    })
    return (
        <StatisticContainer>
            <ThisWeek>
                <span>This week</span>
                {weekStatistic}%
            </ThisWeek>
            <AllTime>
                <span>All time</span>
                {allTimeStatistic}%
            </AllTime>
        </StatisticContainer>
    )
}