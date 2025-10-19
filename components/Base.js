// Component Imports
import MainHead from "./MainHead";
import Header from "./Header";

export default function Base({ title, metaTitle, metaDescription, classes, children }) {
  return (
    <>
      <MainHead 
        title={title} 
        metaTitle={metaTitle}
        metaDescription={metaDescription}
      />
      <Header />
      <main
        className={classes ? classes : undefined}
      >
        {children}
      </main>
    </>
  );
}
