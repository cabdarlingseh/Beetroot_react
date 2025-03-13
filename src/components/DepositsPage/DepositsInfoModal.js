import { useEffect, useState } from "react"
import './DepositPage.scss';
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Button, Modal, TextField } from "@mui/material";

export default function DepositsInfoModal({
    getAllProperty,
    propertyToEdit,
    setPropertyToEdit,
    propertyArr
}) {

    const [isModalVisible, setIsModalVisible] = useState(false);



    //Input Fields States

    const [formData, setFormData] = useState({
        property: '',
        move_in_date: '',
        rent: '',
        deposit: '',
        status: ''
    });

    useEffect(() => {
        if (propertyToEdit) {
            setFormData({
                property: propertyToEdit.property || '',
                move_in_date: propertyToEdit.move_in_date || '',
                rent: propertyToEdit.rent || '',
                deposit: propertyToEdit.deposit || '',
                status: propertyToEdit.status?.toString() || ''
            });

            setIsModalVisible(true);
        }
        else {
            resetForm();
        }

    }, [propertyToEdit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormData({
            property: '',
            move_in_date: '',
            rent: '',
            deposit: '',
            status: ''
        });
    };

    const addItem = async () => {
        try {
            const newItem = {
                property: formData.property,
                move_in_date: formData.move_in_date,
                rent: Number(formData.rent),
                deposit: Number(formData.deposit),
                status: Number(formData.status)
            };
            await addDoc(collection(db, 'property'), newItem);
            await getAllProperty();
            setIsModalVisible(false);
            resetForm();
        }
        catch (error) {
            console.error('Error adding property:', error);
        }
    };

    const editItem = async () => {
        try {
            if (!propertyToEdit?.id) return;
            const propertyRef = doc(db, 'property', propertyToEdit.id);
            const updatedItem = {
                property: formData.property,
                move_in_date: formData.move_in_date,
                rent: Number(formData.rent),
                deposit: Number(formData.deposit),
                status: Number(formData.status)
            };
            await updateDoc(propertyRef, updatedItem);
            await getAllProperty();
            setIsModalVisible(false);
            setPropertyToEdit(null);
            resetForm();
        } catch (error) {
            console.error('Error updating property:', error);
        }
    };

    const handleSubmit = () => {
        if (propertyToEdit) {
            editItem();
        } else {
            addItem();
        }
    };

    const openAddModal = () => {
        setPropertyToEdit(null);
        resetForm();
        setIsModalVisible(true);
    };

    function setAddModalView() {
        setPropertyToEdit(null);
        setIsModalVisible(true);
    }


    return (
        <div>
            <Button variant="contained" startIcon={<AddCircleIcon />} onClick={openAddModal}>
                Add
            </Button>

            <Modal
                open={isModalVisible}
                onClose={() => setIsModalVisible(false)}
            >
                <Box>
                    <div className="add_modal">

                        <button
                            onClick={() => {
                                setIsModalVisible(false);
                                setPropertyToEdit(null);
                                resetForm();
                            }} className="btn btn-dark close">

                            Close

                        </button>

                        <div className="input_row">
                            <label>
                                <p>Property name</p>
                                <TextField
                                    variant="standard"
                                    onChange={handleInputChange}
                                    value={formData.property}
                                    name="property"
                                    type="text"
                                    className="modal_input_old" />
                            </label>
                        </div>

                        <div className="input_row">
                            <label>
                                <p>Move In Date</p>
                                <TextField
                                    variant="standard"

                                    onChange={handleInputChange}
                                    value={formData.move_in_date}
                                    name="move_in"
                                    type="date"
                                    className="modal_input_old" />
                            </label>
                        </div>

                        <div className="input_row">
                            <label>
                                <p>Rent</p>
                                <TextField
                                    variant="standard"
                                    onChange={handleInputChange}
                                    value={formData.rent}
                                    name="rent"
                                    type="number"
                                    className="modal_input_old" />
                            </label>
                        </div>

                        <div className="input_row">
                            <label>
                                <p>Deposit</p>
                                <TextField
                                    variant="standard"
                                    onChange={handleInputChange}
                                    value={formData.deposit}
                                    name="deposit"
                                    type="number"
                                    className="modal_input_old" />
                            </label>
                        </div>

                        <div className="input_row">
                            <label>
                                <p>Status</p>
                                <TextField
                                    variant="standard"
                                    onChange={handleInputChange}
                                    value={formData.status}
                                    name="status"
                                    type="number"
                                    className="modal_input_old" />
                            </label>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className={`btn ${propertyToEdit ? 'btn-warning' : 'btn-success'}`}
                        >
                            {propertyToEdit ? 'Edit Item' : 'Add Item'}
                        </button>
                    </div>

                </Box>

            </Modal>

        </div >
    )
}