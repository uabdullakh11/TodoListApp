import { ChangePassForm } from "@/components/UserComponents/ChangePassForm/ChangePassForm";
import { SettingsNavPanel } from "@/components/UserComponents/SettingNavPanel/SettingsNavPanel";
import { UserAvatar } from "@/components/UserComponents/UserAvatar/UserAvatar";
import { UserInfo } from "@/components/UserComponents/UserInfo/UserInfo";
import { UserStatistic } from "@/components/UserComponents/UserStatistic/UserStatistic";
import AccountLayout from "@/layouts/AccountLayout";
import { ProfileContainer } from "@/styles/containers";
import { useState } from "react";
import { styled } from "styled-components";

const CardBlock = styled.div`
  background-color: #f4f4f4;
  border-radius: 10px;
  width: 466px;
  @media (max-width: 689px) {
    width: 100%;
  }
`;

export default function Account() {
  const [isProfile, setIsProfile] = useState<boolean>(true)

  const handleClick = (value: boolean) => {
    setIsProfile(value)
  }

  return (
    <AccountLayout>
      <>
        <SettingsNavPanel handleClick={handleClick}></SettingsNavPanel>
        <CardBlock>
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
      </>
    </AccountLayout>
  );
}
