// import React, { useState } from "react";
// import { Text } from "zmp-ui";
// import ReactPaginate from "react-paginate";
// import "../css/product.css";
// import productsData from "../api/products.json";

// function ProductList() {
//   // Danh sách sản phẩm

//   const allProducts = productsData;

//   const [currentPage, setCurrentPage] = useState(1);
//   const [prevPage, setPrevPage] = useState(0); // Trạng thái trang trước đó
//   const productsPerPage = 10;
//   const pageCount = Math.ceil(allProducts.length / productsPerPage);

//   // Tính toán chỉ mục bắt đầu và chỉ mục kết thúc của sản phẩm trên trang hiện tại
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = prevPage * productsPerPage;
//   const currentProducts = allProducts.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );

//   // Xử lý khi nhấn nút "Xem thêm"
//   const handleLoadMore = () => {
//     setPrevPage(currentPage);
//     setCurrentPage(currentPage + 1);
//   };

//   // Xử lý khi nhấn nút "Quay lại"
//   const handleGoBack = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//       setPrevPage(prevPage - 1);
//     }
//   };

//   // Xử lý khi thay đổi trang
//   const handlePageChange = (selectedPage) => {
//     setCurrentPage(selectedPage.selected + 1);
//     setPrevPage(selectedPage.selected);
//   };

//   return (
//     <div className="m-4">
//       <div className="bg-green text-black rounded-xl p-4">
//         <Text.Title className="" style={{ marginTop: -20 }}>
//           Danh sách sản phẩm
//         </Text.Title>
//         <div className="product-buttons">
//           {allProducts.length > productsPerPage && (
//             <ReactPaginate
//               pageCount={pageCount}
//               pageRangeDisplayed={2} // Số trang hiển thị trong phân trang
//               marginPagesDisplayed={1} // Số lượng trang hiển thị ở đầu và cuối
//               onPageChange={handlePageChange}
//               containerClassName={"pagination"}
//               activeClassName={"active"}
//               previousLabel={"Trước"}
//               nextLabel={"Sau"}
//               forcePage={currentPage - 1} // Đặt trang hiện tại
//             />
//           )}
//         </div>
//         <div className="product-scroll-container">
//           <div className="product-scroll">
//             {currentProducts.map((product) => (
//               <div key={product.id} className="product-card">
//                 <div className="product-card-inner">
//                   {/* Thêm thẻ anchor với href */}
//                   <a href={product.productLink} target="_blank" rel="noopener noreferrer">
//                     <img
//                       src={product.photo_links[0]}
//                       alt={product.name}
//                       className="product-image"
//                     />
//                   </a>
//                   <h2 className="text-xl font-semibold product-name">
//                     {product.name}
//                   </h2>
//                   <p className="text-lg font-bold product-price">
//                     {product.price.toLocaleString()} VND
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="product-buttons">
//           {/* {prevPage > 0 && (
//             <button className="btn-go-back" onClick={handleGoBack}>
//               Quay lại
//             </button>
//           )} */}
//           {allProducts.length > productsPerPage && (
//             <ReactPaginate
//               pageCount={pageCount}
//               pageRangeDisplayed={2} // Số trang hiển thị trong phân trang
//               marginPagesDisplayed={1} // Số lượng trang hiển thị ở đầu và cuối
//               onPageChange={handlePageChange}
//               containerClassName={"pagination"}
//               activeClassName={"active"}
//               previousLabel={"Trước"}
//               nextLabel={"Sau"}
//               forcePage={currentPage - 1} // Đặt trang hiện tại
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductList;




import React, { useState } from "react";
import { Text } from "zmp-ui";
import ReactPaginate from "react-paginate";
import "../css/product.css";
import productsData from "../api/products.json";

function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}

function ProductList() {
  const allProducts = productsData;
  const productsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000000);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = prevPage * productsPerPage;

  const filteredProducts = allProducts.filter((product) => {
    const price = Number(product.price);
    return price >= minPrice && price <= maxPrice;
  });

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleLoadMore = () => {
    setPrevPage(currentPage);
    setCurrentPage(currentPage + 1);
  };

  const handleGoBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPrevPage(prevPage - 1);
    }
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    setPrevPage(selectedPage.selected);
  };

  const handleMinPriceChange = (e) => {
    const input = e.target.value;
    const newMinPrice = input ? parseInt(input.replace(/\D/g, ""), 10) : 0;
    setMinPrice(newMinPrice);
  };

  const handleMaxPriceChange = (e) => {
    const input = e.target.value;
    const newMaxPrice = input ? parseInt(input.replace(/\D/g, ""), 10) : 0;
    setMaxPrice(newMaxPrice);
  };

  return (
    <div className="m-4">
      <div className="bg-green text-black rounded-xl p-4">
        <Text.Title className="" style={{ marginTop: -20, marginBottom: 10 }}>
          Danh sách sản phẩm
        </Text.Title>
        <div className="product-filters">
          <div className="price-filter">
            <label htmlFor="minPrice">Giá từ:</label>
            <input
              type="text"
              id="minPrice"
              value={minPrice.toLocaleString()} // Định dạng giá trị khi hiển thị trong input
              onChange={handleMinPriceChange}
              className="price-input large-input"
            />
          </div>
          <div className="price-filter">
            <label htmlFor="maxPrice">Giá đến:</label>
            <input
              type="text"
              id="maxPrice"
              value={maxPrice.toLocaleString()} // Định dạng giá trị khi hiển thị trong input
              onChange={handleMaxPriceChange}
              className="price-input large-input"
            />
          </div>
        </div>

        <div className="product-buttons">
          {allProducts.length > productsPerPage && (
            <ReactPaginate
              pageCount={Math.ceil(filteredProducts.length / productsPerPage)}
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
              previousLabel={"Trước"}
              nextLabel={"Sau"}
              forcePage={currentPage - 1}
            />
          )}
        </div>
        <div className="product-scroll-container">
          <div className="product-scroll">
            {currentProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-card-inner">
                  <a
                    href={product.productLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={product.photo_links[0]}
                      alt={product.name}
                      className="product-image"
                    />
                  </a>
                  <h2 className="text-xl font-semibold product-name">
                    {product.name}
                  </h2>
                  <p className="text-lg font-bold product-price">
                    {formatCurrency(product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="product-buttons">
          {allProducts.length > productsPerPage && (
            <ReactPaginate
              pageCount={Math.ceil(filteredProducts.length / productsPerPage)}
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
              previousLabel={"Trước"}
              nextLabel={"Sau"}
              forcePage={currentPage - 1}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
