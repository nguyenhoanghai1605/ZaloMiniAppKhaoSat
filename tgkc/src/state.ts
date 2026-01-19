import { atom, selector } from "recoil";
import { Booking, Cart, Location, Restaurant, TabType } from "./models";
import { calcCrowFliesDistance } from "./utils/location";
import sdk from "./utils/sdk";

export const loginState = selector({
  key: "login",
  get: () => sdk.login(),
});

export const userState = selector({
  key: "user",
  get: async ({ get }) => {
    await get(loginState);
    const { userInfo } = await sdk.getUserInfo({});
    return userInfo;
  },
});

export const retryLocationState = atom({
  key: "retryLocation",
  default: 0,
});

export const positionState = selector<Location | undefined>({
  key: "position",
  get: async ({ get }) => {
    try {
      const allow = get(retryLocationState);
      if (allow) {
        await get(loginState);
        const { latitude, longitude } = await sdk.getLocation({});
        return {
          lat: Number(latitude),
          long: Number(longitude),
        };
      }
    } catch (error) {
      return undefined;
    }
    return undefined;
  },
});

export const restaurantsState = selector<Restaurant[]>({
  key: "restaurants",
  get: () => [
    {
      id: 1,
      name: "SaiGon Centre - HCM",
      districtId: 1,
      rating: 5,
      location: {
        lat: 10.7733303,
        long: 106.6987723,
      },
      address: "Saigon Centre, Số 67 Đường Lê Lợi, P. Sài Gòn, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/lm81_8efdb5994b3b465d95f460bef048862f.jpg",

      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 130",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4952412220555!2d106.69877231524096!3d10.77333026219567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4743648f3d%3A0x16ce95918cb14834!2sSaigon%20Centre!5e0!3m2!1svi!2s!4v1679970763013!5m2!1svi!2s",
    },
    {
      id: 2,
      name: "DP Diamond - HCM",
      address: "Diamond Plaza HCM, Tầng 2, Số 34 Đường Lê Duẩn, P. Sài Gòn, TP. HCM",
      districtId: 1,
      rating: 4.5,
      location: {
        lat: 10.7809923,
        long: 106.696306,
      },
      views: 50,
      image:
        "https://file.hstatic.net/1000381168/article/z2808886703327_589ef08c0671b123b7faf4551347f487_bfb9b5387a754b7498a64610fa985312.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 100",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.39547341509!2d106.69630601524109!3d10.780992262056328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f37cade9cef%3A0x89a11cd90293c6cc!2sDiamond%20Plaza!5e0!3m2!1svi!2s!4v1679970522674!5m2!1svi!2s",
    },
    {
      id: 3,
      name: "NZ Nowzone - HCM",
      districtId: 1,
      rating: 5,
      location: {
        lat: 10.7641366,
        long: 106.6803551,
      },
      address:
        "NOWZONE Fashion Mall HCM, Tầng trệt, Số 235 Đường Nguyễn Văn Cừ, P. Cầu Ông Lãnh, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/cbl-end-2023_9ffd91cc541c4a79aefa9f052952ba75.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 102",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6148609647726!2d106.680355115241!3d10.764136562362765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f194dae00e5%3A0x4b90c5d0bd96fe63!2sNOWZONE%20Fashion%20Mall!5e0!3m2!1svi!2s!4v1679971166752!5m2!1svi!2s",
    },
    {
      id: 4,
      name: "VI Dong Khoi - HCM",
      districtId: 1,
      rating: 5,
      location: {
        lat: 10.7774409,
        long: 106.7013376,
      },
      address: "Vincom Center Đồng Khởi HCM, Tầng B1, Số 72 Đường Lê Thánh Tôn và 45A Đường Lý Tự Trọng, P. Sài Gòn, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vincom-smart-city_f17dd80d9eed4c028f844aacc45f64c9.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 130",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1165.2569966812828!2d106.70133757654229!3d10.77744085400188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4876c29a9b%3A0xd2c79768678d2142!2zVmluY29tIENlbnRlciDEkOG7k25nIEto4bufaQ!5e0!3m2!1svi!2s!4v1679972428815!5m2!1svi!2s",
    },
    {
      id: 6,
      name: "VC Vivo Quan 7 - HCM",
      districtId: 1,
      rating: 5,
      location: {
        lat: 10.730088,
        long: 106.703569,
      },
      address: "SC VivoCity Quận 7 HCM, Tầng 2, Khu phố 35, P. Tân Hưng, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/lm81_8efdb5994b3b465d95f460bef048862f.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 125",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.056921521219!2d106.70099407577567!3d10.730093260045109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fa66fff1c4b%3A0x52150ea1d568f24e!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682306273114!5m2!1svi!2s",
    },
    {
      id: 7,
      name: "LT Quan 7 - HCM",
      districtId: 1,
      rating: 5,
      location: {
        lat: 10.741252,
        long: 106.702083,
      },
      address: "Lotte Mart Quận 7 HCM, Tầng trệt, Số 469 Đường Nguyễn Hữu Thọ, P. Tân Hưng, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vcm_01b1844ff1ea4198acee8f3ef56f4111.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 109",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.916146836745!2d106.6992328757759!3d10.740945959845744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9f2353ffb9%3A0x6ab49da47594ce7b!2sLOTTE%20Mart%20Qu%E1%BA%ADn%207!5e0!3m2!1svi!2s!4v1682307385490!5m2!1svi!2s",
    },
    {
      id: 8,
      name: "CO Huynh Tan Phat - HCM",
      districtId: 1,
      rating: 5,
      location: {
        lat: 10.712384,
        long: 106.736693,
      },
      address:
        "Co.opmart Huỳnh Tấn Phát HCM, Tầng trệt, Số 1362 Đường Huỳnh Tấn Phát, Khu phố 30, P. Tân Mỹ, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/csd_31595f8cd3954429b25bd5d375aea173.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 120",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.287190761626!2d106.73395177577562!3d10.712317760371441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175254cfb181d05%3A0xf04823df0bc559c1!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682307740534!5m2!1svi!2s",
    },
    {
      id: 9,
      name: "Parc Mall Q8 - HCM",
      districtId: 1,
      rating: 5,
      location: {
        lat: 10.7600326,
        long: 106.6598889,
      },
      address: "Parc Mall, L1-K05 - Tầng 1, Số 547 – 549 Đường Tạ Quang Bửu, P. Chánh Hưng, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/saigon-centre-1_0d351da7b02f49fbaea91215a467bf69.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 128",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1959.8341125291647!2d106.65988889854765!3d10.76003261621292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752eee34df8a53%3A0x475d959d71ba8ac8!2zQ28ub3BtYXJ0IEzDvSBUaMaw4budbmcgS2nhu4d0!5e0!3m2!1svi!2s!4v1682308343092!5m2!1svi!2s",
    },
    {
      id: 10,
      name: "VH Van Hanh Mall - HCM",
      districtId: 1,
      rating: 5,
      location: {
        lat: 10.7707303,
        long: 106.6671261,
      },
      address: "Vạn Hạnh Mall HCM, Tầng trệt, Số 11 Đường Sư Vạn Hạnh, P. Hòa Hưng, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/lm81_8efdb5994b3b465d95f460bef048862f.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 121",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.529080239605!2d106.66712607577594!3d10.770730259297242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fcf12839e8f%3A0x7adceddac91d0b05!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682308726672!5m2!1svi!2s",
    },
    {
      id: 11,
      name: "LT Quan 11 - HCM",
      districtId: 1,
      rating: 5,
      location: {
        lat: 10.7634413,
        long: 106.6543641,
      },
      address: "Lotte Mart Quận 11 HCM, Tầng trệt, Số 968 Đường 3/2, P. Phú Thọ, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vhm_a6d113a6c4ec4ef19a348cea27f4651e.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 110",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6239034853097!2d106.65436407577596!3d10.763441259431648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1eafbff8c3%3A0x65b293c0212368a0!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682308897566!5m2!1svi!2s",
    },
    {
      id: 12,
      name: "GO An Lac - HCM",
      districtId: 1,
      rating: 5,
      location: {
        lat: 10.7307409,
        long: 106.6015521,
      },
      address:
        "GO An Lạc HCM, Tầng trệt, khu phố 5, Đường Quốc lộ 1A, P. An Lạc, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/lgv_772109beb29d431e83b63fbd735b0ec6.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 119",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.048524541789!2d106.60155212577573!3d10.730740910033257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752d3dee1e014d%3A0xbe1bb63eb5385602!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682309069198!5m2!1svi!2s",
    },
    {
      id: 14,
      name: "AO Binh Tan - HCM",
      districtId: 1,
      rating: 5,
      location: {
        lat: 10.742755,
        long: 106.609356,
      },
      address:
        "AEON MALL Bình Tân HCM, Tầng 1, Khu phố 11, P. An Lạc, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vhl_bccd03307b814af68fb51ddbab0e83af.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 124",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.892667903579!2d106.60935597577571!3d10.742754959812391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752db43c30bde3%3A0x30c29958cefb091c!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682309650790!5m2!1svi!2s",
    },
    {
      id: 15,
      name: "VI Landmark 81 - HCM",
      districtId: 1,
      rating: 5,
      location: {
        lat: 10.7682563,
        long: 106.6720501,
      },
      address: "Vincom Center Landmark 81 HCM, Tầng L2, Vincom Center Landmark 81 HCM, Số 772 Đường Điện Biên Phủ, P. Thạnh Mỹ Tây, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/ctdm-end-2023_edce351a5f1a4ac8a4f0e0c5b4a10b5a.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 123",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5612718358966!2d106.67205007577597!3d10.768256259342856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fecdca0a981%3A0x8944d60d61103fc8!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682309863057!5m2!1svi!2s",
    },
    {
      id: 16,
      name: "VI SaigonRes - HCM",
      districtId: 1,
      rating: 5,
      location: {
        lat: 10.8167843,
        long: 106.7044081,
      },
      address: "Vincom Plaza SaigonRes HCM, Tầng trệt, Số 188 Đường Nguyễn Xí, P. Bình Thạnh, TP. Hổ Chí Minh",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/lq11_dcc08f6ac6bd4a2b9d10f2fc0bb2639b.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 123",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9284931711163!2d106.70440807577626!3d10.816784258446447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529c570d08709%3A0xd47e110d24ee3e57!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682310063686!5m2!1svi!2s",
    },
    {
      id: 17,
      name: "LT Go Vap - HCM",
      districtId: 1,
      rating: 5,
      location: {
        lat: 10.8384606,
        long: 106.6688943,
      },
      address: "Lotte Mart Gò Vấp HCM, Tầng trệt, Số 18 Đường Phan Văn Trị, P. Gò Vấp, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vtdh_14c5512e5c1f4e298523a5d0020cc2a6.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 117",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.644937684685!2d106.66889427577658!3d10.838460558044899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529058ed6e763%3A0xd10c1e04e2908686!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682310250461!5m2!1svi!2s",
    },
	{
      id: 18,
      name: "Emart Phan Van Tri - HCM",
      districtId: 1,
      rating: 5,
      location: {
        lat: 10.8296123,
        long: 106.6699081,
      },
      address: "Emart Phan Văn Trị, Tầng trệt, Số 366 Đường Phan Văn Trị, P. An Nhơn, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/cpt_5b7156638f7e4e41b5471c2a554d63ee.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 129",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.7607532311004!2d106.66990807577646!3d10.829612258208948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175298ffc12752d%3A0xb6066e195ae3bc7e!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682310569190!5m2!1svi!2s",
    },
    {
      id: 19,
      name: "VI Quang Trung - HCM",
      districtId: 1,
      rating: 5,
      location: {
        lat: 10.8296123,
        long: 106.6699081,
      },
      address: "Vincom Plaza Quang Trung HCM, Tầng trệt, Số 18 Đường Phan Văn Trị, P. Gò Vấp, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/cpt_5b7156638f7e4e41b5471c2a554d63ee.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 114",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.7607532311004!2d106.66990807577646!3d10.829612258208948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175298ffc12752d%3A0xb6066e195ae3bc7e!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682310569190!5m2!1svi!2s",
    },
    {
      id: 20,
      name: "VI Cong Hoa - HCM",
      districtId: 1,
      rating: 5,
      location: {
        lat: 10.8012063,
        long: 106.6552879,
      },
      address: "Vincom Cộng Hòa HCM, Tầng trệt, Số 15-17 Đường Cộng Hòa, P. Tân Sơn Nhất, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vbh_d5f131f6361a42babfc0eec6d2b6fb0b.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 105",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1319281996434!2d106.65528787577622!3d10.801206258734663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175294a72aac293%3A0x9ed03bdd80d97619!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682310750473!5m2!1svi!2s",
    },
    {
      id: 21,
      name: "AO Celadon - HCM",
      districtId: 1,
      rating: 5,
      location: {
        lat: 10.8017041,
        long: 106.6149508,
      },
      address: "Tầng 1, Số 30 Bờ Bao Tân Thắng, P. Sơn Kỳ, Q. Tân Phú, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/bcdla_0db82f53ff254fc881df63131c3c8324.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 122",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1254318488172!2d106.61495077577631!3d10.801704058725477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b805c799399%3A0xa042eb5515961e94!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682310936259!5m2!1svi!2s",
    },
    {
      id: 23,
      name: "ES Place - HCM",
      districtId: 1,
      rating: 5,
      location: {
        lat: 10.7870973,
        long: 106.7248078,
      },
      address: "Estella Place HCM, Tầng trệt, Số 88 Đường Song Hành, P. Bình Trưng, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/lm81_8efdb5994b3b465d95f460bef048862f.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 108",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15677.263717448344!2d106.72480776023255!3d10.787097258415628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527195994929b%3A0xfa625b8475f0c10c!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682311342790!5m2!1svi!2s",
    },
    {
      id: 24,
      name: "SE Pham Van Dong - HCM",
      districtId: 1,
      rating: 5,
      location: {
        lat: 10.8266126,
        long: 106.7168998,
      },
      address:
        "Sense City Phạm Văn Đồng HCM, Tầng trệt, Số 240 - 242 Đường Kha Vạn Cân, P. Hiệp Bình, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/lm81_8efdb5994b3b465d95f460bef048862f.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 127",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1959.3999974909461!2d106.71689976479202!3d10.826612570497213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529bf21c641a9%3A0x6a10535079e9b609!2zVHJ1bmcgdMOibSB0aMawxqFuZyBt4bqhaSBTZW5zZSBDaXR5IFBo4bqhbSBWxINuIMSQ4buTbmc!5e0!3m2!1svi!2s!4v1682311531163!5m2!1svi!2s",
    },
	{
      id: 25,
      name: "VI Mega Mall Grand Park - HCM",
      districtId: 1,
      rating: 5,
      location: {
        lat: 10.8266126,
        long: 106.7168998,
      },
      address:
        "Vincom Mega Mall Grand Park, Tầng L1, Số 88 Đường Phước Thiện, P. Long Bình, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/lm81_8efdb5994b3b465d95f460bef048862f.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 104",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1959.3999974909461!2d106.71689976479202!3d10.826612570497213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529bf21c641a9%3A0x6a10535079e9b609!2zVHJ1bmcgdMOibSB0aMawxqFuZyBt4bqhaSBTZW5zZSBDaXR5IFBo4bqhbSBWxINuIMSQ4buTbmc!5e0!3m2!1svi!2s!4v1682311531163!5m2!1svi!2s",
    },
    {
      id: 26,
      name: "VI Thao Dien - HCM",
      districtId: 1,
      rating: 5,
      location: {
        lat: 10.8087691,
        long: 106.7091819,
      },
      address:
        "Vincom Mega Mall Thảo Điền HCM, Tầng trệt, Số 161 Đường Võ Nguyên Giáp, P. An Khánh, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/cbl-end-2023_9ffd91cc541c4a79aefa9f052952ba75.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 115",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62704.53120873534!2d106.70918190275768!3d10.808769081249885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175275d7d8a37bb%3A0xf5ef5010144ab035!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682311906651!5m2!1svi!2s",
    },
    {
      id: 27,
      name: "VI Le Van Viet - HCM",
      districtId: 1,
      rating: 5,
      location: {
        lat: 10.8450891,
        long: 106.7760889,
      },
      address:
        "Vincom Plaza Lê Văn Việt HCM, Tầng trệt, Số 50 Đường Lê Văn Việt, P. Tăng Nhơn Phú, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vincom-smart-city_f17dd80d9eed4c028f844aacc45f64c9.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 116",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.558115253279!2d106.77608887577661!3d10.845089107921979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175271fafafafbb%3A0x2d2f3cf5ad940093!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682312041202!5m2!1svi!2s",
    },
    {
      id: 28,
      name: "Aeon Ha Dong - HNO",
      address:
        "Aeon Hà Đông, Tầng 2, Khu trung tâm Bách hóa tổng hợp Aeon Hà Đông, Tổ dân phố Hoàng Văn Thụ, P. Dương Nội, TP. Hà Nội",
      districtId: 2,
      rating: 4.5,
      location: {
        lat: 21.007383,
        long: 105.793434,
      },
      views: 50,
      image:
        "https://file.hstatic.net/1000381168/file/bcdla_0db82f53ff254fc881df63131c3c8324.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 406",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.631890052696!2d105.79085907591003!3d21.00738798851101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad4f2be57e33%3A0x7500869332cee8b0!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682316652040!5m2!1svi!2s",
    },
    {
      id: 29,
      name: "The Loop - HNO",
      districtId: 2,
      rating: 5,
      location: {
        lat: 21.015275,
        long: 105.7751831,
      },
      address: "The Loop Center, Tầng 1, Số 241 Đường Xuân Thủy, P. Cầu Giấy, TP. Hà Nội",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/go-an-lac-2023_60e959510ad24c9daa36094cd051f5d4.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 416",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.4349676331285!2d105.77518307591016!3d21.01527498824033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455253856f4bb%3A0x15c80c471abdfac2!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682317019769!5m2!1svi!2s",
    },
    {
      id: 30,
      name: "LT Deparment Store - HNO",
      districtId: 2,
      rating: 5,
      location: {
        lat: 21.0346443,
        long: 105.81105,
      },
      address: "LOTTE Deparment Store Hà Nội, Tầng 2, Số 54 Đường Liễu Giai, P. Ngọc Hà, TP. Hà Nội",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vcm_01b1844ff1ea4198acee8f3ef56f4111.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 405",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.9510559621417!2d105.81104997591066!3d21.03464428757518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab8c5a9715eb%3A0xc3fc4016fcdd06f9!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682317263427!5m2!1svi!2s",
    },
    {
      id: 31,
      name: "VI Ba Trieu - HNO",
      districtId: 2,
      rating: 5,
      location: {
        lat: 21.0114741,
        long: 105.8475494,
      },
      address:
        "Vincom Center Bà Triệu Hà Nội Tháp B - Tầng 2, Số 191, Phố Bà Triệu, P. Hai Bà Trưng, TP. Hà Nội",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/csd_31595f8cd3954429b25bd5d375aea173.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 405",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.529877219988!2d105.8475493759103!3d21.011474088370754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab6fd2579395%3A0x1cd0b06a174f7ddd!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682317425751!5m2!1svi!2s",
    },
    {
      id: 32,
      name: "LT Mall Tay Ho - HNO",
      districtId: 2,
      rating: 5,
      location: {
        lat: 21.0759924,
        long: 105.8101506,
      },
      address:
        "TTTM Lotte Mall Tây Hồ, Tầng 1F, (Tầng 1 Gần Cửa số 2 Đường Võ Chí Công ), 272 Đường Võ Chí Công, Phú Thượng, Tây Hồ, Hà Nội.",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/saigon-centre-1_0d351da7b02f49fbaea91215a467bf69.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 415",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.642634238406!2d105.82997517591015!3d21.006957588525797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135adbbe69ea475%3A0x13878f3fa7c8db49!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682317866216!5m2!1svi!2s",
    },
    {
      id: 33,
      name: "VI Times City - HNO",
      districtId: 2,
      rating: 5,
      location: {
        lat: 20.9952535,
        long: 105.8662538,
      },
      address:
        "Vincom Mega Mall Times City Hà Nội, Tầng B1, Số 458, Phố Minh Khai, P. Vĩnh Tuy, TP. Hà Nội",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vhm_a6d113a6c4ec4ef19a348cea27f4651e.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 412",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.9347261206276!2d105.86625377590988!3d20.99525348892728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad270ae56307%3A0xe49a5e4593a2436a!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682317717259!5m2!1svi!2s",
    },
    {
      id: 34,
      name: "VI Pham Ngoc Thach - HNO",
      districtId: 2,
      rating: 5,
      location: {
        lat: 21.0069576,
        long: 105.8299752,
      },
      address:
        "Vincom Center Phạm Ngọc Thạch, Số 02 Đường Phạm Ngọc Thạch, P. Kim Liên, TP. Hà Nội.",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/saigon-centre-1_0d351da7b02f49fbaea91215a467bf69.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 404",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.642634238406!2d105.82997517591015!3d21.006957588525797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135adbbe69ea475%3A0x13878f3fa7c8db49!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682317866216!5m2!1svi!2s",
    },
    {
      id: 35,
      name: "VI Royal City - HNO",
      districtId: 2,
      rating: 5,
      location: {
        lat: 21.0007364,
        long: 105.813469,
      },
      address:
        "Vincom Mega Mall Royal City, Số 72A Đường Nguyễn Trãi, P. Thanh Xuân, TP. Hà Nội",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/lgv_772109beb29d431e83b63fbd735b0ec6.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 411",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.797912175862!2d105.81346897591001!3d21.000736388739185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad2a516a8cf7%3A0x1c231198de7955b0!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682318071255!5m2!1svi!2s",
    },
    {
      id: 36,
      name: "VI Mega Smart City - HNO",
      districtId: 2,
      rating: 5,
      location: {
        lat: 21.0008166,
        long: 105.7748443,
      },
      address: "Vincom Mega Mall Smart City, Khu vực ô GS-CCTP1 thuộc dự án Khu đô thị mới Tây Mỗ - Đại Mỗ - Vinhomes Park, P. Tây Mỗ, TP. Hà Nội",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/lm81_8efdb5994b3b465d95f460bef048862f.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 413",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59596.73458568452!2d105.77484428784605!3d21.000816552649987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313453a42e2adf47%3A0x7a3710c57b832928!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682318204990!5m2!1svi!2s",
    },
    {
      id: 37,
      name: "VI Tran Duy Hung - HNO",
      districtId: 2,
      rating: 5,
      location: {
        lat: 21.0061562,
        long: 105.7922472,
      },
      address:
        "Vincom Center Trần Duy Hưng, Tầng trệt, Khối đế, Toà tháp A, B, Tổ hợp công trình thương mại, dịch vụ, văn phòng, nhà ở và nhà trẻ StarCity Center tại ô đất ký hiệu HH, Khu đô thị Đông Nam, Đường Trần Duy Hưng, P. Yên Hoà, TP. Hà Nội",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/sala_d0201f5800a342269010aa5348013082.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 414",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6626392323583!2d105.79224717591015!3d21.006156188553405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad3b6a3388e3%3A0x4a308b85bf8580fc!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682318333262!5m2!1svi!2s",
    },
    {
      id: 38,
      name: "TS Chau Doc - AGI",
      districtId: 3,
      rating: 5,
      location: {
        lat: 10.7008405,
        long: 105.1269315,
      },
      address:
        "Siêu thị Tứ Sơn Châu Đốc, Tầng trệt, P. Châu Đốc, Tỉnh An Giang",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vhl_bccd03307b814af68fb51ddbab0e83af.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 221",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.4356707323723!2d105.12693147577546!3d10.700840460581874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a259e5f291f5d%3A0x439f35fd5b0c326b!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682319075428!5m2!1svi!2s",
    },
    {
      id: 39,
      name: "VI Long Xuyen - AGI",
      districtId: 3,
      rating: 5,
      location: {
        lat: 10.3838757,
        long: 105.4344363,
      },
      address:
        "Vincom Plaza Long Xuyên, Tầng trệt, P. Long Xuyên, Tỉnh An Giang",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/ctdm-end-2023_edce351a5f1a4ac8a4f0e0c5b4a10b5a.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 213",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.4740097152608!2d105.43443627577312!3d10.383875666310164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a733344721c03%3A0xaf9bca988282f461!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682319273534!5m2!1svi!2s",
    },
    {
      id: 41,
      name: "CO Ba Ria - BRV",
      districtId: 4,
      rating: 5,
      location: {
        lat: 10.4894809,
        long: 107.1729326,
      },
      address:
        "Co.opmart Bà Rịa, Tầng trệt, Số 6 Đường Nguyễn Phú Thọ, KP2, P. Bà Rịa, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vtdh_14c5512e5c1f4e298523a5d0020cc2a6.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 304",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1961.5709329042913!2d107.17293258874219!3d10.489480884797375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317573c53fe45635%3A0x9abd6ec48e0c1abe!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682320172575!5m2!1svi!2s",
    },
    {
      id: 42,
      name: "GO! Ba Ria - BRV",
      districtId: 4,
      rating: 5,
      location: {
        lat: 10.4932078,
        long: 107.1656205,
      },
      address:
        "Go! Bà Rịa, Số 2A Đường Nguyễn Đình Chiểu, Khu phố 1, P. Bà Rịa, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/bigc-can-tho_09f62750bd904c00b757d6bfe507b53f.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 314",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.0946100493134!2d107.16562047577402!3d10.493207764352434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175735d3a6fdec7%3A0xe05972039d2ce5c4!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682320357661!5m2!1svi!2s",
    },
    {
      id: 44,
      name: "LT Vung Tau - BRV",
      districtId: 4,
      rating: 5,
      location: {
        lat: 10.3503183,
        long: 107.0914301,
      },
      address:
        "Lotte Mart Vũng Tàu, Tầng 2, Góc đường 3 tháng 2 và đường Thi Sách, P. Tam Thắng, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vbh_d5f131f6361a42babfc0eec6d2b6fb0b.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 306",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.8945242074615!2d107.09143007577295!3d10.350318266907323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31756f99aa587739%3A0x3c09fdde01a0ac60!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682320632913!5m2!1svi!2s",
    },
    {
      id: 45,
      name: "GO! Bac Lieu - BLI",
      districtId: 5,
      rating: 5,
      location: {
        lat: 9.2910286,
        long: 105.7182677,
      },
      address: "GO! Bạc Liêu, Tầng trệt, Đường 23/8, P. Bạc Liêu, Tỉnh Cà Mau",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/bcdla_0db82f53ff254fc881df63131c3c8324.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 220",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3937.4759271290327!2d105.71826767576603!3d9.29102858483079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a109eeaccbac25%3A0xe985e7f4191b09f2!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682321845202!5m2!1svi!2s",
    },
    {
      id: 46,
      name: "CO Bac Lieu - BLI",
      districtId: 5,
      rating: 5,
      location: {
        lat: 9.2926197,
        long: 105.7136236,
      },
      address: "Co.opmart Bạc Liêu, Tầng trệt, Số 07 Đường Trần Huỳnh, P. Bạc Liêu, Tỉnh Cà Mau",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/dpg_06d205c9a3194d87a2e6160b644ae255.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 207",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3937.458037514944!2d105.71362357576608!3d9.29261968480521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a109722a1d2db1%3A0xbd246bb090f78144!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5nIC0gQuG6oWMgTGnDqnU!5e0!3m2!1svi!2s!4v1682322022798!5m2!1svi!2s",
    },
    {
      id: 47,
      name: "GO Ben Tre - BTR",
      districtId: 6,
      rating: 5,
      location: {
        lat: 10.2546801,
        long: 106.3572879,
      },
      address:
        "GO Bến Tre, Tầng 1, Khu phố 1, Thửa đất số 558, tờ bản đồ số 16 Đường Võ Nguyên Giáp (Quốc lộ 60), P. Sơn Đông, Tỉnh Vĩnh Long",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/lm81_8efdb5994b3b465d95f460bef048862f.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 204",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.0855987541436!2d106.35728787577226!3d10.254680068599125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310aa9cf54531d4f%3A0x3d7c4dd7b111c762!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682322335708!5m2!1svi!2s",
    },
    {
      id: 48,
      name: "SE Ben Tre - BTR",
      districtId: 6,
      rating: 5,
      location: {
        lat: 10.2425969,
        long: 106.3739361,
      },
      address: "Sense City Bến Tre, Tầng trệt, Số 26A Đường Trần Quốc Tuấn, P. An Hội, Tỉnh Vĩnh Long",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/bhn_85109e184ae142bfb4fda8de73cb2555.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 203",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.235304202852!2d106.3739360757721!3d10.242596868811814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310aa9d1bddfdc2b%3A0x18ed391006ee9603!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682322712032!5m2!1svi!2s",
    },
    {
      id: 49,
      name: "CO Quy Nhon - BDI",
      districtId: 7,
      rating: 5,
      location: {
        lat: 13.766474,
        long: 109.2188233,
      },
      address:
        "Co.opmart Quy Nhơn Bình Định Tầng trệt, Số 07 Đường Lê Duẩn, P. Quy Nhơn, Tỉnh Gia Lai",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/cbl-end-2023_9ffd91cc541c4a79aefa9f052952ba75.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 344",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.2055580852175!2d109.2188232758036!3d13.766473996952117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316f6dc85ec4f851%3A0xfaef662734e04534!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682322866212!5m2!1svi!2s",
    },
    {
      id: 50,
      name: "GO! Quy Nhon - BDI",
      districtId: 7,
      rating: 5,
      location: {
        lat: 13.7551922,
        long: 109.2053551,
      },
      address:
        "Go! Quy Nhơn, Tầng trệt, Khu đô thị xanh Vũng Chua, P. Quy Nhơn Nam, Tỉnh Gia Lai",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vincom-smart-city_f17dd80d9eed4c028f844aacc45f64c9.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 333",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.3924315816294!2d109.20535507580345!3d13.75519219721362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316f6db2000ccb79%3A0xc502106c2547740c!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682323021148!5m2!1svi!2s",
    },
    {
      id: 51,
      name: "CO Thu Dau Mot - BDU",
      districtId: 8,
      rating: 5,
      location: {
        lat: 10.9646823,
        long: 106.6650553,
      },
      address:
        "Co.opmart Thủ Dầu Một, Tầng trệt, Số 368 Đường 30/4, P. Thủ Dầu Một, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/go-an-lac-2023_60e959510ad24c9daa36094cd051f5d4.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 301",
      map: "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3916.982644969724!2d106.66505532577749!3d10.964682305691529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zVGjhur8gZ2nhu5tpIGtpbSBjxrDGoW5nIENvLm9wbWFydCBUaOG7pyBE4bqndSBN4buZdCwgVOG6p25nIHRy4buHdCwgxJDGsOG7nW5nIDMwIHRow6FuZyA0LCBQLkNow6FuaCBOZ2jEqWEsIFRo4bunIEThuqd1IE3hu5l0LCBU4buJbmggQsOsbmggRMawxqFuZw!5e0!3m2!1svi!2s!4v1682326238811!5m2!1svi!2s",
    },
    {
      id: 53,
      name: "AO Canary - BDU",
      districtId: 8,
      rating: 5,
      location: {
        lat: 10.93234,
        long: 106.7094189,
      },
      address:
        "Aeon Mall Canary, Tầng 1, Số 01 Đại lộ Bình Dương, Khu phố Bình Giao, P. Thuận Giao, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/csd_31595f8cd3954429b25bd5d375aea173.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 313",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.4103932274443!2d106.70941887577735!3d10.932339956297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175281ca7aa9583%3A0xbd4e60821b659919!2zQUVPTiBNYWxsIELDrG5oIETGsMahbmcgQ2FuYXJ5!5e0!3m2!1svi!2s!4v1682327091122!5m2!1svi!2s",
    },
    {
      id: 54,
      name: "GO Di An - BDU",
      districtId: 8,
      rating: 5,
      location: {
        lat: 10.9308369,
        long: 106.6730565,
      },
      address: "Go! Dĩ An Bình Dương, Tầng trệt, Số 2A Đường GS 01, Khu Đô thị - Thương Mại - Dịch Vụ Quảng Trường Xanh, P. Đông Hòa, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/saigon-centre-1_0d351da7b02f49fbaea91215a467bf69.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 302",
      map: "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d31339.441936728195!2d106.67305648326874!3d10.930836874675482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zdGjhur8gZ2nhu5tpIGtpbSBjxrDGoW5nIFThuqduZyB0cuG7h3QsIEtodSBQaOG7kSBUw6J5IEIsIFAuxJDDtG5nIEjDsmEsIETEqSBBbiwgVOG7iW5oIELDrG5oIETGsMahbmdvIHAudGh14bqtbiBnaWFvIHR4LnRodeG6rW4gYW4gdOG7iW5oIGLDrG5oIGTGsMahbmc!5e0!3m2!1svi!2s!4v1682327349930!5m2!1svi!2s",
    },
    {
      id: 55,
      name: "CO Dong Xoai - BPH",
      districtId: 9,
      rating: 5,
      location: {
        lat: 10.9308369,
        long: 106.6730565,
      },
      address:
        "Co.opmart Đồng Xoài, Tầng trệt, Khu TTTM Đồng Xoài, Đường Phú Riềng Đỏ, P. Bình Phước, Tỉnh Đồng Nai",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vhm_a6d113a6c4ec4ef19a348cea27f4651e.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 303",
      map: "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3909.2474587848924!2d106.89717582578214!3d11.534098194760073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zdGjhur8gZ2nhu5tpIGtpbSBjxrDGoW5nIMSQxrDhu51uZyBQaMO6IFJp4buBbmcgxJDhu48sIFAuVMOibiBCw6xuaCwgxJDhu5NuZyBYb8OgaSwgVOG7iW5oIELDrG5oIFBoxrDhu5tj!5e0!3m2!1svi!2s!4v1682327498229!5m2!1svi!2s",
    },
    {
      id: 57,
      name: "LT Phan Thiet - BTH",
      districtId: 10,
      rating: 5,
      location: {
        lat: 10.9389968,
        long: 108.1085189,
      },
      address:
        "Lotte Mart Phan Thiết, Tầng 1, Khu dân cư Hùng Vương 1, P. Phú Thủy, Tỉnh Lâm Đồng",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/sala_d0201f5800a342269010aa5348013082.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 332",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.3224548050885!2d108.10851887577728!3d10.938996756172557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317683627e71b96f%3A0x7bf2e571fd4c1902!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682327720542!5m2!1svi!2s",
    },
    {
      id: 58,
      name: "VI Ca Mau - CMA",
      districtId: 11,
      rating: 5,
      location: {
        lat: 9.1888595,
        long: 105.1304202,
      },
      address: "Vincom Plaza Cà Mau, Tầng trệt, Số 2 Đường Lê Duẩn, P. An Xuyên, Tỉnh Cà Mau",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vhl_bccd03307b814af68fb51ddbab0e83af.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 223",
      map: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7877.2366246826!2d105.13042017817499!3d9.18885949331709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1682327847613!5m2!1svi!2s",
    },
    {
      id: 59,
      name: "SE Ca Mau - CMA",
      districtId: 11,
      rating: 5,
      location: {
        lat: 9.1779261,
        long: 105.1543293,
      },
      address: "Sense City Cà Mau, Tầng trệt, Số 09 Đường Trần Hưng Đạo, P. Tân Thành, Tỉnh Cà Mau",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/ctdm-end-2023_edce351a5f1a4ac8a4f0e0c5b4a10b5a.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 208",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d246.17123876392316!2d105.15432934686015!3d9.17792611138545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a1491ca582cb4b%3A0x7d94b09b87edd3bd!2sTTTM%20Sense%20City%20C%C3%A0%20Mau!5e0!3m2!1svi!2s!4v1682328157746!5m2!1svi!2s",
    },
    {
      id: 60,
      name: "SE Can Tho - CTH",
      districtId: 12,
      rating: 5,
      location: {
        lat: 10.0346233,
        long: 105.7831791,
      },
      address: "Sense City Cần Thơ, Tầng trệt, Số 01, Đại Lộ Hòa Bình, P. Ninh Kiều, TP. Cần Thơ",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/lq11_dcc08f6ac6bd4a2b9d10f2fc0bb2639b.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 211",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.7846305059275!2d105.78317907577069!3d10.03462327243649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a063906859ff17%3A0x1120deba6d155533!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682328317646!5m2!1svi!2s",
    },
    {
      id: 61,
      name: "GO! Can Tho - CTH",
      districtId: 12,
      rating: 5,
      location: {
        lat: 10.0140093,
        long: 105.7819221,
      },
      address:
        "Go! Cần Thơ, Tầng trệt, Khu dân cư Hưng Phú 1, P. Hưng Phú, TP. Cần Thơ",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vtdh_14c5512e5c1f4e298523a5d0020cc2a6.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 200",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.0344964010715!2d105.7819220757706!3d10.014009272792029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a063f468dd13fd%3A0x26d2eaa99ff31f8a!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682328544522!5m2!1svi!2s",
    },
    {
      id: 62,
      name: "VI Xuan Khanh - CTH",
      districtId: 12,
      rating: 5,
      location: {
        lat: 10.0140355,
        long: 105.7741973,
      },
      address:
        "Vincom Plaza Xuân Khánh Cần Thơ, Tầng trệt, Số 209 Đường 30/4, P. Ninh Kiều, TP. Cần Thơ",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/article/z2808886703327_589ef08c0671b123b7faf4551347f487_bfb9b5387a754b7498a64610fa985312.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 215",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15716.136714409433!2d105.77419726006666!3d10.014035517942009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a089352c3fa9d9%3A0x9a08ca4d6fd7cc57!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682329237935!5m2!1svi!2s",
    },
    {
      id: 63,
      name: "LT Can Tho - CTH",
      districtId: 12,
      rating: 5,
      location: {
        lat: 10.0425844,
        long: 105.7562144,
      },
      address:
        "Lotte Mart Cần Thơ, Tầng trệt, Số 84 Đường Mậu Thân, P. Cái Khế, TP. Cần Thơ",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/bigc-can-tho_09f62750bd904c00b757d6bfe507b53f.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 212",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15714.751984628321!2d105.75621441738284!3d10.042584399999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a08811b07be331%3A0x29d0ca37f83f61c!2zTE9UVEUgTWFydCBD4bqnbiBUaMah!5e0!3m2!1svi!2s!4v1682329497661!5m2!1svi!2s",
    },
    {
      id: 64,
      name: "LT Da Nang - DNA",
      districtId: 13,
      rating: 5,
      location: {
        lat: 16.0350491,
        long: 108.2266531,
      },
      address:
        "Lotte Mart Đà Nẵng, Tầng 1, Số 06 Đường Nại Nam, P. Hòa Cường, TP. Đà Nẵng",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/cpt_5b7156638f7e4e41b5471c2a554d63ee.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 386",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.5860695952297!2d108.22665307583095!3d16.035049140350647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219b9476cd6fd%3A0xe393dde6fab7c375!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682329737313!5m2!1svi!2s",
    },
    {
      id: 65,
      name: "RM Riverside - DNA",
      districtId: 13,
      rating: 5,
      location: {
        lat: 16.0700677,
        long: 108.2221339,
      },
      address:
        "Indochina Riverside Mall Đà Nẵng, Tầng trệt, Số 74 Đường Bạch Đằng, P. Hải Châu, TP. Đà Nẵng",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vbh_d5f131f6361a42babfc0eec6d2b6fb0b.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 380",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.9117678845623!2d108.22213387583137!3d16.070067739414082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219917b4fa397%3A0x45cdf8829e3b14b3!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682329868219!5m2!1svi!2s",
    },
    {
      id: 66,
      name: "MM Supercenter - DNA",
      districtId: 13,
      rating: 5,
      location: {
        lat: 16.0716711,
        long: 108.2278181,
      },
      address:
        "MM Supercenter, Tầng 1, Số 167 đường Nguyễn Sinh Sắc, Phường Hòa Khánh, TP. Đà Nẵng",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/bcdla_0db82f53ff254fc881df63131c3c8324.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 390",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8808592768037!2d108.22781807583146!3d16.07167113937119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142193b4a8e78b5%3A0xbc8c23ff64692ad1!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682329976287!5m2!1svi!2s",
    },
    {
      id: 67,
      name: "VI Ngo Quyen - DNA",
      districtId: 13,
      rating: 5,
      location: {
        lat: 16.0667526,
        long: 108.1843007,
      },
      address:
        "Vincom Plaza Ngô Quyền Đà Nẵng, Tầng trệt, Số 910A Đường Ngô Quyền, P. An Hải, TP. Đà Nẵng",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/lm81_8efdb5994b3b465d95f460bef048862f.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 385",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.975663268801!2d108.18430067583145!3d16.066752639502784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142196999dff563%3A0xe420e09e5fc15339!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682330548472!5m2!1svi!2s",
    },
    {
      id: 68,
      name: "CO Buon Ma Thuot - DLK",
      districtId: 14,
      rating: 5,
      location: {
        lat: 12.6921568,
        long: 108.0593764,
      },
      address:
        "Co.opmart Buôn Ma Thuột, Tầng trệt, TTTM - Hội Chợ triển Lãm Buôn Ma Thuột, Số 71 Đường Nguyễn Tất Thành, P. Tân An, Tỉnh Đắk Lắk",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/dpg_06d205c9a3194d87a2e6160b644ae255.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 336",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3892.3256318171607!2d108.05937637579275!3d12.692156770941876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3171f790461348e1%3A0xff664eb6ee119ccc!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682388383178!5m2!1svi!2s",
    },
    {
      id: 69,
      name: "GO Buon Ma Thuot - DLK",
      districtId: 14,
      rating: 5,
      location: {
        lat: 12.6819332,
        long: 108.0415031,
      },
      address:
        "GO Buon Ma Thuot, Tầng 1, Góc đường Nguyễn Thị Định và đường Vành đai Phía Tây, P. Thành Nhất, Tỉnh Đắk Lắk",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/lm81_8efdb5994b3b465d95f460bef048862f.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 339",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3892.4819880541645!2d108.04150307579252!3d12.681933221161355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31721d6e2b69b353%3A0x6b0ffce5617f042f!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682388737273!5m2!1svi!2s",
    },
    {
      id: 70,
      name: "VI Bien Hoa - DNI",
      districtId: 15,
      rating: 5,
      location: {
        lat: 10.9576812,
        long: 106.8404943,
      },
      address:
        "Vincom Plaza Biên Hòa, Tầng trệt, Số 1096 Đường Phạm Văn Thuận, KP 2, P. Tam Hiệp, Tỉnh Đồng Nai",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/bhn_85109e184ae142bfb4fda8de73cb2555.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 310",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.0753455051704!2d106.84049427577744!3d10.957681155822815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174dd087b1ad6f1%3A0xefa384482ceccea7!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682389584263!5m2!1svi!2s",
    },
    {
      id: 72,
      name: "VI Plaza 3/2 - HCM",
      districtId: 1,
      rating: 5,
      location: {
        lat: 10.7733303,
        long: 106.6987723,
      },
      address: "Vincom Plaza 3/2, Tầng L1, Số 3-3C Đường 3 tháng 2, P. Vườn Lài, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/lm81_8efdb5994b3b465d95f460bef048862f.jpg",

      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 106",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4952412220555!2d106.69877231524096!3d10.77333026219567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4743648f3d%3A0x16ce95918cb14834!2sSaigon%20Centre!5e0!3m2!1svi!2s!4v1679970763013!5m2!1svi!2s",
    },
    {
      id: 73,
      name: "CO Cao Lanh - DTH",
      districtId: 16,
      rating: 5,
      location: {
        lat: 10.4596253,
        long: 105.6381711,
      },
      address:
        "Co.opmart Cao Lãnh Đồng Tháp, Tầng trệt, Số 01 Đường Ngô Thời Nhậm, P. Cao Lãnh, Tỉnh Đồng Tháp",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vincom-smart-city_f17dd80d9eed4c028f844aacc45f64c9.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 206",
      map: "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3923.5198273537403!2d105.63817107577371!3d10.459625264955818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zVGjhur8gZ2nhu5tpIGtpbSBjxrDGoW5nIENvLm9wbWFydCBDYW8gTMOjbmggxJDhu5NuZyBUaMOhcA!5e0!3m2!1svi!2s!4v1682393808721!5m2!1svi!2s",
    },
    {
      id: 74,
      name: "CO Sa Dec - DTH",
      districtId: 16,
      rating: 5,
      location: {
        lat: 10.289664,
        long: 105.7578459,
      },
      address:
        "Co.opmart Sa Đéc Đồng Tháp, Tầng trệt, Đường Nguyễn Sinh Khắc, Khóm 2, P. Sa Đéc, Tỉnh Đồng Tháp",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/go-an-lac-2023_60e959510ad24c9daa36094cd051f5d4.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 214",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d981.4127946627087!2d105.75784593442567!3d10.289664017424048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a7f2b9679a861%3A0x1d1cec1825dfb3f3!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682394037404!5m2!1svi!2s",
    },
    {
      id: 75,
      name: "CO Pleiku - GLA",
      districtId: 17,
      rating: 5,
      location: {
        lat: 13.9874362,
        long: 108.0072056,
      },
      address:
        "Co.opmart Pleiku, Tầng trệt, Số 21 Đường Cách Mạng Tháng Tám, P. Pleiku, Tỉnh Gia Lai",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vcm_01b1844ff1ea4198acee8f3ef56f4111.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 334",
      map: "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1935.7576127554053!2d108.0072056415134!3d13.987436221254788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zVGjhur8gZ2nhu5tpIGtpbSBjxrDGoW5nIENvLm9wbWFydCBQbGVpa3UsIFThuqduZyB0cuG7h3QsIFPhu5EgMjEgQ8OhY2ggTeG6oW5nIFRow6FuZyBUw6FtLCBQLkhvYSBMxrAsIFBsZWlrdSxU4buJbmggR2lhIExhaQ!5e0!3m2!1svi!2s!4v1682394190064!5m2!1svi!2s",
    },
    {
      id: 76,
      name: "VI Ha Tinh - HTI",
      districtId: 18,
      rating: 5,
      location: {
        lat: 18.3377121,
        long: 105.8930841,
      },
      address:
        "Vincom Plaza Hà Tĩnh, Tầng trệt, Góc ngã tư đường Hàm Nghi và đường Hà Huy Tập, P. Thành Sen, Tỉnh Hà Tĩnh",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/csd_31595f8cd3954429b25bd5d375aea173.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 409",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3787.209769084613!2d105.89308407586438!3d18.33771207473301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31384faaa2010dfb%3A0x55fcf2738764d1db!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682394446084!5m2!1svi!2s",
    },
    {
      id: 77,
      name: "VI Vu Yen - HPH",
      districtId: 19,
      rating: 5,
      location: {
        lat: 20.8659659,
        long: 106.6866721,
      },
      address:
        "Tầng 1, TTTM Vincom Royal Island, Khu B1, Khu vui chơi giải trí, nhà ở và công viên sinh thái đảo Vũ Yên, Phường Thủy Nguyên, Thành phố Hải Phòng, Việt Nam",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/saigon-centre-1_0d351da7b02f49fbaea91215a467bf69.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 410",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.1509299531517!2d106.68667208557423!3d20.865965943712723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7be9f726201f%3A0x88e167df81bba3ec!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682394764892!5m2!1svi!2s",
    },
    {
      id: 78,
      name: "VI Imperia - PHP",
      districtId: 19,
      rating: 5,
      location: {
        lat: 20.863137,
        long: 106.6595521,
      },
      address:
        "Vincom Plaza Imperia Hải Phòng, Tầng trệt, P. Hồng Bàng, TP. Hải Phòng",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vhm_a6d113a6c4ec4ef19a348cea27f4651e.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 408",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.221091777936!2d106.65955207590736!3d20.863136993445142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7b1c59bfcb6b%3A0x115f43e89d349c57!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682395285727!5m2!1svi!2s",
    },
	
    {
      id: 79,
      name: "AEON Hue - TTH",
      districtId: 20,
      rating: 5,
      location: {
        lat: 16.4631235,
        long: 107.5935466,
      },
      address:
        "TTTM Aeon Mall Huế, Concess-02, tầng 2, Số 08 Đường Võ Nguyên Giáp, P. An Cựu, TP. Huế",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vhl_bccd03307b814af68fb51ddbab0e83af.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 381",
      map: "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1137.54946772332!2d107.5935466025254!3d16.463123492304472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5nIFZpbmNvbSBQbGF6YSBIdeG6vywgVOG6p25nIHRy4buHdCAsIDUwQSBIw7luZyBWxrDGoW5nLCBQLiBQaMO6IE5odeG6rW4sIFRQLiBIdeG6vywgVOG7iW5oIFRo4burYSBUaGnDqm4gSHXhur8!5e0!3m2!1svi!2s!4v1682396003519!5m2!1svi!2s",
    },
    {
      id: 80,
      name: "AO Le Chan - HPH",
      districtId: 19,
      rating: 5,
      location: {
        lat: 20.8327471,
        long: 106.6813838,
      },
      address:
        "Aeon Lê Chân, Tầng 2, P. Lê Chân, TP. Hải Phòng",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/sala_d0201f5800a342269010aa5348013082.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 401",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1567.8405308134086!2d106.68138379234!3d20.832747117594213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a71806957c10b%3A0x146c3dafa2f5b1da!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682395743951!5m2!1svi!2s",
    },
    {
      id: 81,
      name: "VI Hue - TTH",
      districtId: 20,
      rating: 5,
      location: {
        lat: 16.4631235,
        long: 107.5935466,
      },
      address:
        "Vincom Plaza Huế, Tầng trệt, Số 50A Đường Hùng Vương, P. Thuận Hoá, TP. Huế",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vhl_bccd03307b814af68fb51ddbab0e83af.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 387",
      map: "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1137.54946772332!2d107.5935466025254!3d16.463123492304472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5nIFZpbmNvbSBQbGF6YSBIdeG6vywgVOG6p25nIHRy4buHdCAsIDUwQSBIw7luZyBWxrDGoW5nLCBQLiBQaMO6IE5odeG6rW4sIFRQLiBIdeG6vywgVOG7iW5oIFRo4burYSBUaGnDqm4gSHXhur8!5e0!3m2!1svi!2s!4v1682396003519!5m2!1svi!2s",
    },
    {
      id: 82,
      name: "LT Nha Trang - KHO",
      districtId: 21,
      rating: 5,
      location: {
        lat: 12.2519023,
        long: 109.1744553,
      },
      address:
        "Lotte Mart Nha Trang, Tầng trệt, Số 58 Đường 23/10, P. Tây Nha Trang, Tỉnh Khánh Hòa",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/lm81_8efdb5994b3b465d95f460bef048862f.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 342",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.9464632610698!2d109.17445527578852!3d12.251902280246908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31705d12474316ff%3A0xfbcfc09369c39886!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682396525560!5m2!1svi!2s",
    },
    {
      id: 83,
      name: "GC Nha Trang - KHO",
      districtId: 21,
      rating: 5,
      location: {
        lat: 12.2480934,
        long: 109.1925997,
      },
      address:
        "Gold Coast Nha Trang, Tầng trệt, Số 01 Đường Trần Hưng Đạo, P. Nha Trang, Tỉnh Khánh Hòa",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/ctdm-end-2023_edce351a5f1a4ac8a4f0e0c5b4a10b5a.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 343",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3899.0027393560313!2d109.19259972578838!3d12.248093430325948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3170670076c54609%3A0x2967f724f684f114!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682396820632!5m2!1svi!2s",
    },
    {
      id: 84,
      name: "CO Rach Gia - KGI",
      districtId: 22,
      rating: 5,
      location: {
        lat: 10.0033663,
        long: 105.0681241,
      },
      address:
        " Co.opmart Rạch Giá, Tầng trệt, khu TTTM tổng hợp 16 ha, P. Rạch Giá, Tỉnh An Giang",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/lq11_dcc08f6ac6bd4a2b9d10f2fc0bb2639b.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 201",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1964.5414861548313!2d105.08316601570375!3d10.010005131482128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0b3e24150a847%3A0x4c40f900b8a59ff2!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682397146019!5m2!1svi!2s",
    },
    {
      id: 85,
      name: "VI Rach gia - KGI",
      districtId: 22,
      rating: 5,
      location: {
        lat: 10.0033401,
        long: 105.0781449,
      },
      address:
        "Vincom Plaza Rạch Giá, Tầng trệt, Lô A12, Khu phố 1, Đường Cô Bắc, P. Rạch Giá, Tỉnh An Giang",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vtdh_14c5512e5c1f4e298523a5d0020cc2a6.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 218",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.16361990543!2d105.07814487577053!3d10.00334007297573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0b34e4cfe13a7%3A0x539d38f39875df7f!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682397393368!5m2!1svi!2s",
    },
    {
      id: 86,
      name: "CO Bao Loc - LDO",
      districtId: 23,
      rating: 5,
      location: {
        lat: 11.5477622,
        long: 107.8025484,
      },
      address:
        "Co.opmart Bảo Lộc, Tầng trệt, Tháp Nước Đường Trần Phú, P. 2 Bảo Lộc, Tỉnh Lâm Đồng",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/bigc-can-tho_09f62750bd904c00b757d6bfe507b53f.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 341",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.0570936745585!2d107.80254837578227!3d11.547762244491551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3173f7b947eec8bb%3A0x69db30b7386fc9e1!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682397555471!5m2!1svi!2s",
    },
    {
      id: 87,
      name: "GO! Da Lat - LDO",
      districtId: 23,
      rating: 5,
      location: {
        lat: 11.9385558,
        long: 108.4423429,
      },
      address:
        "Go Đà Lạt, Tầng trệt, Quảng trường Lâm viên, Góc đường Hồ Tùng Mậu và Trần Quốc Toản, P. Xuân Hương Đà Lạt, Tỉnh Lâm Đồng",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/cpt_5b7156638f7e4e41b5471c2a554d63ee.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 331",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.518563418279!2d108.4423428757857!3d11.938555836682852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31711324cc1c7593%3A0xf5f9cd223eca9770!2zR08hIMSQw6AgTOG6oXQ!5e0!3m2!1svi!2s!4v1682397818751!5m2!1svi!2s",
    },
    {
      id: 88,
      name: "AO Tan An - TNI",
      districtId: 24,
      rating: 5,
      location: {
        lat: 10.5351396,
        long: 106.4100959,
      },
      address: "Aeon Tân An, Tầng 1, Số 84 tuyến tránh Quốc lộ 1, KP Bình Cư 3, Phường Long An, Tỉnh Tây Ninh, Việt Nam",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vbh_d5f131f6361a42babfc0eec6d2b6fb0b.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 217",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1386.8350178368466!2d106.41009591781922!3d10.535139640361223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310ab71ecc31b143%3A0xf678a9318c0b80c5!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682398036289!5m2!1svi!2s",
    },
    {
      id: 89,
      name: "Vincom Plaza Vinh – NAN",
      districtId: 25,
      rating: 5,
      location: {
        lat: 18.6662362,
        long: 105.6721628,
      },
      address: "Vincom Plaza Vinh, Tầng L1, Số 16 đường Quang Trung, Phường Thành Vinh, Tỉnh Nghệ An",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/bcdla_0db82f53ff254fc881df63131c3c8324.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 418",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3779.9500745945024!2d105.6721627758696!3d18.666236214707133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3139cf9c7100c787%3A0x59232d8969269736!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682398234540!5m2!1svi!2s",
    },
    {
      id: 90,
      name: "VI Phan Rang - NTH",
      districtId: 26,
      rating: 5,
      location: {
        lat: 11.5640109,
        long: 109.0065572,
      },
      address:
        "Vincom Phan Rang Tầng trệt, TTTM Vincom+164, Phan Rang, số 122 Đường 16/4, P. Đông Hải, Tỉnh Khánh Hòa",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/dpg_06d205c9a3194d87a2e6160b644ae255.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 340",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.83043029966!2d109.0065571757824!3d11.564010944171628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3170cfa44aefdd5b%3A0x41b4d0cba529d947!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682398356465!5m2!1svi!2s",
    },
    {
      id: 91,
      name: "CO Tuy Hoa - PYE",
      districtId: 27,
      rating: 5,
      location: {
        lat: 13.0888372,
        long: 109.3076211,
      },
      address:
        "Co.opMart Tuy Hòa, tầng trệt., Ô phố B8, Khu dân dụng Duy Tân, P. Tuy Hòa, Tỉnh Đăk Lăk",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/bhn_85109e184ae142bfb4fda8de73cb2555.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 337",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.163266008712!2d109.30762107579652!3d13.088837212295603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316fed8dc3736ba5%3A0xd98a556e830ba57c!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682398509352!5m2!1svi!2s",
    },
    {
      id: 95,
      name: "VI Dong Ha - QTR",
      districtId: 28,
      rating: 5,
      location: {
        lat: 17.4653975,
        long: 106.6236299,
      },
      address:
        "Vincom Đông Hà, Tầng trệt, Thửa đất số 579, Tờ bản đồ 29, P. Nam Đônng Hà, Tỉnh Quảng Trị.",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/cbl-end-2023_9ffd91cc541c4a79aefa9f052952ba75.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 389",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.8812375702246!2d106.62362987585104!3d17.465397500551802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3147576a6ec02c25%3A0x3ef384a6651344e4!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682398664375!5m2!1svi!2s",
    },
    {
      id: 93,
      name: "VI Quang Ngai - QNG",
      districtId: 29,
      rating: 5,
      location: {
        lat: 15.1135107,
        long: 108.8077056,
      },
      address:
        "Vincom Plaza Quảng Ngãi, Tầng trệt, Tổ hợp TTTM và nhà phố Shophouse Vincom Quảng Ngãi, Số 26 Đường Lê Thánh Tôn, P. Cẩm Thành, Tỉnh Quảng Ngãi.",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vincom-smart-city_f17dd80d9eed4c028f844aacc45f64c9.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 382",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3851.815195159813!2d108.80770557581923!3d15.11351066431214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316853dd2f6b66b9%3A0x18840afe24bfc810!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682398801560!5m2!1svi!2s",
    },
    {
      id: 94,
      name: "VI Ha Long - QNI",
      districtId: 30,
      rating: 5,
      location: {
        lat: 20.950384,
        long: 107.0815731,
      },
      address:
        "Vincom Plaza Hạ Long, Tầng trệt, Khu Cột đồng hồ, P. Hồng Gai, Tỉnh Quảng Ninh",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/go-an-lac-2023_60e959510ad24c9daa36094cd051f5d4.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 407",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726.053065828587!2d107.0815730759091!3d20.95038399046461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a59e42bd1045d%3A0x4f2bc3817dee3b3!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682405068480!5m2!1svi!2s",
    },
    {
      id: 95,
      name: "CO Dong Ha - QTR",
      districtId: 31,
      rating: 5,
      location: {
        lat: 16.8227749,
        long: 107.0964051,
      },
      address:
        "Co.opmart Đông Hà, Tầng trệt, Số 02 Đường Trần Hưng Đạo, P. Đông Hà, Tỉnh Quảng Trị",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vcm_01b1844ff1ea4198acee8f3ef56f4111.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 384",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.0721802439975!2d107.09640512584174!3d16.82277491882352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3140ef564033d12d%3A0x9a98dd2fbdaa8177!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682405262490!5m2!1svi!2s",
    },
    {
      id: 96,
      name: "CO Soc Trang - STR",
      districtId: 32,
      rating: 5,
      location: {
        lat: 9.6143275,
        long: 105.9675092,
      },
      address: "Co.opmart Sóc Trăng, Tầng trệt, Số 06 Đường Hùng Vương, P. Sóc Trăng, TP. Cần Thơ",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/csd_31595f8cd3954429b25bd5d375aea173.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 205",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1966.8892717341814!2d105.96750918877855!3d9.61432754215543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a053282e0edcc1%3A0xdd009a47e7202444!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682405616147!5m2!1svi!2s",
    },
    {
      id: 97,
      name: "CO Tay Ninh - TNI",
      districtId: 33,
      rating: 5,
      location: {
        lat: 11.308136,
        long: 106.1064464,
      },
      address: "Co.opmart Tây Ninh, Tầng trệt, Số 576 Đường Cách Mạng Tháng 8, P. Tân Ninh, Tỉnh Tây Ninh",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/saigon-centre-1_0d351da7b02f49fbaea91215a467bf69.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 305",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.36327564802!2d106.10644642578023!3d11.308136049159762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310b6bfced9a1ca5%3A0x278c8c59f68d4d93!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682405760091!5m2!1svi!2s",
    },
    {
      id: 98,
      name: "CO Go Dau - TNI",
      districtId: 33,
      rating: 5,
      location: {
        lat: 11.0908749,
        long: 106.2636342,
      },
      address:
        "Co.opmart Gò Dầu Tây Ninh, Tầng trệt, Quốc lộ 22B, Khu Phố Rạch Sơn, P. Gò Dầu, Tỉnh Tây Ninh",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vhm_a6d113a6c4ec4ef19a348cea27f4651e.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 312",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1957.6508666919374!2d106.26363418878111!3d11.090874879385474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310b3b21287dbf5b%3A0x55fa35d5e10ac489!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682406043847!5m2!1svi!2s",
    },
    {
      id: 99,
      name: "CO Trang Bang - TNI",
      districtId: 33,
      rating: 5,
      location: {
        lat: 11.0308523,
        long: 106.3535651,
      },
      address:
        "Co.opmart Trảng Bàng, Tầng trệt, Khu phố Lộc An, P. Trảng Bàng, Tỉnh Tây Ninh",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/lgv_772109beb29d431e83b63fbd735b0ec6.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 307",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1036163143376!2d106.35356507577805!3d11.030852254447694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310b2f785692418f%3A0xf215641fb1b84a71!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682406168060!5m2!1svi!2s",
    },
    {
      id: 100,
      name: "GO My Tho - TGI",
      districtId: 34,
      rating: 5,
      location: {
        lat: 10.359053,
        long: 106.3315128,
      },
      address:
        "GO! Mỹ Tho Tiền Giang, Tầng trệt, Số 545 Đường Lê Văn Phẩm, P. Đạo Thạnh, Tỉnh Đồng Tháp",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/sala_d0201f5800a342269010aa5348013082.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 222",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7849.570394251353!2d106.3315127935791!3d10.359053000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310aa5e7120dafb9%3A0xd4352a79de5d3bef!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682406324515!5m2!1svi!2s",
    },
    {
	  id: 101,
	  name: "GO! Ninh Thuan – NTH",
	  districtId: 26,
	  rating: 5,
	  location: {
		lat: 11.5640109,
		long: 109.0065572,
	  },
	  address:
		"GO! Ninh Thuận, Tầng trệt, Góc ngã tư đường Cao Bá Quát - Ngô Gia Tự, Khu phố 14, P. Phan Rang, Tỉnh Khánh Hòa",
	  views: 100,
	  image:
		"https://file.hstatic.net/1000381168/file/dpg_06d205c9a3194d87a2e6160b644ae255.jpg",
	  hours: {
		opening: [9, 0, "AM"],
		closing: [21, 0, "PM"],
	  },
	  days: {
		opening: 1,
		closing: 7,
	  },
	  hotline: "18009298 Ext: 335",
	  map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.83043029966!2d109.0065571757824!3d11.564010944171628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3170cfa44aefdd5b%3A0x41b4d0cba529d947!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682398356465!5m2!1svi!2s",
	},
    {
      id: 103,
      name: "VI Vinh Long - VLO",
      districtId: 35,
      rating: 5,
      location: {
        lat: 10.246492,
        long: 105.9750611,
      },
      address: "Vincom Plaza Vĩnh Long, Tầng 1, Số 55 Đường Phạm Thái Bường, P. Phước Hậu, Tỉnh Vĩnh Long",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/vhl_bccd03307b814af68fb51ddbab0e83af.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 219",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.1870643391403!2d105.97506107934569!3d10.246492000000009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a9d92816c0341%3A0xc8d7168afe7011e4!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682406590907!5m2!1svi!2s",
    },
    {
      id: 104,
      name: "CO Vinh Long - VLO",
      districtId: 35,
      rating: 5,
      location: {
        lat: 10.2550766,
        long: 105.9681079,
      },
      address: "Co.opmart Vĩnh Long, Tầng trệt, Số 26 Đường 3/2, P. Long Châu, Tỉnh Vĩnh Long",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/ctdm-end-2023_edce351a5f1a4ac8a4f0e0c5b4a10b5a.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 209",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.0806833373695!2d105.96810787577233!3d10.255076568592207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a9d674f6ab165%3A0xfa364460fd83e3f!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682406718715!5m2!1svi!2s",
    },
    {
      id: 105,
      name: "Hung Vuong Plaza - HCM",
      districtId: 1,
      rating: 5,
      location: {
        lat: 10.7562563,
        long: 106.6604872,
      },
      address:
        "Tầng 02 Hùng Vương Plaza, Số 126 Đường Hồng Bàng, P. Chợ Lớn, TP. HCM",
      views: 101,
      image:
        "https://file.hstatic.net/1000381168/file/vhm_a6d113a6c4ec4ef19a348cea27f4651e.jpg",
      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 110",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6239034853097!2d106.65436407577596!3d10.763441259431648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1eafbff8c3%3A0x65b293c0212368a0!2zVGjhur8gR2nhu5tpIEtpbSBDxrDGoW5n!5e0!3m2!1svi!2s!4v1682308897566!5m2!1svi!2s",
    },
    {
      id: 106,
      name: "VI Mega Mall Grand Park - HCM",
      districtId: 1,
      rating: 5,
      location: {
        lat: 10.7733303,
        long: 106.6987723,
      },
      address: "Vincom Mega Mall Grand Park, Tầng L1, Số 88 Đường Phước Thiện, P. Long Bình, TP. HCM",
      views: 100,
      image:
        "https://file.hstatic.net/1000381168/file/lm81_8efdb5994b3b465d95f460bef048862f.jpg",

      hours: {
        opening: [9, 0, "AM"],
        closing: [21, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "18009298 Ext: 104",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4952412220555!2d106.69877231524096!3d10.77333026219567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4743648f3d%3A0x16ce95918cb14834!2sSaigon%20Centre!5e0!3m2!1svi!2s!4v1679970763013!5m2!1svi!2s",
    }
  ],
});

export const categoriesState = selector({
  key: "categories",
  get: () => ["Pizza", "Pasta", "Salad", "Sandwich", "Drink"],
});

export const menuState = selector({
  key: "menu",
  get: ({ get }) => {
    const categories = get(categoriesState);
    const foods = get(foodsState);
    return {
      categories: categories.map((category, index) => ({
        id: String(index),
        name: category,
        foods: foods.filter((food) => food.categories.includes(category)),
      })),
    };
  },
});

export const foodsState = selector({
  key: "foods",
  get: () => [
    {
      id: 1,
      name: "Daily Pizza",
      price: 400000,
      image:
        "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      categories: ["Pizza", "Pasta", "Salad", "Sandwich", "Drink"],
      description: `Pizza Hải Sản Xốt Pesto Với Hải Sản (Tôm, Mực) Nhân Đôi Cùng Với Nấm Trên Nền Xốt Pesto Đặc Trưng, Phủ Phô Mai Mozzarella Từ New Zealand Và Quế Tây.`,
      options: [
        {
          key: "cheese",
          label: "Thêm phô mai",
          selected: true,
        },
        {
          key: "no-onion",
          label: "Không hành",
          selected: false,
        },
        {
          key: "seafood",
          label: "Thêm hải sản",
          selected: false,
        },
      ],
      extras: [
        {
          key: "size",
          label: "Size (Khẩu phần)",
          options: [
            {
              key: "small",
              label: "Nhỏ",
            },
            {
              key: "medium",
              label: "Vừa",
              selected: true,
            },
            {
              key: "large",
              label: "To",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Prosciutto",
      price: 400000,
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      categories: ["Pizza"],
      description: `Pizza Hải Sản Xốt Pesto Với Hải Sản (Tôm, Mực) Nhân Đôi Cùng Với Nấm Trên Nền Xốt Pesto Đặc Trưng, Phủ Phô Mai Mozzarella Từ New Zealand Và Quế Tây.`,
      options: [
        {
          key: "cheese",
          label: "Thêm phô mai",
          selected: true,
        },
        {
          key: "no-onion",
          label: "Không hành",
          selected: false,
        },
        {
          key: "seafood",
          label: "Thêm hải sản",
          selected: false,
        },
      ],
      extras: [
        {
          key: "size",
          label: "Size (Khẩu phần)",
          options: [
            {
              key: "small",
              label: "Nhỏ",
            },
            {
              key: "medium",
              label: "Vừa",
              selected: true,
            },
            {
              key: "large",
              label: "To",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Prosciutto",
      price: 400000,
      image:
        "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80",
      categories: ["Pizza", "Drink"],
      description: `Pizza Hải Sản Xốt Pesto Với Hải Sản (Tôm, Mực) Nhân Đôi Cùng Với Nấm Trên Nền Xốt Pesto Đặc Trưng, Phủ Phô Mai Mozzarella Từ New Zealand Và Quế Tây.`,
      options: [
        {
          key: "cheese",
          label: "Thêm phô mai",
          selected: true,
        },
        {
          key: "no-onion",
          label: "Không hành",
          selected: false,
        },
        {
          key: "seafood",
          label: "Thêm hải sản",
          selected: false,
        },
      ],
      extras: [
        {
          key: "size",
          label: "Size (Khẩu phần)",
          options: [
            {
              key: "small",
              label: "Nhỏ",
            },
            {
              key: "medium",
              label: "Vừa",
              selected: true,
            },
            {
              key: "large",
              label: "To",
            },
          ],
        },
      ],
    },
    {
      id: 4,
      name: "Daily Pizza",
      price: 400000,
      image:
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
      categories: ["Pizza", "Drink"],
      description: `Pizza Hải Sản Xốt Pesto Với Hải Sản (Tôm, Mực) Nhân Đôi Cùng Với Nấm Trên Nền Xốt Pesto Đặc Trưng, Phủ Phô Mai Mozzarella Từ New Zealand Và Quế Tây.`,
      options: [
        {
          key: "cheese",
          label: "Thêm phô mai",
          selected: true,
        },
        {
          key: "no-onion",
          label: "Không hành",
          selected: false,
        },
        {
          key: "seafood",
          label: "Thêm hải sản",
          selected: false,
        },
      ],
      extras: [
        {
          key: "size",
          label: "Size (Khẩu phần)",
          options: [
            {
              key: "small",
              label: "Nhỏ",
            },
            {
              key: "medium",
              label: "Vừa",
            },
            {
              key: "large",
              label: "To",
            },
          ],
        },
      ],
    },
  ],
});

export const keywordState = atom({
  key: "keyword",
  default: "",
});

export const districtsState = selector({
  key: "districts",
  get: () => [
    {
      id: 1,
      name: "Hồ Chí Minh",
    },
    {
      id: 2,
      name: "Hà Nội",
    },
    {
      id: 3,
      name: "An Giang",
    },
    {
      id: 4,
      name: "Bà Rịa - Vũng Tàu",
    },
    {
      id: 5,
      name: "Bạc Liêu",
    },
    {
      id: 6,
      name: "Bến Tre",
    },
    {
      id: 7,
      name: "Bình Định",
    },
    {
      id: 8,
      name: "Bình Dương",
    },
    {
      id: 9,
      name: "Bình Phước",
    },
    {
      id: 10,
      name: "Bình Thuận",
    },
    {
      id: 11,
      name: "Cà Mau",
    },
    {
      id: 12,
      name: "Cần Thơ",
    },
    {
      id: 13,
      name: "Đà Nẵng",
    },
    {
      id: 14,
      name: "Đắk Lắk",
    },
    {
      id: 15,
      name: "Đồng Nai",
    },
    {
      id: 16,
      name: "Đồng Tháp",
    },
    {
      id: 17,
      name: "Gia Lai",
    },
    {
      id: 18,
      name: "Hà Tĩnh",
    },
    {
      id: 19,
      name: "Hải Phòng",
    },
    {
      id: 20,
      name: "Huế",
    },
    {
      id: 21,
      name: "Khánh Hòa",
    },
    {
      id: 22,
      name: "Kiên Giang",
    },
    {
      id: 23,
      name: "Lâm Đồng",
    },
    {
      id: 24,
      name: "Long An",
    },
    {
      id: 25,
      name: "Nghệ An",
    },
    {
      id: 26,
      name: "Ninh Thuận",
    },
    {
      id: 27,
      name: "Phú Yên",
    },
    {
      id: 28,
      name: "Quảng Bình",
    },
    {
      id: 29,
      name: "Quảng Ngãi",
    },
    {
      id: 30,
      name: "Quảng Ninh",
    },
    {
      id: 31,
      name: "Quảng Trị",
    },
    {
      id: 32,
      name: "Sóc Trăng",
    },
    {
      id: 33,
      name: "Tây Ninh",
    },
    {
      id: 34,
      name: "Tiền Giang",
    },
    {
      id: 35,
      name: "Vĩnh Long",
    },
  ],
});

export const selectedDistrictState = atom({
  key: "selectedDistrict",
  default: 1,
});

export const popularRestaurantsState = selector<Restaurant[]>({
  key: "popularRestaurants",
  get({ get }) {
    const restaurants = get(restaurantsState);
    const keyword = get(keywordState);
    const selectedDistrict = get(selectedDistrictState);
    return restaurants
      .filter((restaurant) =>
        restaurant.name.toLowerCase().includes(keyword.toLowerCase())
      )
      .filter(
        (restaurant) =>
          selectedDistrict === 0 || restaurant.districtId === selectedDistrict
      )
      .filter((restaurant) => restaurant.views >= 50);
  },
});

export const nearestRestaurantsState = selector<Restaurant[]>({
  key: "nearestRestaurants",
  get({ get }) {
    const restaurants = get(restaurantsState);
    const position = get(positionState);
    if (position) {
      return [...restaurants].sort((a, b) => {
        const aDistance = calcCrowFliesDistance(position, a.location);
        const bDistance = calcCrowFliesDistance(position, b.location);
        return aDistance - bDistance;
      });
    }
    return restaurants;
  },
});

export const currentRestaurantTabState = atom<TabType>({
  key: "currentRestaurantTab",
  default: "info",
});

export const cartState = atom<Cart>({
  key: "cart",
  default: {
    items: [],
  },
});

export const totalState = selector({
  key: "total",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.items.reduce(
      (total, item) => total + item.quantity * item.food.price,
      0
    );
  },
});

export const bookingsState = atom<Booking[]>({
  key: "bookings",
  default: [],
  effects: [
    ({ setSelf, getPromise }) => {
      // generate a demo booking item, can be safely deleted if you don't need it
      Promise.all([getPromise(restaurantsState), getPromise(foodsState)]).then(
        ([restaurants, foods]) => {
          setSelf((bookings) => [
            ...(Array.isArray(bookings) ? bookings : []),
            {
              id: "1234567890",
              restaurant: restaurants[0],
              cart: {
                items: [
                  {
                    quantity: 1,
                    food: foods[0],
                    note: "",
                  },
                  {
                    quantity: 2,
                    food: foods[1],
                    note: "Kèm ớt trái",
                  },
                ],
              },
              bookingInfo: {
                date: new Date(),
                hour: [20, 0, "PM"],
                table: "05",
                seats: 4,
              },
            },
          ]);
        }
      );
    },
  ],
});
