// Component Imports
import MainHead from "./MainHead";
import Header from "./Header";

export default function Base({ title, children }) {
  return (
    <>
      <MainHead title={title} />
      <Header />
      <main>{children}</main>
    </>
  );
}
