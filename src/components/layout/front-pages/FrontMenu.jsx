'use client'

// React Imports
import { useEffect, useState } from 'react'

// Next Imports
import { useParams } from 'next/navigation'
import Link from 'next/link'

// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Drawer from '@mui/material/Drawer'
import useMediaQuery from '@mui/material/useMediaQuery'

// Third-party Imports
import classnames from 'classnames'

import SearchBar from './SearchBar'

const staticMenu = [
  {
    id: 1,
    label: 'About Us',
    href: '/about-us'
  },
  {
    id: 1,
    label: 'Product',
    href: '/product'
  },
  {
    id: 1,
    label: 'Download',
    href: '/download'
  },
  {
    id: 1,
    label: 'News',
    href: '/news'
  },
  {
    id: 1,
    label: 'Project',
    href: '/project'
  },
  {
    id: 1,
    label: 'Contact Us',
    href: '/contact-us'
  },
  {
    id: 1,
    label: 'Info',
    href: '/info'
  }
]

const styles = {
  containerDrawer: {
    '& .MuiDrawer-paper': {
      width: ['100%', 300],
      borderRadius: '10px',
      width: 'calc(100vw - 48px)',
      height: 'fit-content',
      position: 'fixed',
      top: '115px',
      left: '24px',
      margin: '0 auto'
    },
    '& .MuiDrawer-paper a': {
      padding: '18px 0',
      borderBottom: '1px solid #2121214D'
    },
    '& .MuiDrawer-paper .btn-esperianza': {
      marginTop: '18px',
      width: 'fit-content'
    }
  }
}

const Wrapper = props => {
  // Props
  const { children, isBelowLgScreen, className, isDrawerOpen, setIsDrawerOpen } = props

  if (isBelowLgScreen) {
    return (
      <Drawer
        variant='temporary'
        anchor='left'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        hideBackdrop
        ModalProps={{
          disablePortal: true,
          keepMounted: true
        }}
        sx={styles.containerDrawer}
        className={classnames('p-5', className)}
      >
        <div className='p-4 flex flex-col gap-x-3'>{children}</div>
      </Drawer>
    )
  }

  return <div className={classnames('flex items-center flex-wrap gap-x-4 gap-y-3', className)}>{children}</div>
}

const FrontMenu = props => {
  // Props
  const { isDrawerOpen, setIsDrawerOpen } = props
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleClickSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  // Hooks
  const isBelowLgScreen = useMediaQuery(theme => theme.breakpoints.down('lg'))
  const { lang: locale } = useParams()

  useEffect(() => {
    if (!isBelowLgScreen && isDrawerOpen) {
      setIsDrawerOpen(false)
    }

    console.log('isBelowLgScreen', isBelowLgScreen)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBelowLgScreen])

  return (
    <>
      <Wrapper isBelowLgScreen={isBelowLgScreen} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}>
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <SearchBar checked={true} locale={locale} isMobile={true} />
        </Box>
        {staticMenu.map((menu, i) => (
          <Typography key={i} component={Link} href={`/${locale}${menu.href}`} className={'text-[#212121]'}>
            {menu.label}
          </Typography>
        ))}
        <Typography
          component={Link}
          href={`/${locale}`}
          className={'bg-[#C1A658] px-[40px] text-[#ffffff] py-[9px] rounded-[6px] btn-esperianza'}
          color='text.primary'
        >
          Esperianza
        </Typography>
        <Box
          component='img'
          src='/icons/search.svg'
          alt='search'
          className='cursor-pointer'
          sx={{ display: { xs: 'none', sm: 'block' } }}
          onClick={handleClickSearch}
        />
      </Wrapper>
      <SearchBar checked={isSearchOpen} locale={locale} />
    </>
  )
}

export default FrontMenu
