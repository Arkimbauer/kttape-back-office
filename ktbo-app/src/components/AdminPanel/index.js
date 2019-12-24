/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'
import AllPendingOrders from './AllPendingOrders'
import AllOrders from './AllOrders'
import AllUsers from './AllUsers'
import NewUser from './NewUser'
import UserOrders from './UserOrders'
import ArticlesManagement from './ArticlesManagement'
import './index.sass'
import Modal from '../Modal'
import Feedback from '../Feedback'
import Context from '../Context'

function AdminPanel({history}) {

  const {cat, setCat} = useContext(Context)

  const [error, setError] = useState()
  const [message, setMessage] = useState()
  const [orders, setOrders] = useState()
  const [allOrders, setAllOrders] = useState()
  const [retrieveUsers, setRetrieveUsers] = useState()
  const [newUser, setNewUser] = useState()
  const [userOrders, setUserOrders] = useState()
  const [articlesManagement, setArticlesManagement] = useState()


  useEffect(() => {
    setCat()
  },[])

  async function handlePendingOrders() {
    
      try {
        setError()
        setAllOrders()
        setRetrieveUsers()
        setNewUser()
        setUserOrders()
        setArticlesManagement()
        const {orders} = await logic.retrievePendingOrders()
        setOrders(orders)
      } catch ({message}) {
        setOrders()
        setError(message)
      }
  }

  async function handleAllOrders() {
      try {
        setError()
        setOrders()
        setRetrieveUsers()
        setNewUser()
        setUserOrders()
        setArticlesManagement()
        const orders = await logic.retrieveAllOrders()
        setAllOrders(orders)
      } catch ({message}) {
        setError(message)
      }
  }

  function handleRegisterNewUser () {
    setError()
    setOrders()
    setRetrieveUsers()
    setAllOrders()
    setUserOrders()
    setArticlesManagement()
    setNewUser("new-user")
  }

  async function handleRetrieveAllUsers () {
      try {
        setError()
        setAllOrders()
        setOrders()
        setNewUser()
        setUserOrders()
        setArticlesManagement()
        const users = await logic.retrieveAllUsers()
        setRetrieveUsers(users)
      } catch ({message}) {
        setError(message)
      }
  }

  async function handleUserOrders () {
    try {
      setError()
      setAllOrders()
      setOrders()
      setNewUser()
      setRetrieveUsers()
      setArticlesManagement()
      const users = await logic.retrieveAllUsers()
      setUserOrders(users)
    } catch (error) {
      setError(message)
    }
  }

  async function handleArticlesManagement () {
    try {
      setError()
      setAllOrders()
      setOrders()
      setNewUser()
      setRetrieveUsers()
      setUserOrders()
      const articles = await logic.retrieveAllArticles()
      debugger
      setArticlesManagement(articles.articles)
    } catch (error) {
      setError(message)
    }
  }

  function handleModal() {
    setMessage(null) 
    setError(null)
  }
    
  return <section className="admin-main">
    <section className="admin-main__admin-panel">
      <h1>ADMIN PANEL</h1>
      <div className="admin-main__admin-panel--buttons">
        <button onClick={handlePendingOrders}>Pending orders</button>
        <button onClick={handleAllOrders}>All orders</button>
        <button onClick={handleRegisterNewUser}>New User</button>
        <button onClick={handleRetrieveAllUsers}>Retrieve all users</button>
        <button onClick={handleUserOrders}>User Orders</button>
        <button onClick={handleArticlesManagement}>Articles Management</button>
      </div>
    </section>
    <section className="admin-main__content">
      {error && <Feedback  message={error} />}
      {orders && <AllPendingOrders orders={orders}   retrievePendingOrders={handlePendingOrders}/>}
      {allOrders  && <AllOrders orders={allOrders} />}
      {retrieveUsers && <AllUsers users={retrieveUsers} retrieveAllUsers={handleRetrieveAllUsers} />}
      {newUser && <NewUser />}
      {userOrders && <UserOrders users={userOrders}/>}
      {articlesManagement && <ArticlesManagement allArticles={articlesManagement} />}
    </section> 
    {message && <Modal  message={message} showModal={handleModal}/>}
  </section>
}

export default withRouter(AdminPanel)