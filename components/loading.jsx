import React from 'react'
import loading from '@/public/loading.gif'
import Image from 'next/image'

const Loading = ({ type }) => {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            {
                type === 'txt' ? <p className='text-2xl font-semibold'>Loading...</p> :
                    <Image className='size-12' src={loading} alt='loading.gif' />
            }

        </div>
    )
}

export default Loading