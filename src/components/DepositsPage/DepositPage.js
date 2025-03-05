import { collection, getDocs } from 'firebase/firestore';
import './DepositPage.scss';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import DepositsInfoModal from './DepositsInfoModal';

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

                <div className='table_header'>
                    <ul>
                        <li className='table_header_item'>Property</li>
                        <li className='table_header_item'>Move In Date</li>
                        <li className='table_header_item'>Rent</li>
                        <li className='table_header_item'>Deposit</li>
                        <li className='table_header_item'>Status</li>
                        <li className='table_header_item'>Actions</li>
                    </ul>
                </div>

                <div className='table_body'>
                    {
                        propertyArr.map(el => {
                            return (
                                <ul key={el.id}>
                                    <li className='table_body_item'>{el.property}</li>
                                    <li className='table_body_item'>{el.move_in_date}</li>
                                    <li className='table_body_item'>${el.rent}</li>
                                    <li className='table_body_item'>${el.deposit}</li>
                                    <li className='table_body_item'>{getStatusLabel(el.status)}</li>
                                    <li className='table_body_item'>
                                        <button
                                            onClick={() => callEditModal(el.id)}
                                            className='btn btn-primary'>
                                            Edit
                                        </button>
                                    </li>
                                </ul>
                            )
                        })
                    }

                </div>

            </div>
        </div>
    )
}