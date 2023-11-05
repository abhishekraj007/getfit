import { useContext, useState } from 'react'
import { BoredActivity } from 'app/modals'
import { FilterContext } from 'app/provider/FilterContext'

export const BORED_API_URL = 'http://www.boredapi.com/api/activity/'

export default function useBored() {
  const [data, setData] = useState<BoredActivity>()
  const [loading, setLoading] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)

  const { filter } = useContext(FilterContext)
  const { type, price, participants, accessibility } = filter

  const getActivity = async () => {
    // Define the base URL and query parameters
    const baseUrl = BORED_API_URL
    // Replace with your API URL
    let queryParams = {}

    if (type) {
      queryParams = {
        ...queryParams,
        type: type.toString(),
      }
    }
    // @ts-ignore
    if (price[0] > 0) {
      queryParams = {
        ...queryParams,
        minprice: '0',
        maxprice: price.toString(),
      }
    }
    if (participants) {
      queryParams = {
        ...queryParams,
        participants: participants.toString(),
      }
    }
    // @ts-ignore
    if (accessibility[0] > 0) {
      queryParams = {
        ...queryParams,
        minaccessibility: '0',
        maxaccessibility: accessibility.toString(),
      }
    }

    // Construct the URL with query parameters
    const url = baseUrl + '?' + new URLSearchParams(queryParams).toString()

    try {
      setLoading(true)
      const response = await fetch(url)
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.error(error)
      setHasError(true)
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    loading,
    hasError,
    getActivity,
  }
}
