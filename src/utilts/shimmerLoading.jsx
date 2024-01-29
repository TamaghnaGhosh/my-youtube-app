import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Shimmer = () => {
  return (
    <div className="flex flex-wrap">
      {Array(35)
        .fill()
        .map((element, index) => (
          <div className="p-3 m-3 w-64 shadow-lg rounded-lg" key={index}>
            <Skeleton
              count={1}
              width={"232px"}
              height={"165px"}
              style={{ borderRadius: "8px" }}
            />
            <ul>
              <li className="font-bold py-2 text-sm">
                <Skeleton />
              </li>
              <li>
                <Skeleton />
              </li>
            </ul>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
