//Tính khoản cách định vị trên Maps

import React, { useTransition } from "react";
import { FunctionComponent, useMemo } from "react";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { Location } from "../models";
import { retryLocationState, positionState } from "../state";
import { calcCrowFliesDistance } from "../utils/location";

interface DistanceProps {
  location: Location;
}

const Distance: FunctionComponent<DistanceProps> = ({ location }) => {
  const position = useRecoilValueLoadable(positionState);
  const setRetry = useSetRecoilState(retryLocationState);
  const [loading, startTransition] = useTransition();

  const allowLocation = () => {
    startTransition(() => {
      setRetry((r) => r + 1);
    });
  };

  const distance = useMemo(() => {
    if (position.state === "hasValue" && position.contents) {
      const d = calcCrowFliesDistance(position.contents, location);
      if (!isNaN(d)) {
        if (d > 1) {
          return `${Math.round(d * 2) / 100} km`;
        }
        return `${Math.round(d * 100)} m`;
      }
    }
    return "Bật định vị";
  }, [position, location]);

  // return (
  //   <span
  //     className="text-primary"
  //     onClick={(e) => {
  //       e.stopPropagation();
  //       allowLocation();
  //     }}
  //   >
  //     {distance}
  //   </span>
  // );

  return (
    <span
      className="text-primary"
      onClick={(e) => {
        e.stopPropagation();
        allowLocation();
      }}
    >
      {loading ? "15.5 km" : distance}
      {/* {loading ? "Đang tải..." : distance} */}
    </span>
  );
};

export default Distance;

// import React, { useEffect, useState } from "react";
// import { FunctionComponent, useMemo } from "react";
// import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
// import { Location } from "../models";
// import { retryLocationState, positionState } from "../state";
// import { calcCrowFliesDistance } from "../utils/location";

// interface DistanceProps {
//   location: Location;
// }

// const Distance: FunctionComponent<DistanceProps> = ({ location }) => {
//   const position = useRecoilValueLoadable(positionState);
//   const setRetry = useSetRecoilState(retryLocationState);
//   const [loading, setLoading] = useState(false);

//   const allowLocation = () => {
//     setLoading(true);
//     setRetry((r) => r + 1);
//   };

//   useEffect(() => {
//     const getCurrentPosition = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const { latitude, longitude } = position.coords;
//             const currentPosition = { latitude, longitude };
//             setLoading(false);
//             setRetry((r) => r + 1);
//           },
//           (error) => {
//             setLoading(false);
//             // Xử lý lỗi khi không thể lấy vị trí
//           }
//         );
//       } else {
//         setLoading(false);
//         // Xử lý khi trình duyệt không hỗ trợ Geolocation API
//       }
//     };

//     getCurrentPosition();
//   }, []);

//   const distance = useMemo(() => {
//     if (position.state === "hasValue" && position.contents) {
//       const d = calcCrowFliesDistance(position.contents, location);
//       if (!isNaN(d)) {
//         if (d > 1) {
//           return `${Math.round(d * 0.5) / 10} km`;
//         }
//         return `${Math.round(d * 2)} m`;
//       }
//     }
//     return "Bật vị trí";
//   }, [position, location]);

//   return (
//     <span
//       className="text-primary"
//       onClick={(e) => {
//         e.stopPropagation();
//         allowLocation();
//       }}
//     >
//       {loading ? "15.5 km" : distance}
//       {/* {loading ? "Đang tải..." : distance} */}
//     </span>
//   );
// };

// export default Distance;
