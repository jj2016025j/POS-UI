import {
  CaretDownOutlined,
  CaretUpOutlined,
  FilterFilled,
} from "@ant-design/icons";
import { Pagination, Space, Table } from "antd";
import { forwardRef, useState, useEffect } from "react";

const TableAlpha = forwardRef(
  (props, ref) => {

    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    // useEffect(() => {
    //   console.log('TableAlpha props', props.dataSource)
    // }, [props])

    const {
      totalCount,
      columns: origin,
      dataSource: originDatas,
      setPageSize: syncPageSize,
      setPage: syncPage,
      handleTableChange,
      ...tableProps
    } = props || {};

    const columns = origin
      ? origin.map((originColumn) => {
        const column = {
          filterIcon: <FilterFilled />,
          sortIcon: ({ sortOrder }) => (
            <span>
              <CaretUpOutlined />
              <CaretDownOutlined />
            </span>
          ),
          ...originColumn,
        };
        return column;
      })
      : undefined;

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
    };

    useEffect(() => {
      if (!syncPage) return;
      syncPage(page);
    }, [syncPage, page]);

    useEffect(() => {
      if (!syncPageSize) return;
      syncPageSize(pageSize);
    }, [syncPageSize, pageSize]);

    return (
      <div ref={ref}>
        <Table
          dataSource={originDatas}
          footer={() => {
            if (!originDatas) return;
            return (
              <Space
                style={{
                  width: "100%",
                  justifyContent: "space-between",
                  paddingInline: 15,
                }}
              >
                <div></div>
                <Pagination
                  onChange={(newPage, newSize) => {
                    if (newSize) setPageSize(newSize);
                    if (newPage) setPage(newPage);
                  }}
                  total={totalCount ?? originDatas?.length}
                  showSizeChanger
                  current={page}
                />
              </Space>
            );
          }}
          rowSelection={{ ...rowSelection }}
          pagination={false}
          scroll={{
            x: 'max-content',
            y: 'calc(90vh - 250px)',
          }}
          onChange={handleTableChange}
          {...{ ...tableProps, columns }}
        />
      </div>
    );
  }
);

export default TableAlpha;
