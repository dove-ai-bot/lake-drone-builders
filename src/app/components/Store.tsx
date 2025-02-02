"use client"
import storeItems from "../data/items.json"
import { StoreItem } from "../components/StoreItem"
import { Col, Row } from "react-bootstrap"

export function Store() {
  console.log("Store")
  return (
    <>
      {console.log("StoreStart") ?? null}
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {storeItems.map((item) => (
          <Col key={item.id}>
            {console.log("Store:StoreItem") ?? null}
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
      {console.log("StoreEnd") ?? null}
    </>
  )
}
