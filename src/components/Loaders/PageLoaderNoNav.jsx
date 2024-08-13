import React from 'react'
import { BarLoader, BeatLoader, ClipLoader, FadeLoader, GridLoader, HashLoader, MoonLoader } from 'react-spinners'

const PageLoaderNoNav = ({loader, height, padding}) => {
  return (
    <div className={`flex flex-col ${height ? height : "min-h-screen"} ${padding ? padding : "py-40"} items-center justify-center`}>{loader || <HashLoader color='#182CD1' />}</div>
  )
}

export default PageLoaderNoNav