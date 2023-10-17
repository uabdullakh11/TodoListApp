import { AccountCard } from "@/components/UserComponents/AccountCard/AccountCard";
import { SettingsNavPanel } from "@/components/UserComponents/SettingNavPanel/SettingsNavPanel";
import AccountLayout from "@/layouts/AccountLayout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Account() {
  return (
    <AccountLayout>
      <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
        <SettingsNavPanel />
        <AccountCard />
      </>
    </AccountLayout>
  );
}
