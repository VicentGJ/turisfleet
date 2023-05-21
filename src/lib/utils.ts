import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export const durationObjToStr = (duration: object): string => {
  let result = ''
  Object.entries(duration).forEach(([key, value]) => {
    result += `${value} ${key} `
  })
  return result.trim()
}

export const durationStrToObj = (duration: string): object => {
  let result: any = {
    days: '',
    hours: '',
    minutes: '',
  }
  const arr = duration.trim().split(' ')
  for (let i = 0; i < arr.length; i += 2) {
    let key = arr[i + 1]
    let value = parseInt(arr[i])
    result[key] = value
  }

  return result
}

export const validIdNumber = (id_number: string): boolean => {
  //TODO test and use
  // Check if the string is 11 characters long and contains only numbers
  if (!/^\d{11}$/.test(id_number)) {
    return false
  }

  // Extract the first 6 digits as the birth date
  let birthDate = id_number.slice(0, 6)

  // Check if the birth date is in the format YYMMDD
  let year = parseInt(birthDate.slice(0, 2), 10)
  let month = parseInt(birthDate.slice(2, 4), 10)
  let day = parseInt(birthDate.slice(4, 6), 10)

  // Create a Date object with the extracted year, month and day
  let date = new Date(year, month - 1, day)

  // Check if the date is valid
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return false
  }

  return true
}
export function generatePDF(
  data: any[],
  title: string,
  download = true,
  open = false
) {
  const doc = new jsPDF()
  doc.setFont('Helvetica', 'normal')
  doc.setTextColor(0, 0, 0)
  doc.text(title, 14, 22)
  if (data && data.length > 0) {
    const headers = Object.keys(data[0])
    const body = data.map((row) => headers.map((header) => row[header]))
    autoTable(doc, {
      head: [headers],
      body,
      startY: 30,
    })
  }
  if (download) {
    doc.save(title + '.pdf')
  }
  if (open) {
    window.open(doc.output('bloburl'), '_blank')
  }
}
