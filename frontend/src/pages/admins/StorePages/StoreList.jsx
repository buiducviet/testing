import classNames from "classnames/bind";
import styles from "./StoreList.module.scss";
import customStyles from "../ProductPages/CustomTable";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Modal, Button } from 'react-bootstrap';

const cx = classNames.bind(styles);
import originalStoreData from "../../users/StoreLocations/storeData";

const StoreList = () => {
    const columns = [
        {
            name: 'STT',
            selector: (row) => row.id,
            width: '10%',
        },
        {
            name: 'Tỉnh',
            selector: (row) => row.province,
            width: '15%',
            sortable: true,
        },
        {
            name: 'Địa chỉ chi tiết',
            selector: (row) => row.address,
            width: '40%',
            wrap: true,
        },
        {
            name: 'Số điện thoại',
            selector: (row) => row.hotline,
            width: '20%',
        },
    ];

    useEffect(() => {
        async function getAllAddress() {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const data = await response.json();
            //console.log(data);

            //setCategories(categoriesFake);
        }
        getAllAddress();
        setStores(originalStoreData)
        setSelectedRows([])

    }, [])

    const [stores, setStores] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const [clearSelect, setClearSelect] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const confirmDelete = () => {
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        // Lấy danh sách ID của các cửa hàng đã chọn
        const storeIdsToDelete = selectedRows.map(row => row.id);

        try {
            /* Gọi API để xóa các danh mục
            //const response = await fetch('URL_API_DELETE_CATEGORIES', {
            //    method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ categoryIds: categoryIdsToDelete }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }*/

            // Nếu xóa thành công, cập nhật state với danh sách mới(loại bỏ các danh mục đã chọn)
            const updatedStores = stores.filter(c => !storeIdsToDelete.includes(c.id));
            setStores(updatedStores);

            // Đặt lại danh sách được chọn
            setClearSelect(!clearSelect)
            setSelectedRows([])

        } catch (error) {
            console.error('Lỗi khi xóa cua hang:', error.message);
        }
        setShowDeleteModal(false)
    };

    return (
        <div className={cx('wrap')}>

            <div className={cx('cd-btn')}>
                <button
                    className={cx('delete-btn')}
                    onClick={confirmDelete}
                >
                    Xóa cửa hàng
                </button>
                <Link to="/admin/stores/add" className={cx('create-btn')}>Thêm cửa hàng</Link>
            </div>

            <div>
                <h3>
                    Danh sách cửa hàng hiện tại
                </h3>
            </div>

            <DataTable
                columns={columns}
                data={stores}
                selectableRows
                fixedHeader
                pagination
                onSelectedRowsChange={({ selectedRows }) => { setSelectedRows(selectedRows); console.log(selectedRows) }}
                customStyles={customStyles}
                clearSelectedRows={clearSelect}
            >
            </DataTable>
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận hủy</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn chắc chắn muốn xóa cửa hàng?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className={cx("btn-close-modal")} style ={{backgroundColor:'#36a2eb'}} onClick={handleCloseDeleteModal}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default StoreList