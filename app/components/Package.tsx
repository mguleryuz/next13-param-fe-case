"use client";

import { Col, Row, Image, Divider, Tag } from "antd";
import { toggleToCart } from "../lib/store/slices/cartSlice";
import { useDispatch } from "react-redux";

export type PackageProps = {
  name: string;
  imagePath: string;
  details: string[];
  tags: string[];
  amount: number;
  currency: string;
  id: number;
};

export default function Item(props: PackageProps & { isSelected: boolean }) {
  const dispatch = useDispatch();

  // ImagePath is faulty
  const { name, imagePath, details, tags, amount, currency, id, isSelected } =
    props;
  return (
    <Row
      className="hoverOutline"
      style={{
        cursor: "pointer",
        borderRadius: 10,
        ...(isSelected && {
          outline: "2px solid #7AC500",
        }),
      }}
      onClick={() => dispatch(toggleToCart(props))}
    >
      <Col flex={2}>
        <Image
          src={"/pkg_img_fallback.svg"}
          alt={id + "package_img"}
          preview={false}
        />
      </Col>

      <Col
        flex={4}
        style={{
          backgroundColor: "#EBEBEB",
          padding: 8,
          justifyContent: "space-between",
          borderRadius: "0 10px 10px 0",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>{name}</h3>
          <h3>{amount + currency}</h3>
        </div>

        <ul className="list-horizontal">
          {details?.map?.((i, index) => (
            <li key={index}>{i}</li>
          ))}
        </ul>

        <Divider style={{ margin: "10px 0 10px 0" }} />
        <div>
          {tags?.map?.((i, index) => (
            <Tag key={index}>{i}</Tag>
          ))}
        </div>
      </Col>
    </Row>
  );
}
