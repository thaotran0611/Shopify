import React, { useState, useEffect } from 'react';
import '../../styles/DashBoard.css';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import Chart from '../../components/chart/Chart';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import axios from 'axios';
export default function DashBoard() {
  let date = new Date().toJSON().slice(0, 10);
  const [chart, setChart] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/orders/chart`)
      .then((result) => {
        console.log(result.data);
        setChart(result.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const chartData = [
    { name: 'Jan', Sales: 0 },
    { name: 'Feb', Sales: 0 },
    { name: 'Mar', Sales: 0 },
    { name: 'Apr', Sales: 0 },
    { name: 'May', Sales: 0 },
    { name: 'Jun', Sales: 0 },
    { name: 'Jul', Sales: 0 },
    { name: 'Aug', Sales: 0 },
    { name: 'Sep', Sales: 0 },
    { name: 'Oct', Sales: 0 },
    { name: 'Nov', Sales: 0 },
    { name: 'Dec', Sales: 0 },
  ];
  for (let index = 0; index < chartData.length; index++) {
    for (let i = 0; i < chart.length; i++) {
      if (chart[i]['MONTH'] === index + 1) {
        chartData[index]['Sales'] = chart[i]['TOTAL_COST'];
      }
    }
  }

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={chartData} title="User Analytics" grid dataKey="Sales" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
