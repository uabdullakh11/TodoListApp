import { useContext  } from "react"
import { StatisticCircles, Circle, CircleBg, CircularChart, Percantage, SingleChart, StatisticContainer } from "./userStatisticStyles"
import { AccountContext } from "@/context/AccountContext";
import { AccountContextType } from "@/types/types";

export const UserStatistic = () => {
  const { userStatisctic } = useContext(AccountContext) as AccountContextType;

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
                            strokeDasharray={`${userStatisctic.WeekPercant}, 100`}
                            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <Percantage x="18" y="20.35">{userStatisctic.WeekPercant}%</Percantage>
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
                            strokeDasharray={`${userStatisctic.AllTimePercant}, 100`}
                            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <Percantage x="18" y="20.35">{userStatisctic.AllTimePercant}%</Percantage>
                    </CircularChart>
                </SingleChart>
            </StatisticCircles>
        </StatisticContainer>
    )
}