import { Table as TableAnt } from 'antd';
import { AnyObject } from 'antd/es/_util/type';

interface TableProps<T> {
   columns: T[];
   data: T[];
}

const Table: React.FC<TableProps<AnyObject>> = ({ columns, data }) => {
   return <TableAnt className="w-full" columns={columns} dataSource={data} />;
};

export default Table;
