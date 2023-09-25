// "use client";
import { SettingsNavPanel } from "@/components/SettingsNavPanel";
import AccountLayout from "@/layouts/AccountLayout";
import { Container } from "@/styles/containers";
import { EditTask } from "@/styles/task";
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
  
  return (
    <AccountLayout>
        <>
        <SettingsNavPanel></SettingsNavPanel>
        <CardBlock>
        <Container>
          <div>avatar
            <EditTask src="../edit-icon.svg"
            alt=""
            width={20}
            height={20}></EditTask>
          </div>
          <div>username<EditTask src="../edit-icon.svg"
            alt=""
            width={20}
            height={20}></EditTask></div>
          <div>useremail<EditTask src="../edit-icon.svg"
            alt=""
            width={20}
            height={20}></EditTask></div>
          <div>
            <div>this week</div>
            <div>all time</div>
          </div>
        </Container>
        </CardBlock>
        </>
    </AccountLayout>
  );
}
