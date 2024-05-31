import { Button, Table, Tag, Space, Input } from "antd";
import { useState } from "react";
import axios from "axios";
const { Search } = Input;

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    { title: "Ders Kodu", dataIndex: "DersKodu", key: "DersKodu" },
    { title: "Ders Adı", dataIndex: "Açıklama", key: "Açıklama" },
    {
      title: "Statü",
      dataIndex: "Statu",
      key: "Statu",
      render: (Statu) => (
        <Space>
          <Tag style={{ width: 80, textAlign: "center" }} color="green">
            {Statu}
          </Tag>
        </Space>
      ),
    },
  ];

  const getData = (value, _e, info) => {
    setIsLoading(true);
    axios({
      method: "get",
      url: "https://v1.nocodeapi.com/cemtaskin/google_sheets/LLPYROQjlODcTMUj?tabId=DERSLER",
    }).then(function (response) {
      //console.log(response.data.data);
      setIsLoading(false);
      setCourses(response.data.data.filter((d) => d.Açıklama.includes(value)));
    });
  };

  return (
    <div>
      <Search
        placeholder="Ders Kodu yada adı giriniz"
        onSearch={getData}
        style={{ width: 300 }}
      ></Search>
      <Table columns={columns} dataSource={courses} loading={isLoading}></Table>
    </div>
  );
};

export default CourseList;
