import React, { useState } from 'react';
import { Box, Container, Typography, useTheme, useMediaQuery, Menu, MenuItem, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ContactBanner, SiteFooter } from './Home';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Composant de navigation avec onglets (réutilisé de Home.tsx)
const NavigationBar = () => {
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const [scolariteMenuAnchor, setScolariteMenuAnchor] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleScolariteMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setScolariteMenuAnchor(event.currentTarget);
  };

  const handleScolariteMenuClose = () => {
    setScolariteMenuAnchor(null);
  };

  const handleContactsClick = () => {
    const footerElement = document.getElementById('footer');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigationItems = [
    { label: 'ACCUEIL', path: '/' },
    { label: 'PRESENTATION', path: '/presentation' },
    { 
      label: 'SCOLARITE', 
      path: '/scolarite',
      hasSubmenu: true,
      submenu: [
        { label: 'CRÈCHE/GARDERIE', path: '/scolarite' },
        { label: 'MATERNELLE', path: '/scolarite-maternel' }
      ]
    },
    { label: 'NOS ACTIVITES', path: '/activites' },
    { label: 'BLOG', path: '/blog' },
    { label: 'CONTACTS', path: '#footer', isScroll: true },
    { label: 'CONNEXION', path: '/login' },
  ];

  return (
    <Box 
      position="absolute" 
      sx={{ 
        bgcolor: 'transparent',
        boxShadow: 'none',
        zIndex: 10,
        top: '60px',
        width: '100%'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex',
          justifyContent: { xs: 'flex-end', md: 'space-between' },
          alignItems: 'center',
          py: { xs: 1, md: 2 },
          px: { xs: 2, md: 0 },
          minHeight: { xs: 56, md: 64 }
        }}>
          {/* Logo - Masqué sur mobile */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Box sx={{
              width: 60,
              height: 60,
              border: '2px solid #87CEEB',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'white',
              overflow: 'hidden',
              p: 0.5,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <img
                src="/img/pages/vrailogo.jpg"
                alt="La Maison des Enfants La petite Académie"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </Box>
          </Box>

          {/* Navigation Desktop */}
          {!isMobile && (
            <Box sx={{ 
              display: 'flex', 
              gap: { md: 2, lg: 3 },
              alignItems: 'center'
            }}>
              {navigationItems.map((item) => (
                <Box key={item.label}>
                  {item.hasSubmenu ? (
                    <>
                      <Typography
                        onClick={handleScolariteMenuOpen}
                        sx={{
                          color: 'white',
                          fontWeight: 600,
                          fontSize: { md: 12, lg: 14 },
                          textTransform: 'uppercase',
                          letterSpacing: 0.5,
                          px: { md: 1.5, lg: 2 },
                          py: 1,
                          borderBottom: '2px solid transparent',
                          cursor: 'pointer',
                          '&:hover': {
                            color: '#FF9800',
                            borderBottom: '2px solid #FF9800',
                          }
                        }}
                      >
                        {item.label}
                      </Typography>
                      <Menu
                        anchorEl={scolariteMenuAnchor}
                        open={Boolean(scolariteMenuAnchor)}
                        onClose={handleScolariteMenuClose}
                        sx={{
                          '& .MuiPaper-root': {
                            bgcolor: 'rgba(23, 128, 194, 0.95)',
                            color: 'white',
                            mt: 1,
                            backdropFilter: 'blur(10px)',
                            minWidth: 200
                          }
                        }}
                      >
                        {item.submenu?.map((subItem) => (
                          <MenuItem
                            key={subItem.label}
                            component={RouterLink}
                            to={subItem.path}
                            onClick={handleScolariteMenuClose}
                            sx={{
                              color: 'white',
                              fontWeight: 600,
                              fontSize: 14,
                              textTransform: 'uppercase',
                              '&:hover': {
                                bgcolor: 'rgba(255, 255, 255, 0.1)',
                              }
                            }}
                          >
                            {subItem.label}
                          </MenuItem>
                        ))}
                      </Menu>
                    </>
                  ) : item.isScroll ? (
                    <Typography
                      onClick={handleContactsClick}
                      sx={{
                        color: 'white',
                        fontWeight: 600,
                        fontSize: { md: 12, lg: 14 },
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                        px: { md: 1.5, lg: 2 },
                        py: 1,
                        borderBottom: '2px solid transparent',
                        cursor: 'pointer',
                        '&:hover': {
                          color: '#FF9800',
                          borderBottom: '2px solid #FF9800',
                        }
                      }}
                    >
                      {item.label}
                    </Typography>
                  ) : (
                    <Typography
                      component={RouterLink}
                      to={item.path}
                      sx={{
                        color: item.label === 'NOS ACTIVITES' ? '#FF9800' : 'white',
                        fontWeight: 600,
                        fontSize: { md: 12, lg: 14 },
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                        px: { md: 1.5, lg: 2 },
                        py: 1,
                        borderBottom: item.label === 'NOS ACTIVITES' ? '2px solid #FF9800' : '2px solid transparent',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        '&:hover': {
                          color: '#FF9800',
                          borderBottom: '2px solid #FF9800',
                        }
                      }}
                    >
                      {item.label}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          )}

          {/* Menu Mobile */}
          {isMobile && (
            <>
              <IconButton
                color="inherit"
                onClick={handleMobileMenuOpen}
                sx={{ color: 'white' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={mobileMenuAnchor}
                open={Boolean(mobileMenuAnchor)}
                onClose={handleMobileMenuClose}
                sx={{
                  '& .MuiPaper-root': {
                    bgcolor: 'rgba(23, 128, 194, 0.95)',
                    color: 'white',
                    mt: 1,
                    backdropFilter: 'blur(10px)'
                  }
                }}
              >
                {navigationItems.map((item) => (
                  <Box key={item.label}>
                    {item.hasSubmenu ? (
                      <>
                        <MenuItem
                          onClick={handleScolariteMenuOpen}
                          sx={{
                            color: 'white',
                            fontWeight: 600,
                            fontSize: 14,
                            textTransform: 'uppercase',
                            '&:hover': {
                              bgcolor: 'rgba(255, 255, 255, 0.1)',
                            }
                          }}
                        >
                          {item.label}
                          <KeyboardArrowDownIcon sx={{ ml: 0.5, fontSize: 16 }} />
                        </MenuItem>
                        <Menu
                          anchorEl={scolariteMenuAnchor}
                          open={Boolean(scolariteMenuAnchor)}
                          onClose={handleScolariteMenuClose}
                          sx={{
                            '& .MuiPaper-root': {
                              bgcolor: 'rgba(23, 128, 194, 0.95)',
                              color: 'white',
                              mt: 1,
                              backdropFilter: 'blur(10px)',
                              minWidth: 200
                            }
                          }}
                        >
                          {item.submenu?.map((subItem) => (
                            <MenuItem
                              key={subItem.label}
                              component={RouterLink}
                              to={subItem.path}
                              onClick={() => {
                                handleScolariteMenuClose();
                                handleMobileMenuClose();
                              }}
                              sx={{
                                color: 'white',
                                fontWeight: 600,
                                fontSize: 14,
                                textTransform: 'uppercase',
                                '&:hover': {
                                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                                }
                              }}
                            >
                              {subItem.label}
                            </MenuItem>
                          ))}
                        </Menu>
                      </>
                    ) : item.isScroll ? (
                      <MenuItem
                        onClick={() => {
                          handleContactsClick();
                          handleMobileMenuClose();
                        }}
                        sx={{
                          color: 'white',
                          fontWeight: 600,
                          fontSize: 14,
                          textTransform: 'uppercase',
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                          }
                        }}
                      >
                        {item.label}
                      </MenuItem>
                    ) : (
                      <MenuItem
                        component={RouterLink}
                        to={item.path}
                        onClick={handleMobileMenuClose}
                        sx={{
                          color: item.label === 'NOS ACTIVITES' ? '#FF9800' : 'white',
                          fontWeight: 600,
                          fontSize: 14,
                          textTransform: 'uppercase',
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                          }
                        }}
                      >
                        {item.label}
                      </MenuItem>
                    )}
                  </Box>
                ))}
              </Menu>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

// Section Hero basée sur l'image
const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      backgroundImage: 'url(/img/pages/ac.jpg)', // Image de fond du bâtiment
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      {/* Overlay sombre semi-transparent */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: 'rgba(0, 0, 0, 0.6)', // Overlay sombre comme sur l'image
        zIndex: 1
      }} />

      {/* Texte de fond "La Maison des Enfants la Petite Académie" */}
      <Typography
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'rgba(0, 0, 0, 0.8)',
          fontSize: { xs: 24, md: 36, lg: 48 },
          fontWeight: 'bold',
          textAlign: 'center',
          zIndex: 1,
          fontFamily: 'Arial, sans-serif',
          letterSpacing: 1,
          textShadow: 'none'
        }}
      >
      </Typography>

      {/* Contenu principal - Texte blanc en avant-plan */}
      <Box sx={{
        position: 'relative',
        zIndex: 3,
        textAlign: 'center',
        color: 'white'
      }}>
        {/* Titre principal "NOS ACTIVITES" */}
        <Typography
          variant="h1"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: { xs: 32, md: 48, lg: 64 },
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            mb: 3,
            textTransform: 'uppercase',
            letterSpacing: 2,
            fontFamily: 'Arial, sans-serif'
          }}
        >
          NOS ACTIVITES
        </Typography>
        
        {/* Sous-titres */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1
        }}>
          <Typography
            variant="h4"
            sx={{
              color: 'white',
              fontWeight: 600,
              fontSize: { xs: 18, md: 24, lg: 28 },
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              textTransform: 'uppercase',
              letterSpacing: 1,
              fontFamily: 'Arial, sans-serif'
            }}
          >
            VIE ACADÉMIQUE
          </Typography>
          
          <Typography
            variant="h4"
            sx={{
              color: 'white',
              fontWeight: 600,
              fontSize: { xs: 18, md: 24, lg: 28 },
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              textTransform: 'uppercase',
              letterSpacing: 1,
              fontFamily: 'Arial, sans-serif'
            }}
          >
            MOMENTS FORTS
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

// Section VIE ACADÉMIQUE avec les 4 images
const ActivitiesContent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const activities = [
    {
      title: "Sortie au centre Abel de Grand Bassam",
      image: "/img/pages/65.jpg", // Image de sortie éducative
      description: "Découverte de l'environnement naturel et apprentissage en plein air"
    },
    {
      title: "Kermesse",
      image: "/img/pages/67.jpg", // Image de kermesse avec jeux d'eau
      description: "Fête de l'école avec jeux, animations et moments de convivialité"
    },
    {
      title: "Instant conte",
      image: "/img/pages/24.jpg", // Image de séance de conte
      description: "Séances de contes traditionnels pour développer l'imaginaire"
    },
    {
      title: "Initiation à la robotique",
      image: "/img/pages/107.jpg", // Image d'initiation robotique
      description: "Découverte de la programmation et de la robotique dès le plus jeune âge"
    }
  ];

  return (
    <Box sx={{
      bgcolor: 'white',
      py: { xs: 6, md: 8 },
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Motifs décoratifs en arrière-plan */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(/img/pages/doodles.png)', // Image avec nuages, voitures, étoiles
        backgroundSize: '200px',
        backgroundRepeat: 'repeat',
        opacity: 0.1,
        zIndex: 0
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Titre principal */}
        <Typography
          variant="h2"
          sx={{
            color: '#1780c2',
            fontWeight: 700,
            fontSize: { xs: 28, md: 36, lg: 42 },
            textAlign: 'center',
            mb: 6,
            fontFamily: 'Arial, sans-serif'
          }}
        >
          VIE ACADÉMIQUE
        </Typography>

        {/* Grille des 4 images */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { 
            xs: '1fr', 
            sm: 'repeat(2, 1fr)', 
            md: 'repeat(4, 1fr)' 
          },
          gap: { xs: 3, md: 4 },
          alignItems: 'start'
        }}>
          {activities.map((activity, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              {/* Image de l'activité */}
              <Box sx={{
                width: '100%',
                height: { xs: 200, sm: 250, md: 300 },
                overflow: 'hidden',
                borderRadius: 2,
                border: '3px solid #1780c2',
                mb: 2,
                position: 'relative',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}>
                <img
                  src={activity.image}
                  alt={activity.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                
                
              </Box>

              {/* Titre de l'activité */}
              <Typography
                variant="h6"
                sx={{
                  color: '#1780c2',
                  fontWeight: 700,
                  fontSize: { xs: 14, md: 16 },
                  fontFamily: 'Arial, sans-serif',
                  lineHeight: 1.3,
                  textAlign: 'center',
                  mb: 1,
                  minHeight: { xs: 'auto', md: '40px' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {activity.title}
              </Typography>

              {/* Description (optionnelle, peut être masquée sur mobile) */}
              <Typography
                variant="body2"
                sx={{
                  color: '#666',
                  fontSize: { xs: 12, md: 14 },
                  lineHeight: 1.4,
                  textAlign: 'center',
                  display: { xs: 'none', md: 'block' }
                }}
              >
                {activity.description}
              </Typography>
            </Box>
          ))}
        </Box>

        
      </Container>
    </Box>
  );
};

// Section MOMENTS FORTS avec les 4 cartes d'activités
const MomentsFortsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const momentsForts = [
    {
      title: "Cérémonie de graduation promotion 2025",
      image: "/img/pages/MTC.jpeg", // Image de graduation
      description: "Célébration des réussites et passage vers la maternelle"
    },
    {
      title: "Brunch party",
      image: "/img/pages/142.jpg", // Image de brunch
      description: "Moment convivial avec parents et enfants autour d'un repas partagé"
    },
    {
      title: "Journée des stars",
      image: "/img/pages/53.jpg", // Image de journée des stars
      description: "Les enfants se transforment en vedettes le temps d'une journée"
    },
    {
      title: "Piscine party",
      image: "/img/pages/23.jpg", // Image de piscine party
      description: "Jeux aquatiques et moments de détente en piscine"
    }
  ];

  return (
    <Box sx={{
      bgcolor: '#f8f9fa',
      pt: { xs: 6, md: 8 },
      pb: 0,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Motifs décoratifs en arrière-plan */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(/img/pages/doodles.png)', // Motifs légers
        backgroundSize: '200px',
        backgroundRepeat: 'repeat',
        opacity: 0.05,
        zIndex: 0
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Titre principal */}
        <Typography
          variant="h2"
          sx={{
            color: '#1780c2',
            fontWeight: 700,
            fontSize: { xs: 28, md: 36, lg: 42 },
            textAlign: 'center',
            mb: 6,
            fontFamily: 'Arial, sans-serif'
          }}
        >
          MOMENTS FORTS
        </Typography>

        {/* Grille des 4 cartes */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { 
            xs: '1fr', 
            sm: 'repeat(2, 1fr)', 
            md: 'repeat(4, 1fr)' 
          },
          gap: { xs: 3, md: 4 },
          alignItems: 'start'
        }}>
          {momentsForts.map((moment, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              {/* Image de l'activité */}
              <Box sx={{
                width: '100%',
                height: { xs: 200, sm: 250, md: 300 },
                overflow: 'hidden',
                borderRadius: 2,
                border: '2px solid #1780c2',
                mb: 2,
                position: 'relative',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}>
                <img
                  src={moment.image}
                  alt={moment.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </Box>

              {/* Titre de l'activité */}
              <Typography
                variant="h6"
                sx={{
                  color: '#1780c2',
                  fontWeight: 700,
                  fontSize: { xs: 14, md: 16 },
                  fontFamily: 'Arial, sans-serif',
                  lineHeight: 1.3,
                  textAlign: 'center',
                  mb: 1,
                  minHeight: { xs: 'auto', md: '40px' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {moment.title}
              </Typography>

              {/* Description (masquée sur mobile) */}
              <Typography
                variant="body2"
                sx={{
                  color: '#666',
                  fontSize: { xs: 12, md: 14 },
                  lineHeight: 1.4,
                  textAlign: 'center',
                  display: { xs: 'none', md: 'block' }
                }}
              >
                {moment.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Section décorative en bas avec motifs scolaires */}
      <Box sx={{
        bgcolor: '#1780c2',
        py: 4,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Motifs scolaires en blanc */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/img/pages/1.jpg)', // Motifs scolaires (crayons, règles, formules)
          backgroundSize: '250px',
          backgroundRepeat: 'repeat',
          opacity: 0.3,
          zIndex: 0
        }} />

        
      </Box>
    </Box>
  );
};

// Composant principal Activites
const Activites = () => {
  return (
    <>
      <Helmet>
        <title>Activités Éducatives et Moments Forts - La Petite Académie Abidjan</title>
        <meta name="description" content="Découvrez les activités éducatives et moments forts de La Petite Académie à Abidjan : sorties éducatives, kermesse, contes, initiation robotique, graduation, brunch party, journée des stars, piscine party. Vie académique et moments de convivialité." />
        <meta name="keywords" content="activités éducatives Abidjan, sorties éducatives, kermesse école, contes enfants, initiation robotique, graduation maternelle, brunch party, journée des stars, piscine party, vie académique, moments forts école, La Petite Académie" />
        <meta property="og:title" content="Activités Éducatives et Moments Forts - La Petite Académie Abidjan" />
        <meta property="og:description" content="Découvrez les activités éducatives et moments forts de La Petite Académie à Abidjan : sorties éducatives, kermesse, contes, initiation robotique, graduation, brunch party." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bethaniemiracle.com/activites" />
        <link rel="canonical" href="https://bethaniemiracle.com/activites" />
      </Helmet>
      <Box sx={{ 
        width: '100%',
        margin: 0,
        padding: 0
      }}>
        <ContactBanner />
        <NavigationBar />
        <HeroSection />
        <ActivitiesContent />
        <MomentsFortsSection />
        <SiteFooter />
      </Box>
    </>
  );
};

export default Activites;
