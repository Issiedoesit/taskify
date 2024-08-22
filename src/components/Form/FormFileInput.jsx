import React, { useState } from 'react'
import Avatar from '../../assets/media/logos/TaskifyIcon.png'
import { BeatLoader } from 'react-spinners'
import { IoIosClose } from 'react-icons/io'
import { GiCheckMark } from 'react-icons/gi'

const FormFileInput = ({ fieldsetId, formik, handleCancel, handleFileUpload, uploadedImageUrl, actionText, fileValue, uploading, errorUpload, fileInputId, fileInputName }) => {

  const [touched, setTouched] = useState(false)
  const [file, setFile] = useState(fileValue)

  const handleFileInput = (e) => {
    setFile("")
    console.log(e.target.files[0])

    setTouched(true)
    // console.log(import.meta.env.VITE_MAX_FILE_SIZE);
    formik.setFieldValue(`${fileInputId}`, e.target.files[0])
    setFile(e.target.files[0])
  }

  const isFileObject = (object) => {
    return object instanceof File;
  }

  // console.log(uploadedImageUrl);

  return (
    <fieldset id={fieldsetId} className=''>
      <div className="mx-auto w-fit pb-4">
        {
          file
            ?
            <img src={file ? isFileObject(file) ? URL.createObjectURL(file) : file : Avatar} alt="Avatar" className='h-16 w-16 rounded-full aspect-square' />
            :
            <div className={`p-2 rounded-full bg-brandBlue1x/20`}>
              <svg className={`h-10 w-10 opacity-20`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.6799 16.9599L18.5499 9.64988C17.4899 7.16988 15.5399 7.06988 14.2299 9.42988L12.3399 12.8399C11.3799 14.5699 9.58993 14.7199 8.34993 13.1699L8.12993 12.8899C6.83993 11.2699 5.01993 11.4699 4.08993 13.3199L2.36993 16.7699C1.15993 19.1699 2.90993 21.9999 5.58993 21.9999H18.3499C20.9499 21.9999 22.6999 19.3499 21.6799 16.9599Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.96997 8C8.62682 8 9.96997 6.65685 9.96997 5C9.96997 3.34315 8.62682 2 6.96997 2C5.31312 2 3.96997 3.34315 3.96997 5C3.96997 6.65685 5.31312 8 6.96997 8Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
        }
      </div>
      {/* <p>{`${file && isFileObject(file) ? URL.createObjectURL(file) : file}`}</p> */}
      <label htmlFor={fileInputId} className='w-fit cursor-pointer mx-auto flex flex-col gap-3 items-center justify-center'>
        {/* <div className='text-xs rounded-fifty border-2 border-black py-2 px-4'>
          {
            !errorUpload
            ?
            <div>
              {!uploadedImageUrl || !file ? 
              uploading ? 
              <span className={`flex gap-2 items-center`}>Uploading <BeatLoader size={'10px'} color={`#2A2AB2`} /></span> : 
              <span>{actionText || 'Choose Business photo'}</span> : 
              <span className='flex gap-2 items-center'>
                Logo Uploaded
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.3" y="0.3" width="17.4" height="17.4" rx="8.7" fill="#3DDC84"/>
                  <g clip-path="url(#clip0_16055_34025)">
                  <path d="M11.5797 7.10775L8.12497 10.5623C8.10174 10.5856 8.07414 10.6041 8.04374 10.6167C8.01334 10.6293 7.98075 10.6358 7.94784 10.6358C7.91493 10.6358 7.88234 10.6293 7.85194 10.6167C7.82155 10.6041 7.79394 10.5856 7.77072 10.5623L6.43472 9.225C6.41149 9.20168 6.38388 9.18318 6.35349 9.17055C6.32309 9.15793 6.2905 9.15143 6.25759 9.15143C6.22468 9.15143 6.19209 9.15793 6.16169 9.17055C6.1313 9.18318 6.10369 9.20168 6.08047 9.225C6.05715 9.24823 6.03864 9.27583 6.02602 9.30623C6.01339 9.33662 6.00689 9.36921 6.00689 9.40213C6.00689 9.43504 6.01339 9.46763 6.02602 9.49803C6.03864 9.52842 6.05715 9.55602 6.08047 9.57925L7.41697 10.9155C7.55795 11.0562 7.74901 11.1353 7.94822 11.1353C8.14742 11.1353 8.33848 11.0562 8.47947 10.9155L11.934 7.46175C11.9572 7.43853 11.9757 7.41094 11.9883 7.38057C12.0009 7.3502 12.0074 7.31764 12.0074 7.28475C12.0074 7.25187 12.0009 7.21931 11.9883 7.18894C11.9757 7.15856 11.9572 7.13097 11.934 7.10775C11.9107 7.08443 11.8831 7.06593 11.8527 7.0533C11.8223 7.04068 11.7898 7.03418 11.7568 7.03418C11.7239 7.03418 11.6913 7.04068 11.6609 7.0533C11.6305 7.06593 11.6029 7.08443 11.5797 7.10775Z" fill="white"/>
                  </g>
                  <rect x="0.3" y="0.3" width="17.4" height="17.4" rx="8.7" stroke="#22B94D" strokeWidth="0.6"/>
                  <defs>
                  <clipPath id="clip0_16055_34025">
                  <rect width="6" height="6" fill="white" transform="translate(6 6)"/>
                  </clipPath>
                  </defs>
                </svg>
              </span>
              }
            </div>
            :
            <p className={`text-brandRed1x text-xs`}>Error uploading Logo</p>
          }
        </div> */}
        <div className='text-xs rounded-fifty border-2 border-black py-2 px-4' >
          <span>{!(touched && file) ? (actionText || 'Choose Profile photo') : file?.name}</span>
        </div>
        <input required readOnly={uploading} type="file" name={fileInputName} id={fileInputId} onChange={(e) => { handleFileInput(e) }} onBlur={formik.handleBlur} className="hidden peer" accept=".jpg,.jpeg,.png,.gif,image/*" />
      </label>
      {formik.errors[fileInputId] && touched && file
        ?
        <p className={`text-xs text-right text-brandRed1x py-2`}>*** {formik.errors[fileInputId]}</p>
        :
        ""
        //   <div>
        //     {
        //       (touched && file && !uploadedImageUrl && !errorUpload)
        //       &&
        //       <div className={`flex items-center gap-3 justify-end py-2 flex-wrap`}>
        //         <p className='text-brandGray14x text-xs'>Use this image ?</p>
        //         <div className={`flex items-center gap-3 justify-end`}>
        //           <button type='button' disabled={uploading} onClick={handleCancel} className='text-brandRed1x disabled:text-brandGray16x text-3xl'> <IoIosClose /></button>
        //           <button type='button' disabled={uploading} onClick={handleFileUpload} className={`text-brandGreen1x disabled:text-brandGray16x`}> <GiCheckMark /></button>
        //         </div>
        //       </div>
        //     }
        //   </div>
      }

    </fieldset>
  )
}

export default FormFileInput