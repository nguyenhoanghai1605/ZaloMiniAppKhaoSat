// --------------------------------Cá nhân------------------------------------------------

// import React, { FC, useEffect, useState } from "react";
// import { Avatar, Box, Header, Icon, Page, Text } from "zmp-ui";
// import subscriptionDecor from "../static/svg/subscription-decor.svg";
// import { useToBeImplemented } from "../hooks1";
// import api from "zmp-sdk";
// import { useRecoilValueLoadable } from "recoil";
// import { userState } from "../state";
// import { DEFAULT_OA_ID } from "../constants";
// // ----------------------------------------------

// import axios from 'axios';

// const Subscription: FC = () => {
//   // const onClick = useToBeImplemented();
//   const onClick = () => {
//     // Gọi API chat Zalo OA ở đây
//     // const oaId = "94143331359749352"; // Thay YOUR_OA_ID bằng ID của OA Zalo bạn muốn chat
//     const oaId = DEFAULT_OA_ID;

//     api.followOA({
//       id: oaId,
//     });
//   };
//   return (
//     <div className="m-4" onClick={onClick}>
//       <Box
//         className="bg-green text-white rounded-xl p-4 space-y-2"
//         style={{
//           backgroundImage: `url(${subscriptionDecor})`,
//           backgroundPosition: "right 8px center",
//           backgroundRepeat: "no-repeat",
//           backgroundColor: "#009966",
//         }}
//       >
//         <Text.Title className="font-bold">Đăng ký thành viên</Text.Title>
//         <Text size="xxSmall">
//           Quan tâm Zalo OA Thế Giới Kim Cương để nhận được những Ưu Đãi mới nhất!
//         </Text>
//       </Box>
//     </div>
//   );
// };

// const Personal: FC = () => {
//   const onClick = useToBeImplemented();
//   const userWelcome = useRecoilValueLoadable(userState);
//   return (
//     <div className="m-4">
//       <Box
//         className="bg-green text-black rounded-xl p-4 space-y-2"
//         style={{
//           backgroundColor: "#FFFFFF",
//         }}
//       >
//         <Text.Title className="">Cá nhân</Text.Title>
//         <Box flex>
//         <Avatar className="shadow align-middle mb-2" src={userWelcome.contents.avatar}>
//         Hi
//       </Avatar>
//           {userWelcome.state === "hasValue" ? (
//             <Text size="xxSmall" className="text-gray" style={{ marginTop: 15, marginLeft:15 }}>
//               {userWelcome.contents.name}!
//             </Text>
//           ) : (
//             <Text>...</Text>
//           )}

//           {/* <Icon icon="zi-user" style={{ marginRight: 8 }} />
//           <Text.Header className="flex-1 items-center font-normal">
//             Thông tin tài khoản
//           </Text.Header>
//           <Icon icon="zi-chevron-right" /> */}
//         </Box>
//       </Box>
//     </div>
//   );
// };

// // -----------------------------------------

// // -----------------------------------------

// const Other: FC = () => {
//   const onClick = () => {
//     // Gọi API chat Zalo OA ở đây
//     // const oaId = "94143331359749352"; // Thay YOUR_OA_ID bằng ID của OA Zalo bạn muốn chat
//     const oaId = DEFAULT_OA_ID;

//     api.openChat({
//       type: "oa",
//       id: oaId,
//     });
//   };

//   return (
//     <div className="m-4" onClick={onClick}>
//       <Box
//         className="bg-green text-black rounded-xl p-4 space-y-2"
//         style={{
//           backgroundColor: "#FFFFFF",
//         }}
//       >
//         <Text.Title className="">Khác</Text.Title>
//         <Box flex>
//           <Icon icon="zi-call" style={{ marginRight: 8 }} />
//           <Text.Header className="flex-1 items-center font-normal">
//             Liên hệ và góp ý
//           </Text.Header>
//           <Icon icon="zi-chevron-right" />
//         </Box>
//       </Box>
//     </div>
//   );
// };

// const ProfilePage: FC = () => {
//   return (
//     <Page>
//       <Header showBackIcon={false} title="&nbsp;" />
//       <Subscription />
//       <Personal />
//       <Other />
//     </Page>
//   );
// };

// export default ProfilePage;

import React, { FC, useEffect, useState } from "react";
import { Avatar, Box, Header, Icon, Page, Text } from "zmp-ui";
import subscriptionDecor from "../static/svg/subscription-decor.svg";
import { useToBeImplemented } from "../hooks1";
import api from "zmp-sdk";
import { useRecoilValueLoadable } from "recoil";
import { userState } from "../state";
import { DEFAULT_OA_ID } from "../constants";
import axios from "axios";
import "../css/formlienhe.css";

const Subscription: FC = () => {
  const onClick = () => {
    const oaId = DEFAULT_OA_ID;
    api.followOA({
      id: oaId,
    });
  };

  return (
    <div className="m-4" onClick={onClick}>
      <Box
        className="bg-green text-white rounded-xl p-4 space-y-2"
        style={{
          backgroundImage: `url(${subscriptionDecor})`,
          backgroundPosition: "right 8px center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#009966",
        }}
      >
        <Text.Title className="font-bold">Đăng ký thành viên</Text.Title>
        <Text size="xxSmall">
          Quan tâm Zalo OA Thế Giới Kim Cương để nhận được những Ưu Đãi mới
          nhất!
        </Text>
      </Box>
    </div>
  );
};

const Personal: FC = () => {
  const onClick = useToBeImplemented();
  const userWelcome = useRecoilValueLoadable(userState);

  return (
    <div className="m-4">
      <Box
        className="bg-green text-black rounded-xl p-4 space-y-2"
        style={{
          backgroundColor: "#FFFFFF",
        }}
      >
        <Text.Title className="">Thông tin</Text.Title>
        <Box flex>
          <Avatar
            className="shadow align-middle mb-2"
            src={userWelcome.contents.avatar}
          >
            Hi
          </Avatar>
          {userWelcome.state === "hasValue" ? (
            <Text
              size="xxSmall"
              className="text-gray"
              style={{ marginTop: 15, marginLeft: 15 }}
            >
              {userWelcome.contents.name}!
            </Text>
          ) : (
            <Text>...</Text>
          )}
        </Box>
      </Box>
    </div>
  );
};

const Other: FC = () => {
  const onClick = () => {
    const oaId = DEFAULT_OA_ID;
    api.openChat({
      type: "oa",
      id: oaId,
    });
  };

  return (
    <div
      className="m-4"
      // onClick={onClick}
    >
      <Box
        className="bg-green text-black rounded-xl p-4 space-y-2"
        style={{
          backgroundColor: "#FFFFFF",
        }}
      >
        <Text.Title className="">Khác</Text.Title>
        <Box flex>
          <Icon icon="zi-call" style={{ marginRight: 8 }} />
          <Text.Header className="flex-1 items-center font-normal">
            Liên hệ và góp ý
          </Text.Header>
          <Icon icon="zi-chevron-right" />
        </Box>
      </Box>
    </div>
  );
};

const ProfilePage: FC = () => {
  return (
    <Page>
      <Header showBackIcon={false} title="&nbsp;" />
      {/* <Subscription /> */}
      <Personal />
      {/* <Other /> */}

      {/* Thêm iframe vào đây */}
      <div className="forms-lien-he">
        <iframe src="https://forms.office.com/r/ATjVWGVhZc?embed=true"></iframe>
      </div>
    </Page>
  );
};

export default ProfilePage;
