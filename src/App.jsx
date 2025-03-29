import { useState } from 'react'
import './App.css'
import { useCrudApi } from './hooks/useCrudApi'
import FormUser from './components/FormUser'
import {
  Avatar,
  Button,
  Card,
  HStack,
  Stack,
  Text,
  CardBody,
  CardFooter,
  CardHeader,
} from "@chakra-ui/react"
import { LuGift ,LuMail , LuPencil, LuTrash } from "react-icons/lu"
import { Modal } from 'antd'

const baseURL = 'https://users-crud-api-production-9c59.up.railway.app/api/v1/users/'

function App() {
  const [users, { create, update, remove }] = useCrudApi(baseURL)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const addUser = (userData) => {
    create(userData);
    setIsModalOpen(false);
    setSuccessMessage('Usuario creado con éxito.');
    setIsSuccessModalOpen(true);
  };

  const editUser = (userId, updatedUser) => {
    update(userId, updatedUser);
    setIsModalOpen(false);
    setSuccessMessage('Usuario actualizado con éxito.');
    setIsSuccessModalOpen(true);
  };

  const deleteUser = (userId) => {
    remove(userId);
    setIsDeleteModalOpen(false);
    setSuccessMessage('Usuario eliminado con éxito.');
    setIsSuccessModalOpen(true);
  };






  const showAddModal = () => {
    setIsModalOpen(true);
    // se pone como hijo del modal <FormUser addUser={addUser} closeModal={() => setIsModalOpen(false)} /> 
  };


  const showEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const showDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOkEdit = () => {
    setIsEditModalOpen(false);
  };
  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleOkDelete = () => {
    setIsDeleteModalOpen(false);
  };
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <h1 className='title_user'>Crud de usuarios</h1>

      <Modal
        title="Operación Exitosa"
        open={isSuccessModalOpen}
        onCancel={() => setIsSuccessModalOpen(false)}
        footer={[
          <Button colorPalette={'blue'} onClick={() => setIsSuccessModalOpen(false)}>
            Ok
          </Button>
        ]}
      >
        <p>{successMessage}</p>
      </Modal>



      <Button type="primary" onClick={showAddModal} className='button_title'>
        Add new user
      </Button>

      <Modal title="Agregar usuario" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <FormUser addUser={addUser} closeModal={() => setIsModalOpen(false)} />
      </Modal>


      <div className='list-div'>
        {users && users.map((user) => (

          <div key={user.id}>
            <Card.Root className='card user-card'>
            <Card.Body>

            <HStack mb="6" className='car_important_info'>
            {user.image_url && (
                <img src={user.image_url} alt={user.first_name} width={85} height={85} />
              )}  
               <Stack >
               <h2>{user.first_name}</h2> 
               <h2>{user.last_name}</h2>
               </Stack>
            </HStack>
            
            <Card.Description className='card_description'>
              <div className='description_item'><LuMail/><span>{user.email}</span></div>
              <div className='description_item'><LuGift/><span>{user.birthday.slice(0, 10)}</span></div>
              </Card.Description>
              </Card.Body>
             
              <Card.Footer>
                <Button onClick={() => showEditModal(user)}>
                  <LuPencil/>
                  Edit
                  </Button>
                
                <Button onClick={() => showDeleteModal(user)}>
                <LuTrash/>
                Delete
                </Button>
              </Card.Footer>
            </Card.Root>
          </div>



        ))

        }
        {users && users.length === 0 && <p>Ningún usuario fue encontrado</p>}
        <Modal title="Editar usuario" open={isEditModalOpen} onOk={handleOkEdit} onCancel={handleCancelEdit} footer={null}>
          <FormUser user={selectedUser} editUser={editUser} closeModal={() => setIsEditModalOpen(false)} />
        </Modal>

        <Modal title="Eliminar usuario" open={isDeleteModalOpen} onOk={handleOkDelete} onCancel={handleCancelDelete} footer={null}>
          <div>
            <h2>¿Estás seguro de eliminar a {selectedUser?.first_name}?</h2>
            <Button onClick={() => { deleteUser(selectedUser.id) }}>Si</Button>
            <Button onClick={handleCancelDelete}>No</Button>
          </div>
        </Modal>

      </div>



      {/* 
      <pre>
        {JSON.stringify(users, null, 2)}
      </pre> */}
    </>
  )
}

export default App
