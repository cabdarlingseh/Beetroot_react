import { collection, getDocs } from 'firebase/firestore';
import './DepositPage.scss';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import DepositsInfoModal from './DepositsInfoModal';
import { Link } from 'react-router-dom';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function DepositPage() {

    const [propertyArr, setPropertyArr] = useState([]);
    const [propertyToEdit, setPropertyToEdit] = useState(null);

    const getAllProperty = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'property'));
            const property = querySnapshot.docs.map(propItem => ({
                id: propItem.id,
                ...propItem.data()
            }));
            setPropertyArr(property);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    const callEditModal = (id) => {
        const item = propertyArr.find(el => el.id === id);

        if (item) {
            setPropertyToEdit(item);
        }
    };

    const getStatusLabel = (val) => {
        const statusMap = {
            0: 'Awaiting Bank Processing',
            1: 'Payment Processed',
            2: 'Expired: No Payment Received'
        };
        return statusMap[val] || 'Unknown Status';
    };

    useEffect(() => {
        getAllProperty();
    }, []);

    useEffect(() => {

        const containerElements = document.querySelectorAll('.container');


        const originalStyles = [];
        containerElements.forEach(element => {
            originalStyles.push({
                element,
                width: element.style.width,
                maxWidth: element.style.maxWidth
            });

            element.style.width = "100%";
            element.style.maxWidth = "1170px";
        });

        return () => {
            originalStyles.forEach(({ element, width, maxWidth }) => {
                element.style.width = width;
                element.style.maxWidth = maxWidth;
            });
        };
    }, []);

    return (
        <div className='deposits_page deposit_page_container'>
            <div className='deposits_table'>
                <div className='table_header_actions'>

                    <div className='active_label'>
                        <p>Active Deposits</p>
                        <span>{propertyArr.length}</span>
                    </div>

                    <DepositsInfoModal
                        propertyArr={propertyArr}
                        propertyToEdit={propertyToEdit}
                        setPropertyToEdit={setPropertyToEdit}
                        getAllProperty={getAllProperty} />
                </div>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>

                                <TableCell className='table_header_item'>Property</TableCell>
                                <TableCell className='table_header_item'>Move In Date</TableCell>
                                <TableCell className='table_header_item'>Rent</TableCell>
                                <TableCell className='table_header_item'>Deposit</TableCell>
                                <TableCell className='table_header_item'>Status</TableCell>
                                <TableCell className='table_header_item'>Actions</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                propertyArr.map(el => {
                                    return (
                                        <TableRow key={el.id}>
                                            <TableCell className='table_body_item'>{el.property}</TableCell>
                                            <TableCell className='table_body_item'>{el.move_in_date}</TableCell>
                                            <TableCell className='table_body_item'>${el.rent}</TableCell>
                                            <TableCell className='table_body_item'>${el.deposit}</TableCell>
                                            <TableCell className='table_body_item'>{getStatusLabel(el.status)}</TableCell>
                                            <TableCell className='table_body_item'>
                                                <button
                                                    onClick={() => callEditModal(el.id)}
                                                    className='btn btn-primary'>
                                                    Edit
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <div>
                    <Link to='/homework' className="go_home">Go Back To Homeworks</Link>
                </div>
            </div>
        </div>
    )
}