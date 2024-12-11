import { useState, useEffect } from 'react'
import { db } from '../../firebase'
import { collection, getDocs } from 'firebase/firestore'
import Table from '../common/Table'

const PartnerForm = () => {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'partners'))
        const submissionsData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
        setSubmissions(submissionsData)
      } catch (error) {
        console.error('Error fetching partner submissions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [])

  const headers = ['Name', 'Email', 'Company', 'Phone', 'Message']

  const formattedData = submissions.map(sub => ({
    userName: sub.userName,
    userEmail: sub.userEmail,
    userCompany: sub.userCompany,
    userPhone: sub.userPhone,
    userMessage: sub.userMessage
  }))

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Partner Form Submissions</h2>
      <Table headers={headers} data={formattedData} />
    </div>
  )
}

export default PartnerForm
