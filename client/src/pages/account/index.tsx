import { AccountCard } from "@/components/UserComponents/AccountCard/AccountCard";
import { SettingsNavPanel } from "@/components/UserComponents/SettingNavPanel/SettingsNavPanel";
import AccountLayout from "@/layouts/AccountLayout";

export default function Account() {
  return (
    <AccountLayout>
      <>
        <SettingsNavPanel />
        <AccountCard />
      </>
    </AccountLayout>
  );
}
