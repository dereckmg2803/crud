import { useState } from 'react'
import './App.css'
import { useCrudApi } from './hooks/useCrudApi'
import FormUser from './components/FormUser'
import { Button } from '@chakra-ui/react'
import { Modal } from 'antd'

const baseURL = 'https://users-crud-api-production-9c59.up.railway.app/api/v1/users/'

function App() {
  const [users] = useCrudApi(baseURL)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
 

  return (
    <>
      <h1>Users app</h1>
      
      <Button type="primary" onClick={showModal}>
      Add new user
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <FormUser  closeModal={() => setIsModalOpen(false)}></FormUser>
      </Modal>
    </>
  )
}

export default App
