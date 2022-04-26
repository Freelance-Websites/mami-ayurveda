// Component Imports
import MainHead from "./MainHead";
import Header from "./Header";
import Footer from "./Footer";

export default function Base({ children }) {
  return (
    <>
      <MainHead />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
