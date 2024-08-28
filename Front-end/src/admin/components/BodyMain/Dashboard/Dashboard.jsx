import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import All_API from "../../../../State/Auth/All_API";
import { ConvertDate } from "../Convert/Convert";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [totalUser, setTotalUser] = useState(0);
  const today = new Date().toISOString().split('T')[0]; 
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()

  

  async function getAllUsers(data) {
    try {
      const response = await All_API.getAllUsers(data);
      setTotalUser(response.data.data.users.length)
      
    } catch {}
  }

  async function getAllOrders(data) {
    try {
      const response = await All_API.getAllOrders(data);
      setOrders(response.data.data.orders)
    } catch {}
  }
  
  const dailyOrder = orders.filter(order => order.created_at.startsWith(today))
  const totalMoney = dailyOrder.reduce((sum, order) => sum + order.total_money, 0);

  const today1 = new Date();

  let totalsByDay = Array(7).fill(0); 
  let ordersCountByDay = Array(7).fill(0);  
  

  orders.forEach(order => {
      const orderDate = new Date(order.created_at);
      
      const dayDiff = Math.floor((today1 - orderDate) / (1000 * 60 * 60 * 24));
      
      if (dayDiff >= 0 && dayDiff < 7) {
          totalsByDay[6 - dayDiff] += order.total_money; 
          ordersCountByDay[6 - dayDiff] += 1; 
      }
  });
  
  const result1 = totalsByDay.map((total, index) => {
      const date = new Date(today1);
      date.setDate(today1.getDate() - (6 - index)); 
  
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;

      return {
          name: formattedDate ,
          sales: total,
          profit: ordersCountByDay[index]
      };
  });


  const statusCounts = dailyOrder.reduce((acc, order) => {
    if (!acc[order.status]) {
        acc[order.status] = 0;
    }
    acc[order.status] += 1;
    return acc;
}, {});

const result2 = [
    { statusOrder: "pending", orders: statusCounts["pending"] || 0, fullMark: dailyOrder.length },
    { statusOrder: "processing", orders: statusCounts["processing"] || 0, fullMark: dailyOrder.length },
    { statusOrder: "shipped", orders: statusCounts["shipped"] || 0, fullMark: dailyOrder.length },
    { statusOrder: "delivered", orders: statusCounts["delivered"] || 0, fullMark: dailyOrder.length },
    { statusOrder: "cancelled", orders: statusCounts["cancelled"] || 0, fullMark: dailyOrder.length },
];

 
 


  useEffect(()=> {
    const dataUser = {
      page: '',
      limit: '',
      keyword: '',
    };
    getAllUsers(dataUser);

    const dataOrder = {
      page: '',
      limit: '',
      status: '',
      keyword: '',
    };
    getAllOrders(dataOrder);


  }, [])
  return (
    <div className="ec-content-wrapper">
      <div className="content">
        {/* <!-- Top Statistics --> */}
        <div className="row">
          <div className="col-xl-4 col-sm-6 p-b-15 lbl-card">
            <div className="card card-mini dash-card card-1">
              <div className="card-body">
                <h2 className="mb-1">{totalUser.toLocaleString('en-US')}</h2>
                <p>Total User</p>
                <span className="mdi mdi-account-arrow-left"></span>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-sm-6 p-b-15 lbl-card">
            <div className="card card-mini dash-card card-3">
              <div className="card-body">
                <h2 className="mb-1">{dailyOrder.length.toLocaleString('en-US')}</h2>
                <p>Daily Order</p>
                <span className="mdi mdi-package-variant"></span>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-sm-6 p-b-15 lbl-card">
            <div className="card card-mini dash-card card-4">
              <div className="card-body">
                <h2 className="mb-1">${totalMoney.toLocaleString('en-US')}</h2>
                <p>Daily Revenue</p>
                <span className="mdi mdi-currency-usd"></span>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-8 col-md-12 p-b-15">
            {/* <!-- Sales Graph --> */}
            <div
              id="user-acquisition"
              className="card bg-white shadow-lg rounded-lg"
            >
              <div className="card-header p-4">
                <h2 className="text-lg font-semibold">Sales Report</h2>
              </div>
              <div className="card-body p-3">
                <div className="tab-content pt-4" id="salesReport">
                  <div
                    className="tab-pane fade show active"
                    id="source-medium"
                    role="tabpanel"
                  >
                    <div className="mb-6" style={{ maxHeight: "250px" }}>
                      {/* Biểu đồ đường với dữ liệu giả */}
                      <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={result1}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#8884d8"
                          />
                          <Line
                            type="monotone"
                            dataKey="profit"
                            stroke="#82ca9d"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-12 p-b-15">
            {/* <!-- Doughnut Chart --> */}
            <div className="card bg-white shadow-lg rounded-lg">
              <div className="card-header p-4 flex justify-center">
                <h2 className="text-lg font-semibold">Orders Overview</h2>
              </div>
              <div className="card-body p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={result2}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={30} domain={[0, dailyOrder.length]} />
                    <Radar
                      name="Orders"
                      dataKey="orders"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 p-b-15">
            {/* <!-- Recent Order Table --> */}
            <div
              className="card card-table-border-none card-default recent-orders"
              id="recent-orders"
            >
              <div className="card-header justify-content-between">
                <h2>Recent Orders</h2>
                <div className="date-range-report">
                  <span></span>
                </div>
              </div>
              <div className="card-body pt-0 pb-5">
                <table
                  className="table card-table table-responsive table-responsive-large"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Full Name</th>
                      <th>Phone</th>
                      <th className="d-none d-lg-table-cell">Order Date</th>
                      <th className="d-none d-lg-table-cell">Order Cost</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailyOrder.slice(-5).map((order)=> (
                      <tr>
                      <td>{order?.id}</td>
                     
                      <td>
                        {order?.fullname}
                      </td>
                      <td className="d-none d-lg-table-cell">{order?.phone_number}</td>
                      <td className="d-none d-lg-table-cell">{ConvertDate(order?.order_date)}</td>
                      <td className="d-none d-lg-table-cell">${order?.total_money}</td>
                      <td>
                      <span 
        className={`badge ${
          order.status === 'pending' ? 'bg-blue-500 text-white' :
          order.status === 'processing' ? 'bg-yellow-500 text-white' :
          order.status === 'shipped' ? 'bg-green-500 text-white' :
          order.status === 'delivered' ? 'bg-teal-500 text-white' :
          order.status === 'cancelled' ? 'bg-red-500 text-white' :
          'bg-gray-500 text-white' // Màu sắc mặc định nếu trạng thái không được xác định
        } py-1 px-3 rounded`}
      >
        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
      </span>
                      </td>
                      <td className="">
                      <div className="btn-group">
                              <button
                                onClick={() =>
                                  navigate(`/admin/orders/${order.id}`)
                                }
                                type="button"
                                className=" btn btn-menu-2 btn-outline-success"
                              >
                                Info
                              </button>
                              <button
                                type="button"
                                
                                className="btn btn-menu-2 btn-outline-success btn-menu dropdown-toggle dropdown-toggle-split"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                data-display="static"
                              >
                                <span className="sr-only">Info</span>
                              </button>
                           
                               
                             
                            </div>
                      </td>
                    </tr>
                    ))}
                  
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
