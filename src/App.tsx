import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import Header from "./components/organisms/Header";
import AppRoutes from "./routes";
import Loading from "./components/atoms/Loading";

function App() {
  const isQueryLoading = useIsFetching();
  const isMutationLoading = useIsMutating();
  return (
    <>
      {<Header drawerToggleClicked={() => {}} />}
      {(isMutationLoading || isQueryLoading) && <Loading />}
      <div
        style={{
          marginTop: 56,
        }}
      >
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
