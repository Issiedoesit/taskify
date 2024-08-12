import React from 'react'

const formatDateMonthText = (dateToFormat) => {
   const formattedDate =  new Date(dateToFormat).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" })

   return formattedDate // format returned in August 12, 2024 etc
}

export default formatDateMonthText