// //GET API

// import React, { FunctionComponent, useEffect, useState } from "react";
// import axios from "axios";

// import "../../css/styles.css"; // Import file CSS tùy chỉnh

// interface ZaloArticle {
//   id: string;
//   title: string;
//   content: string;
//   thumb: string;
//   link_view: string;
// }

// interface ZaloOAProps {
//   // Thêm các props khác nếu cần
// }

// const ZaloOA: FunctionComponent<ZaloOAProps> = () => {
//   const [articleList, setArticleList] = useState<ZaloArticle[]>([]);
//   const apiEndpoint = "https://openapi.zalo.me/v2.0/article/getslice";
//   const accessToken = "kiQARTH7Xp6pnuHdsKA9FxJ3YMFPNUXwpBwG9FbvrHBlZhfDzM6wSD-XjswpNCDAbuAlUffAt7E3oDrelWcSJRVWptgR8BHpggIqSwLsosw__vHda3VtIRZ_X7-92kPThVEmKAjpjWUMah4C_qNI0CYQamUcIEWHZg6N7OzmnJgUZzqCX6ga6fkhmHIkIim8YfE30AvIyGctb9PHWK78J9EYq6wUST9KZOwo3OLLopgBX9OYuNVh2_oWxY_hMRKEq8pOAUDqs7_lWRWey4lEAPY3Wow_USGNfgIWEfCvp1cFo9C4uHx4MyZ9f6BTJDbzxC_RSS4KlaJybU4Rnqhi4V2mxHZMDvj4n_VOOTutjrwvyS43Wsow7RQ-uZYxQ8KOX_Ny3kyfy0ZQoRG9wGpg834oNh0rRz1OZZ0"; // Thay thế bằng access token của bạn

//   useEffect(() => {
//     const fetchArticleList = async () => {
//       try {
//         const response = await axios.get(apiEndpoint, {
//           params: {
//             Offset: 0, // Thay đổi Offset và Limit theo nhu cầu
//             limit: 10,
//             type: "normal",
//             access_token: accessToken,
//           },
//         });

//         if (response.data.error === 0) {
//           const articles = response.data.data.medias;
//           setArticleList(articles);
//         } else {
//           console.error("Lỗi khi gọi API:", response.data.message);
//         }
//       } catch (error) {
//         console.error("Lỗi khi gọi API:", error);
//       }
//     };

//     fetchArticleList();
//   }, []); // Thêm [] để đảm bảo chỉ gọi API một lần khi component được render

//   return (
//     <div className="zalo-oa">
//       <h3 className="zalo-oa-heading">Danh sách bài viết</h3>
//       <ul className="zalo-oa-list">
//         {articleList.map((article) => (
//           <li className="zalo-oa-item" key={article.id}>
//             <h2 className="zalo-oa-title">{article.title}</h2>
//             <p className="zalo-oa-content">{article.content}</p>
//             <img className="zalo-oa-thumb" src={article.thumb} alt={article.title} />
//             <a className="zalo-oa-link" href={article.link_view} target="_blank" rel="noopener noreferrer">
//               Xem chi tiết
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ZaloOA;





// -----------------------------------------Show 10 bài viết / page-----------------------------------------

// GET Product

// import React, { FunctionComponent, useState } from "react";
// import { Box, Button, Text } from "zmp-ui";
// import "../../css/styles.css";
// import contentData from "../../api/content.json";

// interface ZaloArticle {
//   id: string;
//   title: string;
//   content: string;
//   thumb: string;
//   link_view: string;
// }

// interface ZaloOAProps {
//   // Thêm các props khác nếu cần
// }

// const ZaloOA: FunctionComponent<ZaloOAProps> = () => {
//   const [showMore, setShowMore] = useState(false);
//   const sampleArticles = contentData.slice(
//     0,
//     showMore ? contentData.length : 10
//   );

//   return (
//     <div className="zalo-oa">
//       <h3 className="zalo-oa-heading">Danh sách bài viết</h3>
//       <ul className="zalo-oa-list">
//         {sampleArticles.map((article) => (
//           <li className="zalo-oa-item" key={article.id}>
//             <h2 className="zalo-oa-title">{article.title}</h2>
//             <p className="zalo-oa-content">{article.content}</p>
//             <img
//               className="zalo-oa-thumb"
//               src={article.thumb}
//               alt={article.title}
//             />
//             <a
//               className="zalo-oa-link"
//               href={article.link_view}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Xem chi tiết
//             </a>
//           </li>
//         ))}
//       </ul>
//       <div className="button-container">
//         {contentData.length > 10 && (

//           <Button
//             style={{
//               backgroundColor: "silver",
//               margin: "0 auto",
//               display: "block",
//               marginBottom: 20,
//             }}
//             className="show-more-button"
//             onClick={() => setShowMore(!showMore)}
//           >
//             {showMore ? "Ẩn đi" : "Xem thêm"}
//           </Button>

//         )}
//       </div>
//       <div style={{ width: "100%", marginLeft: 10, marginTop: 15 }}>
//         <Text style={{ marginBottom: 5 }}>
//           ►Hệ thống cửa hàng: <a href="#">http://tgkc.vn/cua-hang</a>
//         </Text>
//         <Text style={{ marginBottom: 5 }}>
//           ►Website: <a href="#">https://thegioikimcuong.vn</a>
//         </Text>
//         <Text style={{ marginBottom: 5 }}>
//           ►Liên hệ: <b>18009298</b> (Miễn phí cước gọi)
//         </Text>
//       </div>
//     </div>
//   );
// };

// export default ZaloOA;





// -----------------------------------------Show 5 bài viết / page-----------------------------------------


// import React, { FunctionComponent, useState } from "react";
// import { Box, Button, Text } from "zmp-ui";
// import "../../css/styles.css";
// import contentData from "../../api/content.json";

// interface ZaloArticle {
//   id: string;
//   title: string;
//   content: string;
//   thumb: string;
//   link_view: string;
// }

// interface ZaloOAProps {
//   // Thêm các props khác nếu cần
// }

// const ZaloOA: FunctionComponent<ZaloOAProps> = () => {
//   const [showMore, setShowMore] = useState(false);
//   const maxVisible = showMore ? contentData.length : 5; // Hiển thị tối đa 5 bài viết
//   const sampleArticles = contentData.slice(0, maxVisible);

//   return (
//     <div className="zalo-oa">
//       <h3 className="zalo-oa-heading">Danh sách bài viết</h3>
//       <ul className="zalo-oa-list">
//         {sampleArticles.map((article) => (
//           <li className="zalo-oa-item" key={article.id}>
//             <h2 className="zalo-oa-title">{article.title}</h2>
//             <p className="zalo-oa-content">{article.content}</p>
//             <img
//               className="zalo-oa-thumb"
//               src={article.thumb}
//               alt={article.title}
//             />
//             <a
//               className="zalo-oa-link"
//               href={article.link_view}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Xem chi tiết
//             </a>
//           </li>
//         ))}
//       </ul>
//       <div className="button-container">
//         {contentData.length > 5 && (
//           <Button
//             style={{
//               backgroundColor: "silver",
//               margin: "0 auto",
//               display: "block",
//               marginBottom: 20,
//             }}
//             className="show-more-button"
//             onClick={() => setShowMore(!showMore)}
//           >
//             {showMore ? "Ẩn đi" : "Xem thêm"}
//           </Button>
//         )}
//       </div>
//       <div style={{ width: "100%", marginLeft: 10, marginTop: 15 }}>
//         <Text style={{ marginBottom: 5 }}>
//           ►Hệ thống cửa hàng: <a href="#">http://tgkc.vn/cua-hang</a>
//         </Text>
//         <Text style={{ marginBottom: 5 }}>
//           ►Website: <a href="#">https://thegioikimcuong.vn</a>
//         </Text>
//         <Text style={{ marginBottom: 5 }}>
//           ►Liên hệ: <b>18009298</b> (Miễn phí cước gọi)
//         </Text>
//       </div>
//     </div>
//   );
// };

// export default ZaloOA;








import React, { FunctionComponent, useState } from "react";
import { Box, Button, Text } from "zmp-ui";
import "../../css/styles.css";
import "../../css/phantrang.css";
import contentData from "../../api/content.json";
import { openWebview } from "zmp-sdk";

interface ZaloArticle {
  id: string;
  title: string;
  content: string;
  thumb: string;
  link_view: string;
}

interface ZaloOAProps {
  // Thêm các props khác nếu cần
}

const ITEMS_PER_PAGE = 5;

const ZaloOA: FunctionComponent<ZaloOAProps> = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = contentData.slice(indexOfFirstItem, indexOfLastItem);

  const totalItems = contentData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    if (number === 1 || number === currentPage - 1 || number === currentPage || number === currentPage + 1 || number === totalPages) {
      return (
        <Button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={currentPage === number ? "active" : ""}
        >
          {number}
        </Button>
      );
    } else if (number === 2) {
      return <span key={number}>...</span>;
    }
  });

  return (
    <div className="zalo-oa">
      <h3 className="zalo-oa-heading">Danh sách bài viết</h3>
      <ul className="zalo-oa-list">
        {currentItems.map((article) => (
          <li className="zalo-oa-item" key={article.id}>
            <h2 className="zalo-oa-title">{article.title}</h2>
            <p className="zalo-oa-content">{article.content}</p>
            <img
              className="zalo-oa-thumb"
              src={article.thumb}
              alt={article.title}
            />
            {/* <a
              className="zalo-oa-link"
              href={article.link_view}
              target="_blank"
              rel="noopener noreferrer"
            >
              Xem chi tiết
            </a> */}

            <Button
              className="zalo-oa-link"
              onClick={() =>
                openWebview({
                  url: article.link_view
                })
              }
            >
              Xem chi tiết
            </Button>

          </li>
        ))}
      </ul>
      <div className="pagination-phan-trang">
        <Button onClick={() => setCurrentPage(1)}>Đầu</Button>
        {renderPageNumbers}
        <Button onClick={() => setCurrentPage(totalPages)}>Cuối</Button>
      </div>
      <div style={{ width: "100%", marginLeft: 10, marginTop: 15 }}>
        <Text style={{ marginBottom: 5 }}>
          ►Hệ thống cửa hàng: <a href="#">http://tgkc.vn/cua-hang</a>
        </Text>
        <Text style={{ marginBottom: 5 }}>
          ►Website: <a href="#">https://thegioikimcuong.vn</a>
        </Text>
        <Text style={{ marginBottom: 5 }}>
          ►Liên hệ: <b>18009298</b> (Miễn phí cước gọi)
        </Text>
      </div>
    </div>
  );
};

export default ZaloOA;
