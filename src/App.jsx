import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import Body from "./components/Body";
// import Head from "./components/Head";
import store from "./utilts/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainContainer from "./components/MainContainerComponent/MainContainer";
// import WatchPage from "./components/MainContainerComponent/WatchPage";

const WatchPage = lazy(() =>
  import("./components/MainContainerComponent/WatchPage")
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "/watch",
        element: (
          <Suspense fallback={<h1 className="text-6xl">Loading....</h1>}>
            <WatchPage />
          </Suspense>
        ),
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <div>
        {/* <Head /> */}
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
};

export default App;
