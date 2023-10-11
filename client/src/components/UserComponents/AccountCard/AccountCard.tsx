import { ChangePassForm } from "@/components/UserComponents/ChangePassForm/ChangePassForm";
import { UserAvatar } from "@/components/UserComponents/UserAvatar/UserAvatar";
import { UserInfo } from "@/components/UserComponents/UserInfo/UserInfo";
import { UserStatistic } from "@/components/UserComponents/UserStatistic/UserStatistic";
import { AccountContext } from "@/context/AccountContext";
import { CardBlock, ProfileContainer } from "@/styles/containers";
import { AccountContextType } from "@/types/types";
import { useContext} from "react";

export const AccountCard = () => {
  const {isProfile} = useContext(AccountContext) as AccountContextType;

  return (
        <CardBlock  $accountCard={true}>
          {isProfile ?
            <>
              <ProfileContainer>
                <UserAvatar />
                <UserInfo />
                <UserStatistic />
              </ProfileContainer>
            </>
            :
            <ChangePassForm />
          }
        </CardBlock>
  );
}
