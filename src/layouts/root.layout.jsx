import { Outlet } from "react-router";
import Footer from "@/components/Footer";

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
