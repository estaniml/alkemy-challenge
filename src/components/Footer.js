import React from 'react'

const Footer = () => {
  return (
    <footer>
        <nav className='w-full p-6 mt-16'>
            <h3 className='text-center italic font-bold text-md'>Nuestras redes</h3>
            <ul className='flex justify-center gap-4 text-stone-400 mt-2 text-sm'>
                <li>
                    <a href='http://instagram.com' target='_blank' rel='noopener noreferrer'>Instagram</a>
                </li>
                <li>
                    <a href='http://facebook.com' target='_blank' rel='noopener noreferrer'>Facebook</a>
                </li>
                <li>
                    <a href='http://twitter.com' target='_blank' rel='noopener noreferrer'>Twitter</a>
                </li>
            </ul>
            <p className='text-center mt-4 text-xs text-stone-400 border-t border-stone-900 pt-4'>Copyright Alkemy Challenge</p>
        </nav>
    </footer>
  )
}

export default Footer