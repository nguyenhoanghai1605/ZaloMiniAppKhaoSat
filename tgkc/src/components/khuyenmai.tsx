import React from "react";
import { FunctionComponent } from "react";
import { Box, Button, Icon, Text } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { Restaurant } from "../models";
import Distance from "./distance";
import DistrictName from "./district-name";

const { Title } = Text;

interface khuyenmaiProps {
  layout: "cover" | "list-item";
  khuyenmai: Restaurant;
  before?: React.ReactNode;
  after?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const khuyenmaiItem: FunctionComponent<khuyenmaiProps> = ({
  layout,
  khuyenmai,
  before,
  after,
  onClick,
}) => {
  const navigate = useNavigate();
  const viewDetail = () => {
    navigate({
      pathname: "/khuyenmai",
      search: new URLSearchParams({
        id: String(khuyenmai.id),
      }).toString(),
    });
  };

  if (layout === "cover") {
    return (
      <div
        onClick={onClick ?? viewDetail}
        className="relative bg-white rounded-xl overflow-hidden p-0 khuyenmai-with-cover"
      >
        <div className="aspect-cinema relative w-full">
          <img
            src={khuyenmai.image}
            className="absolute w-full h-full object-cover"
          />
        </div>

        <Title size="small" className="mt-2 mb-0 mx-4">
          {khuyenmai.name}
        </Title>
        <Box flex mt={0} mb={2}>
          <Button
            className="text-red-500"
            prefixIcon={
              <Icon className="text-red-500" icon="zi-location-solid" />
            }
            size="small"
            variant="tertiary"
          >
            <span className="text-gray-500">
              <DistrictName id={khuyenmai.districtId} />
            </span>
          </Button>
          <Button
            prefixIcon={<Icon icon="zi-send-solid" />}
            size="small"
            variant="tertiary"
          >
            <span className="text-gray-500">
              <Distance location={khuyenmai.location} />
            </span>
          </Button>
        </Box>
      </div>
    );
  }
  return (
    <div
      onClick={onClick ?? viewDetail}
      className="bg-white rounded-xl overflow-hidden p-0 khuyenmai-with-cover"
    >
      <Box m={0} flex>
        <div className="flex-none aspect-card relative w-32">
          <img
            src={khuyenmai.image}
            className="absolute w-full h-full object-cover rounded-xl"
          />
        </div>
        <Box my={4} mx={5} className="min-w-0">
          {before}
          <Title size="small">{khuyenmai.name}</Title>
          {after}
          <Box mx={0} mb={0} flex>
            <Button
              prefixIcon={<Icon icon="zi-send-solid" />}
              size="small"
              variant="tertiary"
            >
              <span className="text-gray-500">
                <Distance location={khuyenmai.location} />
              </span>
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default khuyenmaiItem;
