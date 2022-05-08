// Component Imports
import MainHead from "./MainHead";
import Header from "./Header";

export default function Base({ title, classes, children }) {
  return (
    <>
      <MainHead title={title} />
      <Header />
      <main
        className={classes ? classes : undefined}
      >
        {children}
      </main>
    </>
  );
}
