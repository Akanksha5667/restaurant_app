import React, { useEffect, useState } from "react";
import { GetOrders } from "../../ApiService";

function Orders() {
  const [orders, setOrders] = useState([]);
  const fetchItems = async (userId) => {
    userId = 19;
    const response = await GetOrders(userId);
    setOrders(response);
  };
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      {orders?.map((order) => {
        const dateTime=new Date(order.date);
        const dateOnly = dateTime.toLocaleDateString('en-US');
        const timeOnly = dateTime.toLocaleTimeString('en-US');
        return (
          <div className="orders-list">
            <div className="order flex">
              <div className="date-id-div">
                  <p><b>#{order.id}</b></p>
                  <div className="flex">
                  <p className="date">{dateOnly}</p><span><p>{timeOnly}</p></span>
                  </div>
              </div>
              <div>
                <div className="order-status"><p>Delivered</p></div>
                <p className="mt-21"><i class="fas fa-rupee-sign mr-5"></i>{order.totalAmount}</p>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Orders;
