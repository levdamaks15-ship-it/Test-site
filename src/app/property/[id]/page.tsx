'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import properties from '@/data/properties.json';
import { useTranslation } from '@/lib/i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BookingCalendar from '@/components/ui/BookingCalendar';
import styles from './PropertyPage.module.css';

export default function PropertyPage() {
  const { id } = useParams();
  const { language, t } = useTranslation();
  const router = useRouter();
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const property = properties.find(p => p.id === id);

  if (!property) return <div className="container">Loading...</div>;

  const title = language === 'ru' ? property.title_ru : property.title_kz;
  const location = language === 'ru' ? property.location_ru : property.location_kz;

  return (
    <>
      <Header />
      
      <main className={styles.main}>
        <div className="container">
          <button className={styles.backBtn} onClick={() => router.back()}>
            <span>←</span> {t('common.backBtn')}
          </button>

          <div className={styles.grid}>
            <div className={styles.content}>
              <div className={styles.gallery}>
                <div 
                  className={styles.mainImage} 
                  onClick={() => setIsFullscreen(true)}
                  title={language === 'ru' ? 'Нажмите, чтобы увеличить' : 'Үлкейту үшін басыңыз'}
                >
                  <img src={property.images[mainImageIndex]} alt={title} />
                  <div className={styles.zoomIcon}>🔍</div>
                </div>
                <div className={styles.sideImages}>
                  {property.images.map((img: string, index: number) => (
                    <div 
                      key={index} 
                      className={`${styles.sideImage} ${index === mainImageIndex ? styles.active : ''}`}
                      onClick={() => setMainImageIndex(index)}
                    >
                      <img src={img} alt={`${title} ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>

              {isFullscreen && (
                <div className={styles.fullscreenOverlay} onClick={() => setIsFullscreen(false)}>
                  <button className={styles.closeBtn}>×</button>
                  <img src={property.images[mainImageIndex]} alt={title} />
                </div>
              )}

              <div className={styles.info}>
                <div className={styles.header}>
                  <div className={styles.type}>{t(`common.${property.type}s`).toUpperCase()}</div>
                  <h1 className={styles.title}>{title}</h1>
                  <p className={styles.location}>{location}</p>
                </div>

                <div className={styles.specsGrid}>
                  <div className={styles.specBox}>
                    <span className={styles.specIcon}>📐</span>
                    <div className={styles.specText}>
                      <span className={styles.specVal}>{property.area} м²</span>
                      <span className={styles.specLab}>{t('common.area')}</span>
                    </div>
                  </div>
                  <div className={styles.specBox}>
                    <span className={styles.specIcon}>🛏️</span>
                    <div className={styles.specText}>
                      <span className={styles.specVal}>{property.rooms}</span>
                      <span className={styles.specLab}>{t('common.rooms')}</span>
                    </div>
                  </div>
                  <div className={styles.specBox}>
                    <span className={styles.specIcon}>🚿</span>
                    <div className={styles.specText}>
                      <span className={styles.specVal}>{property.bathrooms}</span>
                      <span className={styles.specLab}>{t('common.bathrooms')}</span>
                    </div>
                  </div>
                  <div className={styles.specBox}>
                    <span className={styles.specIcon}>🏢</span>
                    <div className={styles.specText}>
                      <span className={styles.specVal}>{property.floor} / {property.floors_total}</span>
                      <span className={styles.specLab}>{t('common.floor')}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.description}>
                  <h3>{t('common.aboutObject')}</h3>
                  <p>
                    {t('common.condition')}: <strong>{language === 'ru' ? property.condition_ru : property.condition_kz}</strong>. 
                    {language === 'ru' 
                      ? 'Этот объект представляет собой идеальное сочетание современного дизайна и комфорта. Расположенный в престижном районе, он предлагает высокий уровень приватности и безопасности.'
                      : 'Бұл нысан заманауи дизайн мен жайлылықтың мінсіз үйлесімі болып табылады. Беделді ауданда орналасқан, ол құпиялылық пен қауіпсіздіктің жоғары деңгейін ұсынады.'}
                  </p>
                </div>

                <div className={styles.amenitiesSection}>
                  <h3>{t('common.amenitiesTitle')}</h3>
                  <div className={styles.amenitiesGrid}>
                    {property.amenities.map((item: string) => (
                      <div key={item} className={styles.amenityItem}>
                        <span className={styles.check}>✓</span>
                        {t(`amenities.${item}`) || item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <aside className={styles.sidebar}>
              <BookingCalendar price={property.price} currency={property.currency} />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
