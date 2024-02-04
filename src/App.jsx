/* eslint-disable no-unused-vars */
import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import Body from "./components/Body";
import Head from "./components/Head";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainContainer from "./components/Body/MainContainerAlltheSection/MainContainer";
import Error from "./components/ErrorComponent/Error";
import Demo from "./components/Demo";
import Demo2 from "./components/Demo2";
import store, { persistor } from "./utilts/store";
import { PersistGate } from "redux-persist/integration/react";

const WatchPage = lazy(() => import("./components/Body/WatchPage"));
const YouTubeSearch = lazy(() =>
  import("./components/Body/MainContainerAlltheSection/SearchItem")
);
// import WatchPage from "./components/MainContainerComponent/WatchPage";

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
      {
        path: "/demo",
        element: (
          <>
            <Demo />
            <Demo2 />
          </>
        ),
      },
      {
        path: "/search",
        element: (
          <Suspense fallback={<h1 className="text-6xl">Loading....</h1>}>
            <YouTubeSearch />
          </Suspense>
        ),
      },
      // {
      //   path: "/watch",
      //   element: <WatchPage />,
      // },
    ],

    //This component helps when it gets a 404 error (errorElement)
    errorElement: <Error />,
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div>
          <Head />
          <RouterProvider router={appRouter} />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
