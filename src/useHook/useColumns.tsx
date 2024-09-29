import { CopyOutlined } from '@ant-design/icons';
import { TableProps, Typography, Image, Checkbox, Button, message, Tooltip } from 'antd';
import { Link } from 'react-router-dom';

const liveOptions = [
  { label: '自動錄影', value: 'auto_record' },
  { label: '加到最愛', value: 'isFavorite' },
];

const { Text } = Typography;

const maxLength = 30

const useColumns = (porps: { setLiveUrl: any; }) => {
  const { setLiveUrl } = porps
  const onChange = (id: any, checkedValues: string[]) => {
    console.log('checked = ', checkedValues);
    const statusUpdate = {
      urlOrNameOrId: id,  // 替换为你的实际 URL 或 ID
      isFavorite: checkedValues.includes('isFavorite'),
      auto_record: checkedValues.includes('auto_record'),
      viewed: checkedValues.includes('viewed')
    };
  };

  const columns: TableProps<RegistrationOptions>['columns'] = [
    {
      title: '名稱',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      sorter: true,
      width: 100,
    },
    {
      title: '網址',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
      sorter: true,
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      filters: [
        { text: '在線', value: 'online' },
        { text: '離線', value: 'offline' },
      ],
      width: 80,
    },
    {
      title: '自動錄影',
      dataIndex: 'auto_record',
      key: 'auto_record',
      align: 'center',
      width: 100,
      filters: [
        { text: '自動錄影', value: 'true' },
        { text: '不自動錄影', value: 'false' },
      ],
    },
    {
      title: '其他選項',
      key: 'options',
      align: 'center',
      width: 100,
    },
    {
      title: '操作',
      key: 'operate',
      align: 'center',
      width: 100,
    },
    // {
    //   title: '最愛',
    //   dataIndex: 'viewed',
    //   key: 'viewed',
    //   align: 'center',
    //   render: (viewed) => {
    //     return <Text>{viewed == true ? '已觀看' : '未觀看'}</Text>;
    //   },
    //   width: 100,
    // },
    // {
    //   title: '已觀看',
    //   dataIndex: 'viewed',
    //   key: 'viewed',
    //   align: 'center',
    //   render: (viewed) => {
    //     return <Text>{viewed == true ? '已觀看' : '未觀看'}</Text>;
    //   },
    //   width: 100,
    // },
    // {
    //   title: '影片大小',
    //   dataIndex: 'size',
    //   key: 'size',
    //   align: 'center',
    //   render: (status) => {
    //     return <Text>{status[0] + 'x' + status[1] || '無'}</Text>;
    //   },
    //   width: 80,
    // },
    // {
    //   title: '觀看人次',
    //   dataIndex: 'viewers',
    //   key: 'viewers',
    //   align: 'center',
    //   render: (viewers) => {
    //     return <Text>{viewers || '無'}</Text>;
    //   },
    //   width: 100,
    // },
  ];
  return { columns };
};

export default useColumns;
