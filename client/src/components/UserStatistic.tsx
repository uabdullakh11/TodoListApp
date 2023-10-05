import { AllTime, StatisticContainer, ThisWeek } from "@/styles/containers"
import { getUserStatistic } from "@/utils/services/user.service"
import { useEffect, useState } from "react"

export const UserStatistic = () => {
    const [weekStatistic, setWeekStatistic] = useState<string>("")
    const [allTimeStatistic, setAllTimeStatistic] = useState<string>("")
    useEffect(()=>{
        const getStatistics = async () =>{
            try {
                const {WeekPercant,AllTimePercant } = await getUserStatistic();
                setWeekStatistic(WeekPercant)
                setAllTimeStatistic(AllTimePercant)
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