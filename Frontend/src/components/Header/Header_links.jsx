'use client'
import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
} from '@mui/material'
import { FaBars } from 'react-icons/fa'
import Logo from './Logo'
import LanguageSelector from './LanguageSelector'
import ProfileMenu from './ProfileMenu'
import MobileDrawer from './MobileDrawer'
import Link from 'next/link'

const Header_links = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [profileAnchorEl, setProfileAnchorEl] = useState(null)

  // Resizable Drawer State
  const [drawerWidth, setDrawerWidth] = useState(320);
  const isResizing = React.useRef(false);

  const startResizing = React.useCallback((e) => {
    e.preventDefault();
    isResizing.current = true;
  }, []);

  const stopResizing = React.useCallback(() => {
    isResizing.current = false;
  }, []);

  const resize = React.useCallback((e) => {
    if (isResizing.current) {
      let newWidth = e.clientX;
      if (newWidth < 250) newWidth = 250;
      if (newWidth > 600) newWidth = 600;
      setDrawerWidth(newWidth);
    }
  }, []);

  React.useEffect(() => {
    if (drawerOpen) {
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResizing);
    }
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing, drawerOpen]);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open)
  }

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget)
  }

  const handleProfileClose = () => {
    setProfileAnchorEl(null)
  }

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: 'var(--card-bg)', color: 'var(--text)', boxShadow: 'none' }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: '0 !important', minHeight: '64px' }}>
        {/* ✅ Left: Hamburger (☰) + Logo + Name */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{
              color: 'var(--secondary)',
              backgroundColor: 'rgba(49, 24, 7, 0.05)',
              '&:hover': {
                backgroundColor: 'rgba(49, 24, 7, 0.1)',
              }
            }}
          >
            <FaBars />
          </IconButton>

          <Link href="/" className="flex items-center gap-3 no-underline">
            <Logo />
            <Box className="hidden sm:block">
              <span className="block text-3xl tracking-wide text-[var(--secondary)] leading-none" style={{ fontFamily: '"Great Vibes", cursive' }}>
                Anne Creations
              </span>
            </Box>
          </Link>

          <span className="hidden md:block text-sm text-[var(--primary)] tracking-[1.5px] uppercase font-bold" style={{ fontFamily: '"Playfair Display", serif', marginTop: '4px' }}>
            Embroidery Designs
          </span>
        </Box>

        {/* ✅ Right: Language (🌐) + Profile/Wish/Cart Menu (❤️ 🛒 👤) */}
        <Box display="flex" alignItems="center">
          <LanguageSelector />
          <ProfileMenu
            anchorEl={profileAnchorEl}
            handleClick={handleProfileClick}
            handleClose={handleProfileClose}
          />
        </Box>
      </Toolbar>

      {/* ✅ Left Side Drawer (Main Navigation Sidebar) */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: drawerWidth, // Dynamic Width
            backgroundColor: 'var(--card-bg)',
            color: 'var(--text)',
            boxShadow: '10px 0 30px rgba(0,0,0,0.08)',
            border: 'none',
            overflow: 'visible', // Allow resize handle to be visible/usable if needed, though usually inside
            position: 'relative'
          }
        }}
      >
        <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
          <MobileDrawer onClose={toggleDrawer(false)} />

          {/* Resize Handle */}
          <Box
            onMouseDown={startResizing}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '10px',
              height: '100%',
              cursor: 'ew-resize',
              zIndex: 1400, // Higher than standard content
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.1)'
              }
            }}
          />
        </Box>
      </Drawer>
    </AppBar>
  )
}

export default Header_links
