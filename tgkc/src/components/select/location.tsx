import React from "react";

interface State {
  city: string;
  district: string;
}

interface Props {
  onCityChange?: (city: string) => void;
  onDistrictChange?: (district: string) => void;
  onSearch?: (data: any) => void;
  // authorization: string;
  authorization: "crm:crm!@#123";
}

class SelectCity extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      city: "",
      district: "",
    };
  }

  handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityValue = event.target.value;
    this.setState({ city: cityValue });

    if (this.props.onCityChange) {
      this.props.onCityChange(cityValue);
    }
  };

  handleSearch = () => {
    const { city } = this.state;
    const { authorization, onSearch } = this.props;

    // Gọi API tìm kiếm với chứng thực basic
    const API_URL = "http://192.168.1.130:8088/api/Values/ShopAddressByParam";
    const params = new URLSearchParams();
    params.append("city", city);
    params.append("district", "");

    fetch(API_URL + "?" + params.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + authorization,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (onSearch) {
          onSearch(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <div>
        <select
          value={this.state.city}
          onChange={this.handleCityChange}
          className="vung-select border-radius"
          style={{ width: 180, height: 30, borderRadius: 5 }}
        >
          <option value="">Chọn Tỉnh/Thành phố</option>
          <option value="handleCityChange">Tỉnh/Thành phố 1</option>
          <option value="city2">Tỉnh/Thành phố 2</option>
        </select>
        {/* <button onClick={this.handleSearch}>Tìm kiếm</button> */}
      </div>
    );
  }
}

export default SelectCity;
