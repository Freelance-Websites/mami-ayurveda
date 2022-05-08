// Component Imports
import MainHead from "./MainHead";
import Header from "./Header";

export default function Base({ children }) {
  return (
    <>
      <MainHead />
      <Header />
      <main>{children}</main>
    </>
  );
}
