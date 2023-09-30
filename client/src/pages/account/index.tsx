import { AuthForm } from "@/components/AuthForm";
import { ChangePassForm } from "@/components/ChangePassForm";
import { SettingsNavPanel } from "@/components/SettingsNavPanel";
import { UserInfo } from "@/components/UserInfo";
import AccountLayout from "@/layouts/AccountLayout";
import { api } from "@/utils/axios/axios";
import { useEffect, useState } from "react";
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
  const [userName, setUserName] = useState<string>("username")
  const [userEmail, setEmail] = useState<string>("userEmail")
  const [linkToAvatar, setLinkToAvatar] = useState<string>("../person-logo.svg")
  const [weekStatistic, setWeekStatistic] = useState<string>("")
  const [allTimeStatistic, setAllTimeStatistic] = useState<string>("")

  const [isProfile, setIsProfile] = useState<boolean>(true)

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await api('/api/users/')
        setUserName(res.data[0].login)
        setEmail(res.data[0].email)
        setLinkToAvatar(res.data[0].avatarUrl)
      }
      catch (err) {
        console.log(err)
      }
    }
    getUserData()
  }, [userName, userEmail]);

  const handleClick = (value: boolean) => {
    setIsProfile(value)
  }
  return (
    <AccountLayout>
      <>
        <SettingsNavPanel handleClick={handleClick}></SettingsNavPanel>
        <CardBlock>
          {isProfile ?
            <UserInfo userName={userName} userEmail={userEmail} linkToAvatar={linkToAvatar} weekStatistic={weekStatistic} allTimeStatistic={allTimeStatistic} />
            :
            <ChangePassForm />
          }
        </CardBlock>
      </>
    </AccountLayout>
  );
}
