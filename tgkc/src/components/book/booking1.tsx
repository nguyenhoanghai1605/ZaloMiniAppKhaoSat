import React from "react";
import { FunctionComponent, useState } from "react";
import { Box, Button, Text } from "zmp-ui";
import { useBookingTotal } from "../../hooks";
import { Booking } from "../../models";
import Price from "../format/price";
import Time from "../format/time";
import RestaurantItem from "../restaurant";
import Swipeable from "../swipeable";
import BookingDetail from "../../pages/booking-detail";
import { useSetRecoilState } from "recoil";
// import { bookingsState } from "../../state";

interface BookingItemProps {
  booking: Booking;
}

const { Title } = Text;

const BookingItem: FunctionComponent<BookingItemProps> = ({ booking }) => {
  const [total] = useBookingTotal(booking);
  // const setBooking = useSetRecoilState(bookingsState);
  const [selectingState, setSelectingState] = useState(false);
  // const unbook = (id: string) => {
  //   setBooking((bs) => bs.filter((booking) => booking.id !== id));
  // };

  return (
    <Box flex alignItems="center" px={4}>
      <div>
        <div>
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <Title
              size="small"
              className="whitespace-nowrap mb-0"
              style={{ marginTop: -10 }}
            >
              <div>Đại lễ rộn ràng - Hàng ngàn quà tặng</div>
            </Title>
          </div>
          <div className="border border-solid border-gray-100 rounded-xl">
            <div>
              <a href="http://tgkc.vn/Sale30-04">
                <img
                  style={{ width: "100%" }}
                  src="https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/340326411_188768173478344_7209778111839496602_n.png?_nc_cat=103&ccb=1-7&_nc_sid=730e14&_nc_ohc=GWwOd1UaWGgAX91Bdt1&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfBtiooxxnrDWKqgRwYlMjcRvYuWNYWenBFd70yGybVq0Q&oe=644B9395"
                ></img>
              </a>
            </div>
          </div>
        </div>

        <div>
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <Title
              size="small"
              className="whitespace-nowrap mb-0"
              style={{ marginTop: -10 }}
            >
              <div>Gửi gắm tình yêu vào từng thiết kế Trang sức</div>
            </Title>
          </div>
          <div className="border border-solid border-gray-100 rounded-xl">
            <div>
              <a href="http://tgkc.vn/Sale30-04">
                <img
                  style={{ width: "100%" }}
                  src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/342333508_677308857532149_1874899851543015738_n.png?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=_z_I6zXzYvsAX-eVRYH&_nc_ht=scontent.fsgn2-8.fna&oh=00_AfDjce1GbQGG61Q8PuEoaXRg1AXazEKzAQg-lSxLc5fZww&oe=644C2BF8"
                ></img>
              </a>
            </div>
          </div>
        </div>

        <div className="border border-solid border-gray-100 rounded-xl">
          <div style={{ marginTop: 20, marginBottom: 10 }}>
            <Title
              size="small"
              className="whitespace-nowrap mb-0"
              style={{ marginTop: -10 }}
            >
              <div>Ưu đãi đến 39% | trang sức - chìa khóa vàng</div>
              <div>giúp nàng tỏa sáng</div>
            </Title>
          </div>
          <div className="border border-solid border-gray-100 rounded-xl">
            <div>
              <a href="http://tgkc.vn/sale-39">
                <img
                  style={{ width: "100%" }}
                  src="https://file.hstatic.net/1000381168/file/banner06_00f60b9d2e8b45fcbe3a9201097f73d2.jpg"
                ></img>
              </a>
            </div>
          </div>
        </div>

        <div className="border border-solid border-gray-100 rounded-xl">
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <Title size="small" className="whitespace-nowrap mb-0">
              <div>Độc quyền online | Ưu đãi đến 39% </div>
            </Title>
          </div>
          <div>
            <a href="http://tgkc.vn/sale-39">
              <img
                style={{ width: "100%" }}
                src="https://file.hstatic.net/1000381168/file/mobi-slide4_74d2eae268764c18a665a38a8f8826ee.png"
              ></img>
            </a>
          </div>
        </div>

        <div className="border border-solid border-gray-100 rounded-xl">
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <Title size="small" className="whitespace-nowrap mb-0">
              <div>LUCKY STAR - KIỆT TÁC TINH HOA TỪ ĐẤT TRỜI</div>
            </Title>
          </div>
          <div>
            <a href="http://tgkc.vn/sale-39">
              <img
                style={{ width: "100%" }}
                src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/342199972_160348886974773_6241490416193063520_n.png?_nc_cat=109&ccb=1-7&_nc_sid=730e14&_nc_ohc=YjMlt2q55GEAX9YW7mb&_nc_ht=scontent.fsgn2-4.fna&oh=00_AfB2J5mWduYGeNvRlUgqD24U5cw-weKg-8K5ZpIZ7UjZWw&oe=644D0ED2"
              ></img>
            </a>
          </div>
        </div>

        <div>
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <Title size="small" className="whitespace-nowrap mb-0">
              <div>Đến Thế Giới Kim Cương - Săn kim cương viên</div>
            </Title>
          </div>
          <div className="border border-solid border-gray-100 rounded-xl">
            <div>
              <a href="https://thegioikimcuong.vn/collections/khuyen-mai-1">
                <img
                  style={{ width: "100%", marginBottom: -10 }}
                  src="https://file.hstatic.net/1000381168/file/banner08_521e13fed1d847e4baecee35dd15dcc8.png"
                ></img>
              </a>
            </div>
          </div>
        </div>

        <div>
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <Title size="small" className="whitespace-nowrap mb-0">
              <div>TẠO TÁC NGHỆ THUẬT TỪ TRÍ TUỆ CẢM XÚC</div>
            </Title>
          </div>
          <div className="border border-solid border-gray-100 rounded-xl">
            <div>
              <a href="https://thegioikimcuong.vn/collections/khuyen-mai-1">
                <img
                  style={{ width: "100%", marginBottom: -10 }}
                  src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/341463671_268860552135908_649227673527992573_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=730e14&_nc_ohc=PilPxW1A1rYAX9saZhM&_nc_ht=scontent.fsgn2-3.fna&oh=00_AfANr1MWNcMRIRML8HNkdHbkxpjknydj84JzhJBWDtvN8g&oe=644D2A01"
                ></img>
              </a>
            </div>
          </div>
        </div>

        <div>
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <Title size="small" className="whitespace-nowrap mb-0">
              <div>ĐIỂM XUYẾT ÁNH QUYỀN NĂNG</div>
            </Title>
          </div>
          <div className="border border-solid border-gray-100 rounded-xl">
            <div>
              <a href="http://tgkc.vn/Sale30-04">
                <img
                  style={{ width: "100%", marginBottom: -10 }}
                  src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/341103382_784054849535363_1836892322362167208_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=cdpMYgSfkesAX_8bpuN&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfCWKAhaa9KYY6ShUcjGwuRo3JH3L-PGahO9LvDECXcHLw&oe=644D2B80"
                ></img>
              </a>
            </div>
          </div>
        </div>

        <div>
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <Title size="small" className="whitespace-nowrap mb-0">
              <div style={{}}>Tôn vinh vẻ đẹp sang trọng và đẳng cấp</div>
            </Title>
          </div>
          <div className="border border-solid border-gray-100 rounded-xl">
            <div>
              <a href="http://tgkc.vn/Sale30-04">
                <img
                  style={{ width: "100%", marginBottom: -10 }}
                  src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/341020375_925020498545434_1198172827307223513_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=730e14&_nc_ohc=IfTVPneSgUoAX8wS-q3&_nc_ht=scontent.fsgn2-4.fna&oh=00_AfAx_stk2o4i1MXs2dSvVH0QNSSvHKHBfIn0PCjKr9WClA&oe=644D08D5"
                ></img>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default BookingItem;
