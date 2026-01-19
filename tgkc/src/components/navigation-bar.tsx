import React, { useEffect, useState } from "react";
import { BottomNavigation, Icon } from "zmp-ui";
import { useNavigate, useLocation } from "react-router-dom";
import { openChat } from "zmp-sdk"; // Import openChat từ zmp-sdk
import { getConfig } from "./config-provider";
import { DEFAULT_OA_ID } from "../constants";

const navItems = [
  // {
  //   path: "/",
  //   label: "Trang Chủ",
  //   // icon: <Icon icon="zi-home" />,
  //   iconUrl:
  //     "https://file.hstatic.net/1000381168/file/icon8_3b17be4adf614b368d6ea6bac4cc3a7e.png",
  // },
  // {
  //   path: "/chat",
  //   label: "Tin nhắn",
  //   // icon: <Icon icon="zi-chat" />,
  //   onClick: openChat, // Sử dụng openChat từ zmp-sdk
  //   iconUrl:
  //     "https://file.hstatic.net/1000381168/file/icon3_7b7865c584ff4cb88c3fb3a2dc66cf77.png",
  // },
  // {
  //   path: "/calendar",
  //   label: "Khuyến Mãi",
  //   // icon: <Icon icon="zi-gallery" />,
  //   iconUrl:
  //     "https://file.hstatic.net/1000381168/file/icon6_6d857908cd35489a951c3643be23f9b5.png",
  // },
  // {
  //   path: "/sanpham",
  //   label: "Sản phẩm",
  //   // icon: <Icon icon="zi-more-grid" />,
  //   iconUrl:
  //     "https://file.hstatic.net/1000381168/file/icon1_307f798cec654eb6be531511b0322cf2.png",
  // },
  // {
  //   path: "/support",
  //   label: "Cá nhân",
  //   // icon: <Icon icon="zi-user" />,
  //   iconUrl:
  //     "https://file.hstatic.net/1000381168/file/icon10_b0c234e2b5d94cfe9e7661e42a061251.png",
  // },
];

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("/");

  useEffect(() => {
    navigate(activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (navItems.find((item) => item.path === location.pathname)) {
      setActiveTab(location.pathname);
    }
  }, [location]);

  return (
    <>
      {location.pathname !== "/restaurant" && (
        <>
          <BottomNavigation
            id="bottom-nav"
            activeKey={activeTab}
            onChange={(key) => {
              // Kiểm tra nếu tab được nhấp là "Tin nhắn" thì gọi openChat
              const selectedItem = navItems.find((item) => item.path === key);
              const oaId: string = getConfig(
                (c) => c.template.oaIDtoOpenChat || ""
              );
              if (selectedItem && selectedItem.onClick) {
                selectedItem.onClick({
                  type: "oa",
                  id: oaId || DEFAULT_OA_ID,
                });
              } else {
                setActiveTab(key);
              }
            }}
          >
            {/* ---------------------icon----------------------------------- */}

            {/* {navItems.map(({ path, label, icon }) => (
              <BottomNavigation.Item key={path} label={label} icon={icon} />
            ))}
          </BottomNavigation> */}

            {/* ------------------------iconUrl------------------------------- */}

            {navItems.map(({ path, label, iconUrl }) => (
              <BottomNavigation.Item
                key={path}
                label={label}
                icon={<img src={iconUrl} alt={label} />} // Sử dụng <img> để hiển thị icon từ URL
              />
            ))}
          </BottomNavigation>
        </>
      )}
    </>
  );
}

export default NavigationBar;
